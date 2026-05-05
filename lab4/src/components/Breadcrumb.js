import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { buildBreadcrumbs, ROOT_DIR } from '../utils/filesystem';

export default function Breadcrumb({ currentPath, theme, onNavigate }) {
    const crumbs = buildBreadcrumbs(currentPath, ROOT_DIR);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.wrap}
        >
            {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                    <View key={crumb.path} style={s.crumbRow}>
                        <TouchableOpacity
                            onPress={() => !isLast && onNavigate(crumb.path)}
                            disabled={isLast}
                        >
                            <Text style={[
                                s.crumb,
                                { color: isLast ? theme.accent : theme.textSub },
                                isLast && { fontWeight: '700' },
                            ]}>
                                {crumb.name}
                            </Text>
                        </TouchableOpacity>
                        {!isLast && (
                            <Text style={[s.sep, { color: theme.textMuted }]}> / </Text>
                        )}
                    </View>
                );
            })}
        </ScrollView>
    );
}

const s = StyleSheet.create({
    wrap: { paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' },
    crumbRow: { flexDirection: 'row', alignItems: 'center' },
    crumb: { fontSize: 13, fontWeight: '500' },
    sep:   { fontSize: 13 },
});