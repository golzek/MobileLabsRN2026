// app/(auth)/forgot-password.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email
        .trim()) {
      Alert.alert('Помилка', 'Введіть ваш email');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (error) {
      let msg = 'Сталася помилка. Спробуйте ще раз';
      if (error.code === 'auth/user-not-found') msg = 'Користувача з таким email не знайдено';
      if (error.code === 'auth/invalid-email') msg = 'Невірний формат email';
      Alert.alert('Помилка', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Ionicons name="key" size={36} color="#7c3aed" />
          </View>
          <Text style={styles.title}>Відновлення паролю</Text>
          <Text style={styles.subtitle}>
            Введіть ваш email, і ми надішлемо посилання для скидання паролю
          </Text>
        </View>

        {sent ? (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={48} color="#10b981" />
            <Text style={styles.successTitle}>Лист надіслано!</Text>
            <Text style={styles.successText}>
              Перевірте вашу пошту та перейдіть за посиланням для зміни паролю.
            </Text>
            <TouchableOpacity style={styles.backLoginBtn} onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.backLoginText}>Повернутися до входу</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrap}>
                <Ionicons name="mail-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor="#4b5563"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={handleReset}
              disabled={loading}
            >
              <Text style={styles.btnText}>
                {loading ? 'Надсилаємо...' : 'Надіслати посилання'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#0f0f1a' },
  container: { flex: 1, padding: 24 },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginTop: 48,
    marginBottom: 16,
  },
  header: { alignItems: 'center', marginBottom: 40 },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#1e1b4b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#312e81',
  },
  title: { fontSize: 26, fontWeight: '800', color: '#f9fafb', letterSpacing: -0.5 },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  form: { gap: 16 },
  inputGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#9ca3af', letterSpacing: 0.5 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#f9fafb', fontSize: 15 },
  btn: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  successBox: { alignItems: 'center', gap: 12, marginTop: 20 },
  successTitle: { fontSize: 22, fontWeight: '800', color: '#10b981' },
  successText: { fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 20 },
  backLoginBtn: {
    marginTop: 16,
    backgroundColor: '#1e1b4b',
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  backLoginText: { color: '#7c3aed', fontWeight: '700', fontSize: 15 },
});
