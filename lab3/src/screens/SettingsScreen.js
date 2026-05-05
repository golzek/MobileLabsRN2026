import React from 'react';
import { ScrollView, Switch, View, Text, Alert, StyleSheet } from 'react-native';
import { ThemeProvider as SCProvider } from 'styled-components/native';
import { useTheme } from '../context/ThemeContext';
import { useGame }  from '../context/GameContext';
import {
    SafeScreen, Card, Title, Caption, Row,
    SettingRow, SettingIcon, SettingLabel,
    PrimaryButton, PrimaryButtonText,
    GhostButton, GhostButtonText, Body,
} from '../components/styled';

function SectionLabel({ children, theme }) {
    return (
        <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>
            {children}
        </Text>
    );
}

export default function SettingsScreen() {
    const { theme, isDark, toggleTheme, override, setAuto } = useTheme();
    const { score, quests, resetGame } = useGame();

    const done  = quests.filter(q => q.done).length;
    const total = quests.length;

    const confirmReset = () => {
        Alert.alert(
            'Скинути гру?',
            'Весь прогрес та очки буде втрачено.',
            [
                { text: 'Скасувати', style: 'cancel' },
                { text: 'Скинути', style: 'destructive', onPress: resetGame },
            ]
        );
    };

    return (
        <SCProvider theme={theme}>
            <SafeScreen>
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    showsVerticalScrollIndicator={false}
                >
                    <Title style={{ marginBottom: 20 }}>⚙️ Налаштування</Title>

                    {/* ── Appearance ── */}
                    <SectionLabel theme={theme}>ЗОВНІШНІЙ ВИГЛЯД</SectionLabel>

                    <Card>
                        <SettingRow theme={theme} style={{ marginBottom: 0 }}>
                            <SettingIcon>{isDark ? '🌙' : '☀️'}</SettingIcon>
                            <SettingLabel theme={theme}>Темна тема</SettingLabel>
                            <Switch
                                value={isDark}
                                onValueChange={toggleTheme}
                                trackColor={{ false: theme.border, true: theme.accent }}
                                thumbColor={isDark ? '#fff' : '#fff'}
                            />
                        </SettingRow>

                        <View style={[styles.divider, { backgroundColor: theme.border }]} />

                        <SettingRow theme={theme} style={{ marginBottom: 0 }}>
                            <SettingIcon>📱</SettingIcon>
                            <SettingLabel theme={theme}>
                                {override === null ? 'Системна тема (авто)' : 'Ручне керування'}
                            </SettingLabel>
                            <Switch
                                value={override === null}
                                onValueChange={v => v ? setAuto() : null}
                                trackColor={{ false: theme.border, true: theme.success }}
                                thumbColor={'#fff'}
                            />
                        </SettingRow>
                    </Card>

                    {/* ── Stats ── */}
                    <SectionLabel theme={theme}>СТАТИСТИКА</SectionLabel>

                    <Card>
                        <Row style={styles.statRow}>
                            <SettingIcon>🏆</SettingIcon>
                            <SettingLabel theme={theme}>Рахунок</SettingLabel>
                            <Text style={[styles.statVal, { color: theme.accent }]}>{score}</Text>
                        </Row>
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <Row style={styles.statRow}>
                            <SettingIcon>📋</SettingIcon>
                            <SettingLabel theme={theme}>Завдань виконано</SettingLabel>
                            <Text style={[styles.statVal, { color: theme.success }]}>{done}/{total}</Text>
                        </Row>
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <Row style={styles.statRow}>
                            <SettingIcon>📊</SettingIcon>
                            <SettingLabel theme={theme}>Прогрес</SettingLabel>
                            <Text style={[styles.statVal, { color: theme.warning }]}>
                                {Math.round((done / total) * 100)}%
                            </Text>
                        </Row>
                    </Card>

                    {/* ── About ── */}
                    <SectionLabel theme={theme}>ПРО ЗАСТОСУНОК</SectionLabel>

                    <Card>
                        <Row style={styles.statRow}>
                            <SettingIcon>📱</SettingIcon>
                            <SettingLabel theme={theme}>Версія</SettingLabel>
                            <Text style={[styles.statVal, { color: theme.textMuted }]}>1.0.0</Text>
                        </Row>
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <Row style={styles.statRow}>
                            <SettingIcon>🎓</SettingIcon>
                            <SettingLabel theme={theme}>Дисципліна</SettingLabel>
                            <Text style={[styles.statVal, { color: theme.textMuted, fontSize: 11 }]}>Мобільні застосунки</Text>
                        </Row>
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <Row style={styles.statRow}>
                            <SettingIcon>👨‍💻</SettingIcon>
                            <SettingLabel theme={theme}>Розробник</SettingLabel>
                            <Text style={[styles.statVal, { color: theme.textMuted }]}>ПЗ-22</Text>
                        </Row>
                    </Card>

                    {/* ── Danger zone ── */}
                    <SectionLabel theme={theme}>НЕБЕЗПЕЧНА ЗОНА</SectionLabel>

                    <PrimaryButton
                        theme={theme}
                        onPress={confirmReset}
                        style={{ backgroundColor: theme.danger, marginBottom: 8 }}
                    >
                        <PrimaryButtonText>🗑️  Скинути прогрес</PrimaryButtonText>
                    </PrimaryButton>

                    <Body theme={theme} style={{ textAlign: 'center', marginBottom: 32 }}>
                        Це скине всі очки та виконані завдання.
                    </Body>
                </ScrollView>
            </SafeScreen>
        </SCProvider>
    );
}

const styles = StyleSheet.create({
    scroll: { paddingHorizontal: 16, paddingTop: 16 },
    sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginBottom: 8, marginTop: 8, marginLeft: 4 },
    divider: { height: 1, marginVertical: 2 },
    statRow: { paddingVertical: 10 },
    statVal: { fontSize: 15, fontWeight: '700' },
});