import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ThemeProvider as SCProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import ClickerObject from '../components/ClickerObject';
import {
    SafeScreen, Card, Title, Body, ScoreText,
    ActionLabel, Chip, ChipText, Row, Caption,
} from '../components/styled';

const GESTURE_HINTS = [
    { icon: '👆', label: 'Натиснути',        desc: '+1 очко' },
    { icon: '✌️', label: 'Подвійний клік',   desc: '+2 очки' },
    { icon: '⏳', label: 'Утримати',          desc: '+5 очок' },
    { icon: '↔️', label: 'Перетягнути',       desc: 'Квест' },
    { icon: '👉', label: 'Свайп вправо/вліво',desc: '+3–10 🎲' },
    { icon: '🔍', label: 'Пінч',              desc: '+3 очки' },
];

export default function HomeScreen() {
    const { theme }                     = useTheme();
    const { score, lastAction, quests } = useGame();

    const doneCnt = quests.filter(q => q.done).length;

    return (
        <SCProvider theme={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeScreen>
                    <ScrollView
                        contentContainerStyle={styles.scroll}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <Title>🎮 Клікер</Title>
                            <Chip>
                                <ChipText>{doneCnt}/{quests.length} завдань</ChipText>
                            </Chip>
                        </View>

                        {/* Score card */}
                        <Card>
                            <Caption style={{ textAlign: 'center', marginBottom: 4 }}>РАХУНОК</Caption>
                            <ScoreText>{score}</ScoreText>
                            <ActionLabel style={{ marginTop: 4 }}>{lastAction || 'Почни грати!'}</ActionLabel>
                        </Card>

                        {/* Game object */}
                        <Card style={{ alignItems: 'center', paddingVertical: 32 }}>
                            <ClickerObject />
                        </Card>

                        {/* Gesture hints */}
                        <Card>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Жести</Text>
                            {GESTURE_HINTS.map((g, i) => (
                                <Row key={i} style={styles.hintRow}>
                                    <Text style={styles.hintIcon}>{g.icon}</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.hintLabel, { color: theme.text }]}>{g.label}</Text>
                                    </View>
                                    <Chip><ChipText>{g.desc}</ChipText></Chip>
                                </Row>
                            ))}
                        </Card>
                    </ScrollView>
                </SafeScreen>
            </GestureHandlerRootView>
        </SCProvider>
    );
}

const styles = StyleSheet.create({
    scroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
    hintRow: { marginBottom: 10 },
    hintIcon: { fontSize: 22, marginRight: 12, width: 32 },
    hintLabel: { fontSize: 14, fontWeight: '600' },
});