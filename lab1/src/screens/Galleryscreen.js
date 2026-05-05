import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
    Modal,
} from 'react-native';

const GALLERY_DATA = [
    { id: '1', emoji: '📱', title: 'React Native', desc: 'Крос-платформна мобільна розробка', color: '#4F46E5', bg: '#EEF2FF' },
    { id: '2', emoji: '⚛️', title: 'React', desc: 'Бібліотека для побудови UI', color: '#0EA5E9', bg: '#E0F2FE' },
    { id: '3', emoji: '🟨', title: 'JavaScript', desc: 'Мова програмування для Web', color: '#F59E0B', bg: '#FFFBEB' },
    { id: '4', emoji: '🐍', title: 'Python', desc: 'Універсальна мова програмування', color: '#10B981', bg: '#D1FAE5' },
    { id: '5', emoji: '🗄️', title: 'SQL', desc: 'Мова структурованих запитів', color: '#EF4444', bg: '#FEE2E2' },
    { id: '6', emoji: '☁️', title: 'Cloud', desc: 'Хмарні технології та сервіси', color: '#8B5CF6', bg: '#EDE9FE' },
    { id: '7', emoji: '🔐', title: 'Security', desc: 'Інформаційна безпека', color: '#EC4899', bg: '#FCE7F3' },
    { id: '8', emoji: '🤖', title: 'AI / ML', desc: 'Штучний інтелект та навчання', color: '#14B8A6', bg: '#CCFBF1' },
];

export default function GalleryScreen() {
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('all');

    const FILTERS = [
        { key: 'all', label: 'Усі' },
        { key: 'mobile', label: 'Мобільні' },
        { key: 'web', label: 'Веб' },
        { key: 'data', label: 'Дані' },
    ];

    const TAG_MAP = {
        '1': 'mobile', '2': 'web', '3': 'web',
        '4': 'data', '5': 'data', '6': 'web',
        '7': 'web', '8': 'data',
    };

    const visible = filter === 'all'
        ? GALLERY_DATA
        : GALLERY_DATA.filter(i => TAG_MAP[i.id] === filter);

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Технології</Text>
                <Text style={styles.subtitle}>Стек розробника</Text>
            </View>

            {/* Filter */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
                contentContainerStyle={styles.filterContent}
            >
                {FILTERS.map(f => (
                    <TouchableOpacity
                        key={f.key}
                        style={[styles.filterBtn, filter === f.key && styles.filterBtnActive]}
                        onPress={() => setFilter(f.key)}
                    >
                        <Text style={[styles.filterTxt, filter === f.key && styles.filterTxtActive]}>
                            {f.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Grid */}
            <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
                {visible.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.card, { backgroundColor: item.bg }]}
                        onPress={() => setSelected(item)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.cardEmoji}>{item.emoji}</Text>
                        <Text style={[styles.cardTitle, { color: item.color }]}>{item.title}</Text>
                        <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>
                    </TouchableOpacity>
                ))}
                <View style={{ height: 20, width: '100%' }} />
            </ScrollView>

            {/* Modal */}
            <Modal
                visible={!!selected}
                transparent
                animationType="fade"
                onRequestClose={() => setSelected(null)}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setSelected(null)}
                >
                    {selected && (
                        <View style={[styles.modal, { borderTopColor: selected.color, borderTopWidth: 4 }]}>
                            <Text style={styles.modalEmoji}>{selected.emoji}</Text>
                            <Text style={[styles.modalTitle, { color: selected.color }]}>{selected.title}</Text>
                            <Text style={styles.modalDesc}>{selected.desc}</Text>
                            <TouchableOpacity
                                style={[styles.learnBtn, { backgroundColor: selected.color }]}
                                onPress={() => {
                                    setSelected(null);
                                    Alert.alert('Навчання', `Починаємо вивчення ${selected.title}!`);
                                }}
                            >
                                <Text style={styles.learnTxt}>Вивчити →</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    title: { fontSize: 26, fontWeight: '800', color: '#111827' },
    subtitle: { fontSize: 14, color: '#6B7280', marginTop: 2 },
    filterScroll: { maxHeight: 52 },
    filterContent: { paddingHorizontal: 20, gap: 8, paddingVertical: 8 },
    filterBtn: {
        paddingHorizontal: 18,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
    },
    filterBtnActive: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
    filterTxt: { fontSize: 13, fontWeight: '600', color: '#6B7280' },
    filterTxtActive: { color: '#fff' },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 14,
        paddingTop: 12,
        gap: 12,
    },
    card: {
        width: '46%',
        borderRadius: 20,
        padding: 18,
        flexGrow: 1,
        minHeight: 130,
        justifyContent: 'center',
    },
    cardEmoji: { fontSize: 34, marginBottom: 8 },
    cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
    cardDesc: { fontSize: 12, color: '#6B7280', lineHeight: 16 },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 28,
        width: '100%',
        alignItems: 'center',
    },
    modalEmoji: { fontSize: 56, marginBottom: 12 },
    modalTitle: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
    modalDesc: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
    learnBtn: { borderRadius: 14, paddingVertical: 14, paddingHorizontal: 40 },
    learnTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },
});