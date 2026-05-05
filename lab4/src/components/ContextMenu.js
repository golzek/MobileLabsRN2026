import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { isTextFile } from '../utils/filesystem';

export default function ContextMenu({ visible, item, theme, onClose, onOpen, onInfo, onEdit, onDelete }) {
    if (!item) return null;

    const canEdit = !item.isDirectory && isTextFile(item.name);
    const canOpen = !item.isDirectory && isTextFile(item.name);

    const ACTIONS = [
        canOpen  && { icon: '👁️', label: 'Переглянути',    color: theme.accent,   onPress: onOpen   },
        canEdit  && { icon: '✏️', label: 'Редагувати',       color: theme.warning,  onPress: onEdit   },
        { icon: 'ℹ️', label: 'Властивості',     color: theme.accent,   onPress: onInfo   },
        { icon: '🗑️', label: 'Видалити',        color: theme.danger,   onPress: onDelete },
    ].filter(Boolean);

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <TouchableOpacity style={[s.overlay, { backgroundColor: theme.overlay }]} activeOpacity={1} onPress={onClose}>
                <View style={[s.sheet, { backgroundColor: theme.bgCard }]} onStartShouldSetResponder={() => true}>
                    {/* Handle */}
                    <View style={[s.handle, { backgroundColor: theme.border }]} />

                    {/* Item header */}
                    <View style={[s.itemHeader, { backgroundColor: theme.bgSecondary, borderColor: theme.border }]}>
                        <Text style={s.itemEmoji}>{item.isDirectory ? '📁' : '📄'}</Text>
                        <Text style={[s.itemName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
                    </View>

                    {/* Actions */}
                    {ACTIONS.map(a => (
                        <TouchableOpacity
                            key={a.label}
                            style={[s.action, { borderColor: theme.border }]}
                            onPress={() => { onClose(); a.onPress(); }}
                            activeOpacity={0.7}
                        >
                            <Text style={s.actionIcon}>{a.icon}</Text>
                            <Text style={[s.actionLabel, { color: a.color }]}>{a.label}</Text>
                        </TouchableOpacity>
                    ))}

                    {/* Cancel */}
                    <TouchableOpacity style={[s.cancel, { backgroundColor: theme.bgSecondary }]} onPress={onClose}>
                        <Text style={[s.cancelTxt, { color: theme.textSub }]}>Скасувати</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const s = StyleSheet.create({
    overlay:   { flex: 1, justifyContent: 'flex-end' },
    sheet:     { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16, paddingBottom: 32 },
    handle:    { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
    itemHeader: {
        flexDirection: 'row', alignItems: 'center', gap: 10,
        borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 12,
    },
    itemEmoji: { fontSize: 24 },
    itemName:  { flex: 1, fontSize: 15, fontWeight: '700' },
    action:    {
        flexDirection: 'row', alignItems: 'center', gap: 14,
        paddingVertical: 14, borderBottomWidth: 1,
    },
    actionIcon:  { fontSize: 20, width: 28 },
    actionLabel: { fontSize: 15, fontWeight: '600' },
    cancel:    { borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
    cancelTxt: { fontSize: 15, fontWeight: '700' },
});