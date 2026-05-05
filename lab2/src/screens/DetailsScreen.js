import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Share,
    Alert,
} from 'react-native';
import { getCategoryColor } from '../data/mockData';

export default function DetailsScreen({ route, navigation }) {
    const { newsItem } = route.params;
    const catColor = getCategoryColor(newsItem.category);

    const handleShare = async () => {
        try {
            await Share.share({
                title: newsItem.title,
                message: `${newsItem.title}\n\n${newsItem.description}`,
            });
        } catch {
            Alert.alert('Помилка', 'Не вдалося поділитися новиною');
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image + back/share bar */}
                <View style={styles.imageWrap}>
                    <Image source={{ uri: newsItem.image }} style={styles.image} resizeMode="cover" />
                    <View style={styles.imageOverlay}>
                        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                            <Text style={styles.iconTxt}>‹</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn} onPress={handleShare}>
                            <Text style={styles.iconTxt}>⎙</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Category */}
                    <View style={[styles.catBadge, { backgroundColor: catColor + '15', borderColor: catColor + '30' }]}>
                        <Text style={[styles.catTxt, { color: catColor }]}>{newsItem.category}</Text>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>{newsItem.title}</Text>

                    {/* Author/date strip */}
                    <View style={styles.metaRow}>
                        <View style={styles.authorChip}>
                            <Text style={styles.authorAvatar}>✍️</Text>
                            <View>
                                <Text style={styles.authorName}>{newsItem.author}</Text>
                                <Text style={styles.authorDate}>{newsItem.date}</Text>
                            </View>
                        </View>
                        <View style={styles.metaRight}>
                            <View style={styles.metaChip}>
                                <Text style={styles.metaChipTxt}>⏱ {newsItem.readTime}</Text>
                            </View>
                            <View style={styles.metaChip}>
                                <Text style={styles.metaChipTxt}>👁 {newsItem.views.toLocaleString()}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Body text — repeating description for demo */}
                    <Text style={styles.body}>{newsItem.description}</Text>
                    <Text style={styles.body}>
                        Ця новина відображає найактуальніші тенденції у своїй сфері. Експерти зазначають, що подібні
                        зміни матимуть довготривалий вплив на суспільство. Аналітики рекомендують уважно стежити
                        за розвитком подій упродовж наступних тижнів.
                    </Text>
                    <Text style={styles.body}>
                        Серед ключових аспектів варто виділити інноваційний підхід до вирішення проблеми, широке
                        залучення зацікавлених сторін та прозорість процесу прийняття рішень. Очікується, що наступний
                        крок буде оголошено вже незабаром.
                    </Text>

                    {/* Tags */}
                    <View style={styles.tagsWrap}>
                        {['Новини', newsItem.category, '2026', 'Україна'].map(tag => (
                            <View key={tag} style={styles.tag}>
                                <Text style={styles.tagTxt}># {tag}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#FFFFFF' },
    imageWrap: { position: 'relative' },
    image: { width: '100%', height: 260 },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    iconBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconTxt: { fontSize: 22, color: '#fff', fontWeight: '700' },

    content: { padding: 18 },
    catBadge: {
        alignSelf: 'flex-start',
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom: 12,
    },
    catTxt: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
    title: { fontSize: 22, fontWeight: '800', color: '#0F172A', lineHeight: 30, marginBottom: 16 },

    metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    authorChip: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    authorAvatar: { fontSize: 24 },
    authorName: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
    authorDate: { fontSize: 11, color: '#94A3B8', marginTop: 1 },
    metaRight: { flexDirection: 'row', gap: 6 },
    metaChip: {
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    metaChipTxt: { fontSize: 11, color: '#64748B', fontWeight: '600' },

    divider: { height: 1, backgroundColor: '#F1F5F9', marginBottom: 16 },
    body: { fontSize: 15, color: '#334155', lineHeight: 24, marginBottom: 14 },

    tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
    tag: { backgroundColor: '#F1F5F9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
    tagTxt: { fontSize: 12, color: '#64748B', fontWeight: '600' },
});