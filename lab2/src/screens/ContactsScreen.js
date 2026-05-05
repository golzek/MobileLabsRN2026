import React, { useState } from 'react';
import {
    View,
    Text,
    SectionList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
    Linking,
} from 'react-native';
import { CONTACTS_SECTIONS } from '../data/mockData';


function ContactItem({ item }) {
    const handleCall = () => {
        Linking.openURL(`tel:${item.phone.replace(/\s/g, '')}`).catch(() =>
            Alert.alert('Дзвінок', `Телефон: ${item.phone}`)
        );
    };
    const handleEmail = () => {
        Linking.openURL(`mailto:${item.email}`).catch(() =>
            Alert.alert('Email', item.email)
        );
    };

    return (
        <View style={styles.contactCard}>
            <View style={styles.avatarWrap}>
                <Text style={styles.avatarEmoji}>{item.avatar}</Text>
            </View>
            <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactRole}>{item.role}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <View style={styles.actionBtns}>
                <TouchableOpacity style={[styles.actionBtn, styles.callBtn]} onPress={handleCall}>
                    <Text style={styles.actionBtnTxt}>📞</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.emailBtn]} onPress={handleEmail}>
                    <Text style={styles.actionBtnTxt}>✉️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


function SectionHeader({ title, count }) {
    const SECTION_ICONS = { Викладачі: '🎓', Одногрупники: '👥', Адміністрація: '🏛️' };
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>{SECTION_ICONS[title] ?? '📂'}</Text>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeTxt}>{count}</Text>
            </View>
        </View>
    );
}

function ItemSeparator() {
    return <View style={styles.separator} />;
}


export default function ContactsScreen({ navigation }) {
    const [search, setSearch] = useState('');

    const filteredSections = CONTACTS_SECTIONS.map(section => ({
        ...section,
        data: section.data.filter(
            c =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.role.toLowerCase().includes(search.toLowerCase())
        ),
    })).filter(s => s.data.length > 0);

    const totalContacts = CONTACTS_SECTIONS.reduce((acc, s) => acc + s.data.length, 0);

    return (
        <SafeAreaView style={styles.safe}>
            <SectionList
                sections={filteredSections}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ContactItem item={item} />}
                renderSectionHeader={({ section }) => (
                    <SectionHeader title={section.title} count={section.data.length} />
                )}
                ItemSeparatorComponent={ItemSeparator}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={true}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.openDrawer()}>
                            <Text style={styles.menuIcon}>☰</Text>
                        </TouchableOpacity>
                        <View style={styles.headerText}>
                            <Text style={styles.headerTitle}>👥 Контакти</Text>
                            <Text style={styles.headerSub}>{totalContacts} контактів</Text>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        <Text style={styles.emptyEmoji}>🔍</Text>
                        <Text style={styles.emptyTxt}>Контактів не знайдено</Text>
                    </View>
                }
                ListFooterComponent={<View style={{ height: 24 }} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#F8FAFC' },
    list: { paddingHorizontal: 16 },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        gap: 14,
    },
    menuBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: { fontSize: 20, color: '#F1F5F9' },
    headerText: { flex: 1 },
    headerTitle: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
    headerSub: { fontSize: 13, color: '#64748B', marginTop: 2 },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        paddingVertical: 10,
        paddingHorizontal: 2,
        gap: 8,
    },
    sectionIcon: { fontSize: 18 },
    sectionTitle: { flex: 1, fontSize: 15, fontWeight: '800', color: '#0F172A' },
    sectionBadge: {
        backgroundColor: '#0F172A',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    sectionBadgeTxt: { fontSize: 11, fontWeight: '700', color: '#F1F5F9' },

    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 12,
        gap: 12,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    avatarWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarEmoji: { fontSize: 24 },
    contactInfo: { flex: 1 },
    contactName: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
    contactRole: { fontSize: 12, color: '#64748B', marginTop: 1 },
    contactPhone: { fontSize: 12, color: '#3B82F6', marginTop: 2, fontWeight: '600' },
    actionBtns: { flexDirection: 'row', gap: 6 },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    callBtn: { backgroundColor: '#DCFCE7' },
    emailBtn: { backgroundColor: '#DBEAFE' },
    actionBtnTxt: { fontSize: 16 },

    separator: { height: 8 },

    emptyWrap: { alignItems: 'center', paddingTop: 60 },
    emptyEmoji: { fontSize: 48, marginBottom: 12 },
    emptyTxt: { fontSize: 16, color: '#94A3B8', fontWeight: '600' },
});