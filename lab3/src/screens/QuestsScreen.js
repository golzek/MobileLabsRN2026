import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ThemeProvider as SCProvider } from 'styled-components/native';
import { useTheme } from '../context/ThemeContext';
import { useGame }  from '../context/GameContext';
import {
    SafeScreen, Card, Title, Body, Caption,
    QuestRow, QuestIcon, QuestTitle, QuestDesc,
    CheckBadge, Chip, ChipText, Row,
} from '../components/styled';

export default function QuestsScreen() {
    const { theme } = useTheme();
    const { quests, score, questCounters } = useGame();

    const done   = quests.filter(q => q.done).length;
    const total  = quests.length;
    const pct    = Math.round((done / total) * 100);

    // current value for a quest counter
    function currentVal(q) {
        if (q.type === 'score') return score;
        return questCounters[q.type] ?? 0;
    }

    return (
        <SCProvider theme={theme}>
            <SafeScreen>
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <Row style={styles.header}>
                        <Title>📋 Завдання</Title>
                        <Chip><ChipText>{pct}%</ChipText></Chip>
                    </Row>

                    {/* Progress bar */}
                    <Card style={{ paddingVertical: 14 }}>
                        <Row style={{ marginBottom: 8, justifyContent: 'space-between' }}>
                            <Caption>Загальний прогрес</Caption>
                            <Caption>{done}/{total} виконано</Caption>
                        </Row>
                        <View style={[styles.progressBg, { backgroundColor: theme.border }]}>
                            <View style={[styles.progressFill, {
                                width: `${pct}%`,
                                backgroundColor: theme.accent,
                            }]} />
                        </View>
                    </Card>

                    {/* Quests list */}
                    {quests.map(q => {
                        const cur = currentVal(q);
                        const pctQ = Math.min(100, Math.round((cur / q.target) * 100));
                        return (
                            <QuestRow key={q.id} done={q.done} theme={theme}>
                                <QuestIcon>{q.icon}</QuestIcon>
                                <View style={{ flex: 1 }}>
                                    <QuestTitle done={q.done} theme={theme}>{q.title}</QuestTitle>
                                    <QuestDesc theme={theme}>{q.desc}</QuestDesc>
                                    {!q.done && (
                                        <View style={styles.questProgressWrap}>
                                            <View style={[styles.questProgressBg, { backgroundColor: theme.border }]}>
                                                <View style={[styles.questProgressFill, {
                                                    width: `${pctQ}%`,
                                                    backgroundColor: theme.accent,
                                                }]} />
                                            </View>
                                            <Text style={[styles.questPct, { color: theme.textMuted }]}>
                                                {cur}/{q.target}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <CheckBadge done={q.done} theme={theme}>
                                    <Text style={{ fontSize: 13, color: q.done ? '#fff' : theme.textMuted }}>
                                        {q.done ? '✓' : '○'}
                                    </Text>
                                </CheckBadge>
                            </QuestRow>
                        );
                    })}
                </ScrollView>
            </SafeScreen>
        </SCProvider>
    );
}

const styles = StyleSheet.create({
    scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
    header: { justifyContent: 'space-between', marginBottom: 14 },
    progressBg: { height: 8, borderRadius: 4, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 4 },
    questProgressWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 8 },
    questProgressBg: { flex: 1, height: 5, borderRadius: 3, overflow: 'hidden' },
    questProgressFill: { height: '100%', borderRadius: 3 },
    questPct: { fontSize: 11, fontWeight: '600', minWidth: 36, textAlign: 'right' },
});