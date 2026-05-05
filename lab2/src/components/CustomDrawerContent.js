import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const MENU_ITEMS = [
    { key: 'NewsStack', label: 'Новини', icon: '📰', screen: 'NewsStack' },
    { key: 'Contacts', label: 'Контакти', icon: '👥', screen: 'Contacts' },
];

export default function CustomDrawerContent(props) {
    const { state, navigation } = props;
    const activeRoute = state.routeNames[state.index];

    return (
        <SafeAreaView style={styles.safe}>
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                {/* ── Profile block ── */}
                <View style={styles.profileBlock}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarEmoji}>👨‍💻</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Головня Євген</Text>
                        <Text style={styles.profileGroup}>Група ВТ-22-1</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeTxt}>ЖДТУ</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* ── Menu items ── */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuLabel}>НАВІГАЦІЯ</Text>
                    {MENU_ITEMS.map(item => {
                        const isActive = activeRoute === item.key;
                        return (
                            <TouchableOpacity
                                key={item.key}
                                style={[styles.menuItem, isActive && styles.menuItemActive]}
                                onPress={() => navigation.navigate(item.screen)}
                                activeOpacity={0.75}
                            >
                                <View style={[styles.menuIconWrap, isActive && styles.menuIconActive]}>
                                    <Text style={styles.menuIcon}>{item.icon}</Text>
                                </View>
                                <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
                                    {item.label}
                                </Text>
                                {isActive && <View style={styles.activeIndicator} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.divider} />

                {/* ── App info ── */}
                <View style={styles.footer}>
                    <Text style={styles.footerTitle}>Lab 2 — React Native</Text>
                    <Text style={styles.footerSub}>Навігація та списки</Text>
                    <Text style={styles.version}>v1.0.0 · Expo SDK 50</Text>
                </View>
            </DrawerContentScrollView>

            {/* ── Close button ── */}
            <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.closeDrawer()}>
                <Text style={styles.closeTxt}>✕  Закрити меню</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#0F172A' },

    profileBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 20,
        gap: 14,
    },
    avatarCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1E293B',
        borderWidth: 2,
        borderColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarEmoji: { fontSize: 28 },
    profileInfo: { flex: 1 },
    profileName: { fontSize: 16, fontWeight: '700', color: '#F1F5F9' },
    profileGroup: { fontSize: 13, color: '#94A3B8', marginTop: 2 },
    badge: {
        marginTop: 6,
        alignSelf: 'flex-start',
        backgroundColor: '#1D4ED8',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    badgeTxt: { fontSize: 10, fontWeight: '700', color: '#BFDBFE', letterSpacing: 1 },

    divider: { height: 1, backgroundColor: '#1E293B', marginHorizontal: 20, marginBottom: 8 },

    menuSection: { paddingHorizontal: 12, paddingTop: 8, paddingBottom: 8 },
    menuLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#475569',
        letterSpacing: 1.5,
        marginLeft: 8,
        marginBottom: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 4,
        gap: 12,
    },
    menuItemActive: { backgroundColor: '#1E3A5F' },
    menuIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#1E293B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIconActive: { backgroundColor: '#1D4ED8' },
    menuIcon: { fontSize: 18 },
    menuText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#94A3B8' },
    menuTextActive: { color: '#F1F5F9' },
    activeIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#3B82F6',
    },

    footer: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    footerTitle: { fontSize: 13, fontWeight: '700', color: '#475569' },
    footerSub: { fontSize: 12, color: '#334155', marginTop: 2 },
    version: { fontSize: 11, color: '#1E293B', marginTop: 6 },

    closeBtn: {
        margin: 16,
        paddingVertical: 13,
        borderRadius: 12,
        backgroundColor: '#1E293B',
        alignItems: 'center',
    },
    closeTxt: { fontSize: 14, fontWeight: '600', color: '#64748B' },
});