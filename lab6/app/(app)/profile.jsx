// app/(app)/profile.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout, getUserProfile, saveUserProfile, deleteAccount } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState({ name: '', age: '', city: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getUserProfile();
      if (data) {
        setProfile({
          name: data.name || '',
          age: data.age || '',
          city: data.city || '',
        });
      }
    } catch (e) {
      Alert.alert('Помилка', 'Не вдалося завантажити профіль');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile.name.trim()) {
      Alert.alert('Помилка', "Ім'я не може бути порожнім");
      return;
    }
    const age = parseInt(profile.age);
    if (profile.age && (isNaN(age) || age < 1 || age > 120)) {
      Alert.alert('Помилка', 'Вік повинен бути числом від 1 до 120');
      return;
    }
    setSaving(true);
    try {
      await saveUserProfile(profile);
      Alert.alert('Успішно', 'Профіль оновлено');
    } catch (e) {
      Alert.alert('Помилка', 'Не вдалося зберегти профіль');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Вихід', 'Ви впевнені, що хочете вийти?', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Вийти',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      Alert.alert('Помилка', 'Введіть пароль для підтвердження');
      return;
    }
    setDeleting(true);
    try {
      await deleteAccount(deletePassword);
      setDeleteModal(false);
      router.replace('/(auth)/login');
    } catch (error) {
      let msg = 'Не вдалося видалити акаунт';
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        msg = 'Невірний пароль';
      }
      Alert.alert('Помилка', msg);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.topBar}>
          <Text style={styles.appTitle}>Мій профіль</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={22} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Avatar / User info */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.name ? profile.name[0].toUpperCase() : user?.email?.[0]?.toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.emailText}>{user?.email}</Text>
          <View style={styles.uidBadge}>
            <Text style={styles.uidText} numberOfLines={1}>
              UID: {user?.uid?.slice(0, 16)}...
            </Text>
          </View>
        </View>

        {/* Profile Form */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Особисті дані</Text>

          <FormField
            label="Ім'я"
            icon="person-outline"
            value={profile.name}
            onChangeText={(v) => setProfile({ ...profile, name: v })}
            placeholder="Введіть ваше ім'я"
          />
          <FormField
            label="Вік"
            icon="calendar-outline"
            value={profile.age}
            onChangeText={(v) => setProfile({ ...profile, age: v })}
            placeholder="Ваш вік"
            keyboardType="numeric"
          />
          <FormField
            label="Місто"
            icon="location-outline"
            value={profile.city}
            onChangeText={(v) => setProfile({ ...profile, city: v })}
            placeholder="Ваше місто"
          />

          <TouchableOpacity
            style={[styles.saveBtn, saving && styles.btnDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="save-outline" size={18} color="#fff" />
                <Text style={styles.saveBtnText}>Зберегти зміни</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerCard}>
          <Text style={styles.dangerTitle}>Небезпечна зона</Text>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              setDeletePassword('');
              setDeleteModal(true);
            }}
          >
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
            <Text style={styles.deleteBtnText}>Видалити акаунт</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Delete Account Modal */}
      <Modal
        visible={deleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons name="warning" size={40} color="#ef4444" />
            <Text style={styles.modalTitle}>Видалити акаунт?</Text>
            <Text style={styles.modalSubtitle}>
              Ця дія є незворотною. Всі ваші дані будуть видалені.{'\n'}Введіть пароль для підтвердження.
            </Text>

            <View style={styles.modalInputWrap}>
              <Ionicons name="lock-closed-outline" size={18} color="#6b7280" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.modalInput}
                placeholder="Ваш пароль"
                placeholderTextColor="#4b5563"
                value={deletePassword}
                onChangeText={setDeletePassword}
                secureTextEntry
              />
            </View>

            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteModal(false)}
              >
                <Text style={styles.cancelBtnText}>Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmDeleteBtn, deleting && styles.btnDisabled]}
                onPress={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.confirmDeleteText}>Видалити</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

function FormField({ label, icon, ...props }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name={icon} size={18} color="#6b7280" style={styles.inputIcon} />
        <TextInput style={styles.input} placeholderTextColor="#4b5563" {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#0f0f1a' },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 24,
  },
  appTitle: { fontSize: 24, fontWeight: '800', color: '#f9fafb', letterSpacing: -0.5 },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  avatarSection: { alignItems: 'center', marginBottom: 28 },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: '#4c1d95',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#7c3aed',
    marginBottom: 12,
  },
  avatarText: { fontSize: 36, fontWeight: '800', color: '#fff' },
  emailText: { fontSize: 14, color: '#9ca3af', marginBottom: 8 },
  uidBadge: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#27272a',
    maxWidth: 260,
  },
  uidText: { fontSize: 11, color: '#4b5563', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 16,
    gap: 14,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#f9fafb', marginBottom: 4 },
  inputGroup: { gap: 6 },
  label: { fontSize: 12, fontWeight: '600', color: '#6b7280', letterSpacing: 0.5 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f1a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27272a',
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, color: '#f9fafb', fontSize: 14 },
  saveBtn: {
    flexDirection: 'row',
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  btnDisabled: { opacity: 0.5 },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  dangerCard: {
    backgroundColor: '#1a0a0a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3f1515',
  },
  dangerTitle: { fontSize: 14, fontWeight: '700', color: '#ef4444', marginBottom: 12 },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2d0a0a',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#5b1a1a',
  },
  deleteBtnText: { color: '#ef4444', fontWeight: '600', fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 24,
  },
  modalBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3f1515',
    gap: 12,
  },
  modalTitle: { fontSize: 22, fontWeight: '800', color: '#f9fafb' },
  modalSubtitle: { fontSize: 13, color: '#6b7280', textAlign: 'center', lineHeight: 20 },
  modalInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f1a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#27272a',
    paddingHorizontal: 12,
    height: 48,
    width: '100%',
    marginTop: 4,
  },
  modalInput: { flex: 1, color: '#f9fafb', fontSize: 14 },
  modalBtns: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#27272a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: { color: '#9ca3af', fontWeight: '600', fontSize: 14 },
  confirmDeleteBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmDeleteText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
