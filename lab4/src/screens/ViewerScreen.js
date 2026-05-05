import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { readFile, isTextFile } from '../utils/filesystem';
import { useTheme, Screen, Loader, InlineAlert } from '../components/ui';

export default function ViewerScreen({ route, navigation }) {
    const theme = useTheme();
    const { path, name } = route.params;

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: name,
            headerRight: () => (
                isTextFile(name) ? (
                    <TouchableOpacity
                        onPress={() => navigation.replace('Editor', { path, name })}
                        style={hdr.btn}
                    >
                        <Text style={[hdr.txt, { color: theme.warning }]}>✏️ Редагувати</Text>
                    </TouchableOpacity>
                ) : null
            ),
        });
    }, [name, theme]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const text = await readFile(path);
                setContent(text);
            } catch {
                setError('Не вдалося прочитати файл');
            } finally {
                setLoading(false);
            }
        })();
    }, [path]);

    return (
        <Screen theme={theme}>
            <SafeAreaView style={{ flex: 1 }}>
                {loading ? <Loader theme={theme} /> : (
                    <>
                        {error ? <InlineAlert theme={theme} type="error" message={error} /> : null}
                        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                            {/* File badge */}
                            <View style={[s.badge, { backgroundColor: theme.accentBg }]}>
                                <Text style={s.badgeEmoji}>📄</Text>
                                <Text style={[s.badgeName, { color: theme.accent }]}>{name}</Text>
                            </View>

                            {/* Line numbers + content */}
                            <View style={[s.codeWrap, { backgroundColor: theme.bgCard, borderColor: theme.border }]}>
                                {content.split('\n').map((line, i) => (
                                    <View key={i} style={s.codeLine}>
                                        <Text style={[s.lineNum, { color: theme.textMuted }]}>{i + 1}</Text>
                                        <Text style={[s.lineText, { color: theme.text }]}>{line || ' '}</Text>
                                    </View>
                                ))}
                            </View>

                            <Text style={[s.hint, { color: theme.textMuted }]}>
                                {content.split('\n').length} рядків · {content.length} символів
                            </Text>
                        </ScrollView>
                    </>
                )}
            </SafeAreaView>
        </Screen>
    );
}

const s = StyleSheet.create({
    scroll:   { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 32 },
    badge:    { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 10, padding: 10, marginBottom: 12 },
    badgeEmoji: { fontSize: 20 },
    badgeName:  { fontSize: 14, fontWeight: '700', flex: 1 },
    codeWrap:   { borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginBottom: 10 },
    codeLine:   { flexDirection: 'row', paddingVertical: 2, paddingHorizontal: 12 },
    lineNum:    { width: 32, fontSize: 12, fontFamily: 'monospace', textAlign: 'right', marginRight: 12, opacity: 0.5 },
    lineText:   { flex: 1, fontSize: 14, fontFamily: 'monospace', lineHeight: 22 },
    hint:       { textAlign: 'center', fontSize: 12, fontWeight: '500' },
});

const hdr = StyleSheet.create({
    btn: { marginRight: 4, padding: 6 },
    txt: { fontSize: 14, fontWeight: '700' },
});