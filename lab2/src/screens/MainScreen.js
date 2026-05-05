import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import NewsCard from '../components/NewsCard';
import { INITIAL_NEWS, EXTRA_NEWS } from '../data/mockData';


function ListHeader({ onMenuPress }) {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.menuBtn} onPress={onMenuPress}>
                <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
            <View style={styles.headerText}>
                <Text style={styles.headerTitle}>📰 Новини</Text>
                <Text style={styles.headerSub}>Останні події</Text>
            </View>
        </View>
    );
}

function ListFooter({ loading }) {
    if (!loading) return <View style={{ height: 24 }} />;
    return (
        <View style={styles.footerLoader}>
            <ActivityIndicator color="#3B82F6" />
            <Text style={styles.footerTxt}>Завантаження...</Text>
        </View>
    );
}

function ItemSeparator() {
    return <View style={styles.separator} />;
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function MainScreen({ navigation }) {
    const [news, setNews] = useState(INITIAL_NEWS);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

    // Pull-to-Refresh
    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            // Shuffle order to simulate fresh data
            setNews([...INITIAL_NEWS].sort(() => Math.random() - 0.5));
            setAllLoaded(false);
            setRefreshing(false);
        }, 1500);
    }, []);

    // Infinite Scroll
    const handleEndReached = useCallback(() => {
        if (loadingMore || allLoaded) return;
        setLoadingMore(true);
        setTimeout(() => {
            setNews(prev => {
                const newBatch = EXTRA_NEWS.filter(n => !prev.some(p => p.id === n.id));
                if (newBatch.length === 0) {
                    setAllLoaded(true);
                }
                return [...prev, ...newBatch];
            });
            setLoadingMore(false);
        }, 1200);
    }, [loadingMore, allLoaded]);

    const handlePressNews = useCallback(
        item => navigation.navigate('Details', { newsItem: item }),
        [navigation]
    );

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <FlatList
                data={news}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <NewsCard item={item} onPress={handlePressNews} />
                )}
                contentContainerStyle={styles.list}
                // ── Required components ──────────────────
                ListHeaderComponent={
                    <ListHeader onMenuPress={() => navigation.openDrawer()} />
                }
                ListFooterComponent={
                    allLoaded
                        ? <Text style={styles.allLoadedTxt}>✅ Всі новини завантажені</Text>
                        : <ListFooter loading={loadingMore} />
                }
                ItemSeparatorComponent={ItemSeparator}
                // ── Pull-to-Refresh ──────────────────────
                refreshing={refreshing}
                onRefresh={handleRefresh}
                // ── Infinite Scroll ──────────────────────
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.4}
                // ── Optimisation ────────────────────────
                initialNumToRender={4}
                maxToRenderPerBatch={4}
                windowSize={7}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#F8FAFC' },
    list: { paddingHorizontal: 16, paddingBottom: 16 },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        gap: 14,
    },
    menuBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: { fontSize: 20, color: '#F1F5F9' },
    headerText: { flex: 1 },
    headerTitle: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
    headerSub: { fontSize: 13, color: '#64748B', marginTop: 2 },

    separator: { height: 12 },

    footerLoader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 20,
    },
    footerTxt: { fontSize: 13, color: '#94A3B8' },
    allLoadedTxt: {
        textAlign: 'center',
        fontSize: 13,
        color: '#94A3B8',
        paddingVertical: 20,
    },
});