import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatSize, getFileIcon } from '../utils/filesystem';

export default function FileItem({ item, theme, onPress, onLongPress }) {
    return (
        <TouchableOpacity
            style={[s.row, { backgroundColor: theme.bgCard, borderColor: theme.border }]}
            onPress={() => onPress(item)}
            onLongPress={() => onLongPress(item)}
            activeOpacity={0.75}
        >
            {/* Icon */}
            <View style={[s.iconWrap, { backgroundColor: item.isDirectory ? theme.accentBg : theme.bgSecondary }]}>
                <Text style={s.icon}>{getFileIcon(item.name, item.isDirectory)}</Text>
            </View>

            {/* Name + meta */}
            <View style={s.info}>
                <Text style={[s.name, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
                <Text style={[s.meta, { color: theme.textMuted }]}>
                    {item.isDirectory ? 'Папка' : formatSize(item.size)}
                </Text>
            </View>

            {/* Chevron */}
            <Text style={[s.chevron, { color: theme.textMuted }]}>
                {item.isDirectory ? '›' : '·'}
            </Text>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    row: {
        flexDirection: 'row', alignItems: 'center',
        borderRadius: 14, padding: 12, marginBottom: 6,
        borderWidth: 1,
    },
    iconWrap: {
        width: 42, height: 42, borderRadius: 12,
        justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    icon: { fontSize: 22 },
    info: { flex: 1 },
    name: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
    meta: { fontSize: 12, fontWeight: '500' },
    chevron: { fontSize: 22, fontWeight: '700', marginLeft: 6 },
});