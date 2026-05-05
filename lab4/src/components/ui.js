import React from 'react';
import {
    View, Text, TouchableOpacity, TextInput,
    Modal, StyleSheet, useColorScheme, ActivityIndicator,
} from 'react-native';

// ─── Theme ────────────────────────────────────────────────────────────────────
export function useTheme() {
    const scheme = useColorScheme();
    const dark = scheme === 'dark';
    return {
        dark,
        bg:          dark ? '#0F172A' : '#F1F5F9',
        bgCard:      dark ? '#1E293B' : '#FFFFFF',
        bgSecondary: dark ? '#162032' : '#F8FAFC',
        bgInput:     dark ? '#0F172A' : '#F1F5F9',
        text:        dark ? '#F1F5F9' : '#0F172A',
        textSub:     dark ? '#94A3B8' : '#64748B',
        textMuted:   dark ? '#475569' : '#94A3B8',
        accent:      dark ? '#818CF8' : '#6366F1',
        accentBg:    dark ? '#1E1B4B' : '#EEF2FF',
        success:     dark ? '#34D399' : '#10B981',
        successBg:   dark ? '#022C22' : '#D1FAE5',
        warning:     dark ? '#FBBF24' : '#F59E0B',
        warningBg:   dark ? '#1A1000' : '#FEF3C7',
        danger:      dark ? '#F87171' : '#EF4444',
        dangerBg:    dark ? '#1F0707' : '#FEE2E2',
        border:      dark ? '#1E293B' : '#E2E8F0',
        shadow:      dark ? 'rgba(0,0,0,0.5)' : 'rgba(99,102,241,0.1)',
        overlay:     'rgba(0,0,0,0.55)',
    };
}

// ─── Base screen wrapper ──────────────────────────────────────────────────────
export function Screen({ theme, children, style }) {
    return (
        <View style={[{ flex: 1, backgroundColor: theme.bg }, style]}>
            {children}
        </View>
    );
}

// ─── Card ────────────────────────────────────────────────────────────────────
export function Card({ theme, children, style }) {
    return (
        <View style={[s.card, { backgroundColor: theme.bgCard, borderColor: theme.border }, style]}>
            {children}
        </View>
    );
}

// ─── Section label ────────────────────────────────────────────────────────────
export function SectionLabel({ theme, children }) {
    return <Text style={[s.sectionLabel, { color: theme.textMuted }]}>{children}</Text>;
}

// ─── Stat card ────────────────────────────────────────────────────────────────
export function StatCard({ theme, icon, label, value, color }) {
    return (
        <View style={[s.statCard, { backgroundColor: theme.bgCard, borderColor: theme.border }]}>
            <Text style={s.statIcon}>{icon}</Text>
            <Text style={[s.statValue, { color: color ?? theme.text }]}>{value}</Text>
            <Text style={[s.statLabel, { color: theme.textMuted }]}>{label}</Text>
        </View>
    );
}

// ─── Action button ────────────────────────────────────────────────────────────
export function ActionBtn({ theme, icon, label, onPress, color, disabled }) {
    const c = color ?? theme.accent;
    return (
        <TouchableOpacity
            style={[s.actionBtn, { borderColor: c + '50', backgroundColor: c + '15' }, disabled && { opacity: 0.4 }]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.75}
        >
            <Text style={s.actionBtnIcon}>{icon}</Text>
            <Text style={[s.actionBtnLabel, { color: c }]}>{label}</Text>
        </TouchableOpacity>
    );
}

// ─── Confirm dialog ───────────────────────────────────────────────────────────
export function ConfirmModal({ visible, theme, title, message, onConfirm, onCancel, confirmLabel = 'Видалити', danger = true }) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
            <TouchableOpacity style={[s.overlay, { backgroundColor: theme.overlay }]} activeOpacity={1} onPress={onCancel}>
                <View style={[s.dialog, { backgroundColor: theme.bgCard }]}>
                    <Text style={[s.dialogTitle, { color: theme.text }]}>{title}</Text>
                    {!!message && <Text style={[s.dialogMsg, { color: theme.textSub }]}>{message}</Text>}
                    <View style={s.dialogBtns}>
                        <TouchableOpacity style={[s.dialogBtn, { borderColor: theme.border }]} onPress={onCancel}>
                            <Text style={[s.dialogBtnTxt, { color: theme.textSub }]}>Скасувати</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[s.dialogBtn, { backgroundColor: danger ? theme.danger : theme.accent, borderColor: 'transparent' }]}
                            onPress={onConfirm}
                        >
                            <Text style={[s.dialogBtnTxt, { color: '#fff' }]}>{confirmLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

// ─── Input modal ──────────────────────────────────────────────────────────────
export function InputModal({ visible, theme, title, fields, onConfirm, onCancel, confirmLabel = 'Створити' }) {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
            <TouchableOpacity style={[s.overlay, { backgroundColor: theme.overlay }]} activeOpacity={1} onPress={onCancel}>
                <View style={[s.dialog, { backgroundColor: theme.bgCard }]} onStartShouldSetResponder={() => true}>
                    <Text style={[s.dialogTitle, { color: theme.text }]}>{title}</Text>
                    {fields}
                    <View style={s.dialogBtns}>
                        <TouchableOpacity style={[s.dialogBtn, { borderColor: theme.border }]} onPress={onCancel}>
                            <Text style={[s.dialogBtnTxt, { color: theme.textSub }]}>Скасувати</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[s.dialogBtn, { backgroundColor: theme.accent, borderColor: 'transparent' }]}
                            onPress={onConfirm}
                        >
                            <Text style={[s.dialogBtnTxt, { color: '#fff' }]}>{confirmLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

// ─── StyledInput ──────────────────────────────────────────────────────────────
export function StyledInput({ theme, style, ...props }) {
    return (
        <TextInput
            style={[s.input, { backgroundColor: theme.bgInput, color: theme.text, borderColor: theme.border }, style]}
            placeholderTextColor={theme.textMuted}
            {...props}
        />
    );
}

// ─── Loading ──────────────────────────────────────────────────────────────────
export function Loader({ theme }) {
    return (
        <View style={s.loaderWrap}>
            <ActivityIndicator color={theme.accent} size="large" />
        </View>
    );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
export function Empty({ theme, message = 'Папка порожня' }) {
    return (
        <View style={s.emptyWrap}>
            <Text style={s.emptyEmoji}>📂</Text>
            <Text style={[s.emptyTxt, { color: theme.textMuted }]}>{message}</Text>
        </View>
    );
}

// ─── Toast-like inline alert ──────────────────────────────────────────────────
export function InlineAlert({ theme, type = 'error', message }) {
    if (!message) return null;
    const color = type === 'error' ? theme.danger : type === 'success' ? theme.success : theme.warning;
    const bg    = type === 'error' ? theme.dangerBg : type === 'success' ? theme.successBg : theme.warningBg;
    return (
        <View style={[s.alert, { backgroundColor: bg, borderColor: color }]}>
            <Text style={[s.alertTxt, { color }]}>{message}</Text>
        </View>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    card: {
        borderRadius: 16, padding: 14, marginBottom: 10,
        borderWidth: 1,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
    },
    sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginBottom: 8, marginTop: 4, marginLeft: 2 },
    statCard: {
        flex: 1, borderRadius: 14, padding: 12, alignItems: 'center',
        borderWidth: 1,
    },
    statIcon:  { fontSize: 22, marginBottom: 4 },
    statValue: { fontSize: 16, fontWeight: '800', marginBottom: 2 },
    statLabel: { fontSize: 10, fontWeight: '600', textAlign: 'center' },
    actionBtn: {
        flex: 1, borderRadius: 12, borderWidth: 1.5,
        paddingVertical: 10, alignItems: 'center', justifyContent: 'center',
    },
    actionBtnIcon:  { fontSize: 18, marginBottom: 3 },
    actionBtnLabel: { fontSize: 11, fontWeight: '700' },
    overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    dialog: {
        width: '100%', borderRadius: 20, padding: 22,
        shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25, shadowRadius: 20, elevation: 12,
    },
    dialogTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
    dialogMsg:   { fontSize: 14, lineHeight: 20, marginBottom: 16 },
    dialogBtns:  { flexDirection: 'row', gap: 10, marginTop: 16 },
    dialogBtn:   {
        flex: 1, borderRadius: 12, paddingVertical: 12,
        alignItems: 'center', borderWidth: 1.5,
    },
    dialogBtnTxt: { fontSize: 14, fontWeight: '700' },
    input: {
        borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14,
        paddingVertical: 11, fontSize: 14, marginBottom: 10,
    },
    loaderWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyWrap:  { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
    emptyEmoji: { fontSize: 52, marginBottom: 12 },
    emptyTxt:   { fontSize: 15, fontWeight: '600' },
    alert: { borderRadius: 10, borderWidth: 1.5, padding: 10, marginBottom: 10 },
    alertTxt: { fontSize: 13, fontWeight: '600' },
});