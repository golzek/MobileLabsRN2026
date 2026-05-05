import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    SafeAreaView,
    Alert,
} from 'react-native';

const COURSES = [
    { id: '1', title: 'Мобільна розробка', subject: 'React Native', progress: 75, color: '#4F46E5' },
    { id: '2', title: 'Веб-технології', subject: 'JavaScript', progress: 90, color: '#0EA5E9' },
    { id: '3', title: 'Бази даних', subject: 'SQL / NoSQL', progress: 60, color: '#10B981' },
    { id: '4', title: 'Алгоритми', subject: 'Python', progress: 45, color: '#F59E0B' },
];

export default function HomeScreen({ navigation }) {
    const [search, setSearch] = useState('');
    const [greeting] = useState(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Доброго ранку';
        if (hour < 17) return 'Доброго дня';
        return 'Доброго вечора';
    });

    const filtered = COURSES.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.subject.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>{greeting} 👋</Text>
                        <Text style={styles.name}>Студент ЖДТУ</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.notifBtn}
                        onPress={() => Alert.alert('Сповіщення', 'Нових сповіщень немає')}
                    >
                        <Text style={styles.notifIcon}>🔔</Text>
                    </TouchableOpacity>
                </View>

                {/* Search */}
                <View style={styles.searchWrap}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Пошук курсів..."
                        placeholderTextColor="#9CA3AF"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={[styles.statCard, { backgroundColor: '#EEF2FF' }]}>
                        <Text style={[styles.statNum, { color: '#4F46E5' }]}>4</Text>
                        <Text style={styles.statLabel}>Курси</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: '#E0F2FE' }]}>
                        <Text style={[styles.statNum, { color: '#0EA5E9' }]}>12</Text>
                        <Text style={styles.statLabel}>Тижні</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: '#D1FAE5' }]}>
                        <Text style={[styles.statNum, { color: '#10B981' }]}>67%</Text>
                        <Text style={styles.statLabel}>Прогрес</Text>
                    </View>
                </View>

                {/* Courses */}
                <Text style={styles.sectionTitle}>Мої курси</Text>
                {filtered.map(course => (
                    <TouchableOpacity
                        key={course.id}
                        style={styles.courseCard}
                        onPress={() => navigation.navigate('Details', { course })}
                        activeOpacity={0.85}
                    >
                        <View style={[styles.courseAccent, { backgroundColor: course.color }]} />
                        <View style={styles.courseBody}>
                            <Text style={styles.courseTitle}>{course.title}</Text>
                            <Text style={styles.courseSubject}>{course.subject}</Text>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${course.progress}%`, backgroundColor: course.color },
                                    ]}
                                />
                            </View>
                            <Text style={[styles.progressText, { color: course.color }]}>{course.progress}%</Text>
                        </View>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                ))}
                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#F8FAFC' },
    container: { flex: 1, paddingHorizontal: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 20,
    },
    greeting: { fontSize: 14, color: '#6B7280' },
    name: { fontSize: 22, fontWeight: '700', color: '#111827', marginTop: 2 },
    notifBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notifIcon: { fontSize: 20 },
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 14,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    searchIcon: { fontSize: 16, marginRight: 8 },
    searchInput: { flex: 1, height: 48, fontSize: 15, color: '#111827' },
    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
    statCard: {
        flex: 1,
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
    },
    statNum: { fontSize: 22, fontWeight: '800' },
    statLabel: { fontSize: 11, color: '#6B7280', marginTop: 2 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
    courseCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 12,
        overflow: 'hidden',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation: 4,
    },
    courseAccent: { width: 5, height: '100%', minHeight: 90 },
    courseBody: { flex: 1, padding: 14 },
    courseTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
    courseSubject: { fontSize: 13, color: '#6B7280', marginTop: 2, marginBottom: 10 },
    progressBar: {
        height: 6,
        backgroundColor: '#F3F4F6',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: { height: '100%', borderRadius: 3 },
    progressText: { fontSize: 12, fontWeight: '600', marginTop: 4 },
    arrow: { fontSize: 24, color: '#D1D5DB', paddingRight: 14 },
});