import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { getItemInfo, formatSize, formatDate, getFileIcon, getFileType } from '../utils/filesystem';
import { useTheme, Screen, Card, Loader, SectionLabel } from '../components/ui';

function InfoRow({ theme, label, value }) {
    return (
        <View style={[s.row, { borderBottomColor: theme.border }]}>
            <Text style={[s.label, { color: theme.textMuted }]}>{label}</Text>
            <Text style={[s.value, { color: theme.text }]} selectable>{value}</Text>
        </View>
    );
}

export default function FileInfoScreen({ route }) {
    const theme = useTheme();
    const { path, name, isDirectory } = route.params;
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const i = await getItemInfo(path);
                setInfo(i);
            } finally { setLoading(false); }
        })();
    }, [path]);

    return (
        <Screen theme={theme}>
            <SafeAreaView style={{ flex: 1 }}>
                {loading ? <Loader theme={theme} /> : (
                    <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                        {/* Icon block */}
                        <View style={[s.iconBlock, { backgroundColor: theme.bgCard, borderColor: theme.border }]}>
                            <Text style={s.icon}>{getFileIcon(name, isDirectory)}</Text>
                            <Text style={[s.name, { color: theme.text }]}>{name}</Text>
                            <Text style={[s.type, { color: theme.textMuted }]}>{getFileType(name, isDirectory)}</Text>
                        </View>

                        <SectionLabel theme={theme}>ДЕТАЛІ</SectionLabel>
                        <Card theme={theme} style={{ padding: 0, overflow: 'hidden' }}>
                            <InfoRow theme={theme} label="Назва"        value={name} />
                            <InfoRow theme={theme} label="Тип"          value={getFileType(name, isDirectory)} />
                            <InfoRow theme={theme} label="Розмір"       value={isDirectory ? '—' : formatSize(info?.size)} />
                            <InfoRow theme={theme} label="Змінено"      value={formatDate(info?.modificationTime)} />
                            <InfoRow theme={theme} label="Існує"        value={info?.exists ? '✅ Так' : '❌ Ні'} />
                        </Card>

                        <SectionLabel theme={theme}>ШЛЯХ</SectionLabel>
                        <Card theme={theme}>
                            <Text style={[s.pathTxt, { color: theme.textSub }]} selectable>{path}</Text>
                        </Card>
                    </ScrollView>
                )}
            </SafeAreaView>
        </Screen>
    );
}

const s = StyleSheet.create({
    scroll:    { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
    iconBlock: {
        alignItems: 'center', borderRadius: 20, borderWidth: 1,
        paddingVertical: 28, marginBottom: 16,
    },
    icon:   { fontSize: 56, marginBottom: 10 },
    name:   { fontSize: 18, fontWeight: '800', marginBottom: 4 },
    type:   { fontSize: 13, fontWeight: '500' },
    row: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 14, paddingVertical: 13,
        borderBottomWidth: 1,
    },
    label: { fontSize: 13, fontWeight: '600', flex: 1 },
    value: { fontSize: 13, fontWeight: '500', flex: 2, textAlign: 'right' },
    pathTxt: { fontSize: 12, fontFamily: 'monospace', lineHeight: 18 },
});