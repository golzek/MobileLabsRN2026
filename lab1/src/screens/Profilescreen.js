import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch,
    StyleSheet,
    SafeAreaView,
    Alert,
} from 'react-native';

const ACHIEVEMENTS = [
    { id: 1, emoji: '🏆', title: 'Перший крок', desc: 'Завершено перший урок', done: true },
    { id: 2, emoji: '🔥', title: 'Тиждень поспіль', desc: '7 днів активності', done: true },
    { id: 3, emoji: '💡', title: 'Допитливий', desc: 'Пройдено 10 тем', done: false },
    { id: 4, emoji: '🎓', title: 'Випускник', desc: 'Завершено перший курс', done: false },
];

const MENU_ITEMS = [
    { icon: '📝', label: 'Мої нотатки', color: '#4F46E5' },
    { icon: '📅', label: 'Розклад занять', color: '#0EA5E9' },
    { icon: '📊', label: 'Статистика', color: '#10B981' },
    { icon: '🔔', label: 'Сповіщення', color: '#F59E0B' },
    { icon: '🔒', label: 'Конфіденційність', color: '#EF4444' },
    { icon: '❓', label: 'Допомога', color: '#8B5CF6' },
];

export default function ProfileScreen() {
    const [notifs, setNotifs] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarWrap}>
                        <Text style={styles.avatarEmoji}>👨‍💻</Text>
                    </View>
                    <Text style={styles.profileName}>Іван Петренко</Text>
                    <Text style={styles.profileEmail}>i.petrenko@ztu.edu.ua</Text>
                    <Text style={styles.profileGroup}>Група ПЗ-22 • ЗТУ</Text>

                    <View style={styles.profileStats}>
                        <View style={styles.profileStat}>
                            <Text style={styles.profileStatNum}>4</Text>
                            <Text style={styles.profileStatLabel}>Курси</Text>
                        </View>
                        <View style={styles.profileStatDivider} />
                        <View style={styles.profileStat}>
                            <Text style={styles.profileStatNum}>67%</Text>
                            <Text style={styles.profileStatLabel}>Прогрес</Text>
                        </View>
                        <View style={styles.profileStatDivider} />
                        <View style={styles.profileStat}>
                            <Text style={styles.profileStatNum}>14</Text>
                            <Text style={styles.profileStatLabel}>Днів</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => Alert.alert('Редагування', 'Функція редагування профілю')}
                    >
                        <Text style={styles.editBtnTxt}>Редагувати профіль</Text>
                    </TouchableOpacity>
                </View>

                {/* Achievements */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Досягнення</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {ACHIEVEMENTS.map(a => (
                            <View
                                key={a.id}
                                style={[styles.achievement, !a.done && styles.achievementLocked]}
                            >
                                <Text style={styles.achievementEmoji}>{a.emoji}</Text>
                                <Text style={[styles.achievementTitle, !a.done && { color: '#9CA3AF' }]}>
                                    {a.title}
                                </Text>
                                <Text style={styles.achievementDesc}>{a.desc}</Text>
                                {!a.done && <Text style={styles.lockIcon}>🔒</Text>}
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Settings Toggles */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Налаштування</Text>
                    <View style={styles.settingRow}>
                        <Text style={styles.settingIcon}>🔔</Text>
                        <Text style={styles.settingLabel}>Push-сповіщення</Text>
                        <Switch
                            value={notifs}
                            onValueChange={setNotifs}
                            trackColor={{ false: '#E5E7EB', true: '#A5B4FC' }}
                            thumbColor={notifs ? '#4F46E5' : '#D1D5DB'}
                        />
                    </View>
                    <View style={styles.settingRow}>
                        <Text style={styles.settingIcon}>🌙</Text>
                        <Text style={styles.settingLabel}>Темна тема</Text>
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{ false: '#E5E7EB', true: '#A5B4FC' }}
                            thumbColor={darkMode ? '#4F46E5' : '#D1D5DB'}
                        />
                    </View>
                </View>

                {/* Menu */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Меню</Text>
                    <View style={styles.menuCard}>
                        {MENU_ITEMS.map((item, i) => (
                            <TouchableOpacity
                                key={item.label}
                                style={[styles.menuRow, i < MENU_ITEMS.length - 1 && styles.menuRowBorder]}
                                onPress={() => Alert.alert(item.label, `Відкрити: ${item.label}`)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                                    <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                                </View>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                                <Text style={styles.menuArrow}>›</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Logout */}
                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={() => Alert.alert('Вихід', 'Ви впевнені, що хочете вийти?', [
                        { text: 'Скасувати', style: 'cancel' },
                        { text: 'Вийти', style: 'destructive' },
                    ])}
                >
                    <Text style={styles.logoutTxt}>Вийти з акаунту</Text>
                </TouchableOpacity>
                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#F8FAFC' },
    profileCard: {
        backgroundColor: '#4F46E5',
        margin: 20,
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 10,
    },
    avatarWrap: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarEmoji: { fontSize: 40 },
    profileName: { fontSize: 22, fontWeight: '800', color: '#fff' },
    profileEmail: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
    profileGroup: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2, marginBottom: 16 },
    profileStats: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        padding: 12,
        width: '100%',
        marginBottom: 16,
    },
    profileStat: { flex: 1, alignItems: 'center' },
    profileStatNum: { fontSize: 20, fontWeight: '800', color: '#fff' },
    profileStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
    profileStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.25)' },
    editBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 24,
    },
    editBtnTxt: { fontSize: 14, fontWeight: '600', color: '#fff' },
    section: { paddingHorizontal: 20, marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
    achievement: {
        width: 130,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        marginRight: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    achievementLocked: { opacity: 0.6 },
    achievementEmoji: { fontSize: 32, marginBottom: 6 },
    achievementTitle: { fontSize: 13, fontWeight: '700', color: '#111827', textAlign: 'center' },
    achievementDesc: { fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginTop: 4 },
    lockIcon: { fontSize: 14, marginTop: 6 },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    settingIcon: { fontSize: 20, marginRight: 12 },
    settingLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: '#111827' },
    menuCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
    },
    menuRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    menuIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: '#111827' },
    menuArrow: { fontSize: 20, color: '#D1D5DB' },
    logoutBtn: {
        marginHorizontal: 20,
        backgroundColor: '#FEE2E2',
        borderRadius: 16,
        paddingVertical: 15,
        alignItems: 'center',
    },
    logoutTxt: { fontSize: 16, fontWeight: '700', color: '#EF4444' },
});