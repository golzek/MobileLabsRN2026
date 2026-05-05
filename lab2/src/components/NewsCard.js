import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { getCategoryColor } from '../data/mockData';

export default function NewsCard({ item, onPress }) {
    const catColor = getCategoryColor(item.category);

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.87}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            <View style={styles.body}>
                {/* Category badge */}
                <View style={[styles.catBadge, { backgroundColor: catColor + '20', borderColor: catColor + '40' }]}>
                    <Text style={[styles.catTxt, { color: catColor }]}>{item.category}</Text>
                </View>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
                <View style={styles.meta}>
                    <Text style={styles.metaTxt}>✍️ {item.author}</Text>
                    <Text style={styles.metaDot}>·</Text>
                    <Text style={styles.metaTxt}>📅 {item.date}</Text>
                    <Text style={styles.metaDot}>·</Text>
                    <Text style={styles.metaTxt}>⏱ {item.readTime}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.views}>👁 {item.views.toLocaleString()}</Text>
                    <Text style={[styles.readMore, { color: catColor }]}>Читати →</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    image: { width: '100%', height: 180 },
    body: { padding: 14 },
    catBadge: {
        alignSelf: 'flex-start',
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginBottom: 8,
    },
    catTxt: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
    title: { fontSize: 16, fontWeight: '800', color: '#0F172A', lineHeight: 22, marginBottom: 6 },
    desc: { fontSize: 13, color: '#64748B', lineHeight: 19, marginBottom: 10 },
    meta: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 10 },
    metaTxt: { fontSize: 11, color: '#94A3B8' },
    metaDot: { fontSize: 11, color: '#CBD5E1' },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    views: { fontSize: 12, color: '#94A3B8' },
    readMore: { fontSize: 13, fontWeight: '700' },
});