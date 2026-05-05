import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { readFile, saveFile } from '../utils/filesystem';
import { useTheme, Screen, Loader, InlineAlert } from '../components/ui';

export default function EditorScreen({ route, navigation }) {
    const theme = useTheme();
    const { path, name } = route.params;

    const [content,  setContent]  = useState('');
    const [original, setOriginal] = useState('');
    const [loading,  setLoading]  = useState(true);
    const [saving,   setSaving]   = useState(false);
    const [saved,    setSaved]    = useState(false);
    const [error,    setError]    = useState('');

    const isDirty = content !== original;

    // ── Load file ─────────────────────────────────────────────────────────────
    useEffect(() => {
        (async () => {
            try {
                const text = await readFile(path);
                setContent(text);
                setOriginal(text);
            } catch { setError('Не вдалося відкрити файл'); }
            finally  { setLoading(false); }
        })();
    }, [path]);

    // ── Handle back with unsaved changes ─────────────────────────────────────
    useEffect(() => {
        const unsub = navigation.addListener('beforeRemove', e => {
            if (!isDirty) return;
            e.preventDefault();
            Alert.alert(
                'Незбережені зміни',
                'Зберегти зміни перед виходом?',
                [
                    { text: 'Скасувати', style: 'cancel' },
                    { text: 'Не зберігати', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
                    { text: 'Зберегти', onPress: async () => { await handleSave(); navigation.dispatch(e.data.action); } },
                ]
            );
        });
        return unsub;
    }, [navigation, isDirty, content]);

    // ── Header ────────────────────────────────────────────────────────────────
    useLayoutEffect(() => {
        navigation.setOptions({
            title: `✏️ ${name}`,
            headerRight: () => (
                <TouchableOpacity
                    onPress={handleSave}
                    disabled={!isDirty || saving}
                    style={[hdr.btn, { opacity: (!isDirty || saving) ? 0.4 : 1, backgroundColor: theme.accentBg }]}
                >
                    <Text style={[hdr.txt, { color: theme.accent }]}>
                        {saving ? '⏳' : '💾'} Зберегти
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [isDirty, saving, theme, content]);

    // ── Save ──────────────────────────────────────────────────────────────────
    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
            await saveFile(path, content);
            setOriginal(content);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch { setError('Не вдалося зберегти файл'); }
        finally  { setSaving(false); }
    };

    return (
        <Screen theme={theme}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    {loading ? <Loader theme={theme} /> : (
                        <View style={{ flex: 1, padding: 14 }}>
                            {error  ? <InlineAlert theme={theme} type="error"   message={error} /> : null}
                            {saved  ? <InlineAlert theme={theme} type="success" message="✅ Збережено!" /> : null}
                            {isDirty && !saved ? <InlineAlert theme={theme} type="warning" message="⚠️ Є незбережені зміни" /> : null}

                            {/* Stats row */}
                            <View style={[s.stats, { backgroundColor: theme.bgCard, borderColor: theme.border }]}>
                                <Text style={[s.statTxt, { color: theme.textMuted }]}>
                                    📄 {name}
                                </Text>
                                <Text style={[s.statTxt, { color: theme.textMuted }]}>
                                    {content.split('\n').length} рядків · {content.length} симв
                                </Text>
                            </View>

                            {/* Editor */}
                            <TextInput
                                style={[s.editor, {
                                    backgroundColor: theme.bgCard,
                                    color: theme.text,
                                    borderColor: isDirty ? theme.warning : theme.border,
                                }]}
                                value={content}
                                onChangeText={setContent}
                                multiline
                                scrollEnabled
                                autoCorrect={false}
                                autoCapitalize="none"
                                spellCheck={false}
                                textAlignVertical="top"
                                placeholder="Введіть текст файлу..."
                                placeholderTextColor={theme.textMuted}
                            />

                            {/* Bottom bar */}
                            <View style={s.bottomBar}>
                                <TouchableOpacity
                                    style={[s.resetBtn, { borderColor: theme.border }]}
                                    onPress={() => {
                                        Alert.alert('Скинути зміни?', '', [
                                            { text: 'Скасувати', style: 'cancel' },
                                            { text: 'Скинути', onPress: () => setContent(original) },
                                        ]);
                                    }}
                                    disabled={!isDirty}
                                >
                                    <Text style={[s.resetTxt, { color: theme.textSub, opacity: isDirty ? 1 : 0.4 }]}>
                                        ↺ Скинути
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[s.saveBtn, { backgroundColor: isDirty ? theme.accent : theme.border }]}
                                    onPress={handleSave}
                                    disabled={!isDirty || saving}
                                >
                                    <Text style={s.saveTxt}>
                                        {saving ? '⏳ Збереження...' : '💾 Зберегти'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Screen>
    );
}

const s = StyleSheet.create({
    stats: {
        flexDirection: 'row', justifyContent: 'space-between',
        borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10,
    },
    statTxt: { fontSize: 12, fontWeight: '500' },
    editor: {
        flex: 1, borderRadius: 14, borderWidth: 1.5,
        padding: 14, fontSize: 14, fontFamily: 'monospace', lineHeight: 22,
        marginBottom: 10,
    },
    bottomBar:  { flexDirection: 'row', gap: 10 },
    resetBtn:   { borderRadius: 12, borderWidth: 1.5, paddingVertical: 13, paddingHorizontal: 20, alignItems: 'center' },
    resetTxt:   { fontSize: 14, fontWeight: '700' },
    saveBtn:    { flex: 1, borderRadius: 12, paddingVertical: 13, alignItems: 'center' },
    saveTxt:    { fontSize: 14, fontWeight: '700', color: '#fff' },
});

const hdr = StyleSheet.create({
    btn: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, marginRight: 4 },
    txt: { fontSize: 13, fontWeight: '700' },
});