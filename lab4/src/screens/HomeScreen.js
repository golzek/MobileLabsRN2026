import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStorageInfo, formatSize, ensureRoot, ROOT_DIR } from '../utils/filesystem';
import { useTheme, Screen, Card, SectionLabel, StatCard, SectionLabel as SL } from '../components/ui';

export default function HomeScreen({ navigation }) {
    const theme = useTheme();
    const [storage, setStorage]     = useState({ free: 0, total: 0, used: 0 });
    const [refreshing, setRefreshing] = useState(false);

    const load = useCallback(async () => {
        await ensureRoot();
        const s = await getStorageInfo();
        setStorage(s);
    }, []);

    useFocusEffect(useCallback(() => { load(); }, [load]));

    const onRefresh = async () => { setRefreshing(true); await load(); setRefreshing(false); };

    const usedPct = storage.total ? ((storage.used / storage.total) * 100).toFixed(1) : '0';

    const QUICK = [
        { icon: '📂', label: 'Файловий менеджер', desc: 'Переглянути всі файли', onPress: () => navigation.navigate('Explorer', { path: ROOT_DIR }) },
    ];

    return (
        <Screen theme={theme}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={s.scroll}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.accent} />}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={s.header}>
                        <Text style={[s.title, { color: theme.text }]}>💾 Файловий менеджер</Text>
                        <Text style={[s.subtitle, { color: theme.textSub }]}>Lab 4 · expo-file-system</Text>
                    </View>

                    {/* Storage stats */}
                    <SectionLabel theme={theme}>ПРИСТРІЙ — СТАТИСТИКА ПАМ'ЯТІ</SectionLabel>
                    <View style={s.statsRow}>
                        <StatCard theme={theme} icon="💽" label="Всього"    value={formatSize(storage.total)} color={theme.accent} />
                        <View style={{ width: 8 }} />
                        <StatCard theme={theme} icon="✅" label="Вільно"    value={formatSize(storage.free)}  color={theme.success} />
                        <View style={{ width: 8 }} />
                        <StatCard theme={theme} icon="📊" label="Зайнято"   value={formatSize(storage.used)}  color={theme.warning} />
                    </View>

                    {/* Usage bar */}
                    <Card theme={theme}>
                        <View style={s.barHeader}>
                            <Text style={[s.barLabel, { color: theme.textSub }]}>Використано пам'яті</Text>
                            <Text style={[s.barPct, { color: theme.accent }]}>{usedPct}%</Text>
                        </View>
                        <View style={[s.barBg, { backgroundColor: theme.border }]}>
                            <View style={[
                                s.barFill,
                                {
                                    width: `${Math.min(100, parseFloat(usedPct))}%`,
                                    backgroundColor: parseFloat(usedPct) > 85 ? theme.danger
                                        : parseFloat(usedPct) > 60 ? theme.warning
                                            : theme.accent,
                                },
                            ]} />
                        </View>
                        <View style={s.barLegend}>
                            <View style={s.legendItem}>
                                <View style={[s.legendDot, { backgroundColor: theme.accent }]} />
                                <Text style={[s.legendTxt, { color: theme.textMuted }]}>
                                    Зайнято: {formatSize(storage.used)}
                                </Text>
                            </View>
                            <View style={s.legendItem}>
                                <View style={[s.legendDot, { backgroundColor: theme.success }]} />
                                <Text style={[s.legendTxt, { color: theme.textMuted }]}>
                                    Вільно: {formatSize(storage.free)}
                                </Text>
                            </View>
                        </View>
                    </Card>

                    {/* Quick access */}
                    <SectionLabel theme={theme}>ШВИДКИЙ ДОСТУП</SectionLabel>
                    {QUICK.map(q => (
                        <TouchableOpacity
                            key={q.label}
                            style={[s.quickCard, { backgroundColor: theme.bgCard, borderColor: theme.border }]}
                            onPress={q.onPress}
                            activeOpacity={0.8}
                        >
                            <View style={[s.quickIcon, { backgroundColor: theme.accentBg }]}>
                                <Text style={{ fontSize: 26 }}>{q.icon}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[s.quickLabel, { color: theme.text }]}>{q.label}</Text>
                                <Text style={[s.quickDesc,  { color: theme.textSub }]}>{q.desc}</Text>
                            </View>
                            <Text style={[s.quickArrow, { color: theme.textMuted }]}>›</Text>
                        </TouchableOpacity>
                    ))}

                    {/* Info */}
                    <Card theme={theme} style={{ marginTop: 4 }}>
                        <Text style={[s.infoTitle, { color: theme.text }]}>📌 Підказки</Text>
                        {[
                            'Натисніть на папку — щоб відкрити',
                            'Натисніть на файл — щоб переглянути',
                            'Утримуйте елемент — контекстне меню',
                            'Кнопка «+» — створити файл або папку',
                        ].map((tip, i) => (
                            <View key={i} style={s.tipRow}>
                                <Text style={[s.tipDot, { color: theme.accent }]}>•</Text>
                                <Text style={[s.tipTxt, { color: theme.textSub }]}>{tip}</Text>
                            </View>
                        ))}
                    </Card>
                </ScrollView>
            </SafeAreaView>
        </Screen>
    );
}

const s = StyleSheet.create({
    scroll:    { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
    header:    { marginBottom: 16 },
    title:     { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
    subtitle:  { fontSize: 13, marginTop: 3 },
    statsRow:  { flexDirection: 'row', marginBottom: 10 },
    barHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    barLabel:  { fontSize: 13, fontWeight: '600' },
    barPct:    { fontSize: 13, fontWeight: '800' },
    barBg:     { height: 10, borderRadius: 5, overflow: 'hidden', marginBottom: 10 },
    barFill:   { height: '100%', borderRadius: 5 },
    barLegend: { flexDirection: 'row', gap: 16 },
    legendItem:{ flexDirection: 'row', alignItems: 'center', gap: 5 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    legendTxt: { fontSize: 11, fontWeight: '500' },
    quickCard: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        borderRadius: 16, borderWidth: 1, padding: 14, marginBottom: 8,
    },
    quickIcon:  { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    quickLabel: { fontSize: 15, fontWeight: '700' },
    quickDesc:  { fontSize: 12, marginTop: 2 },
    quickArrow: { fontSize: 24, fontWeight: '700' },
    infoTitle:  { fontSize: 15, fontWeight: '700', marginBottom: 10 },
    tipRow:     { flexDirection: 'row', gap: 8, marginBottom: 5 },
    tipDot:     { fontSize: 14, fontWeight: '800', lineHeight: 20 },
    tipTxt:     { flex: 1, fontSize: 13, lineHeight: 19 },
});