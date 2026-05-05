import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Alert,
} from 'react-native';

const TOPICS = [
    { id: 1, title: 'Вступ до курсу', duration: '45 хв', done: true },
    { id: 2, title: 'Основні концепції', duration: '60 хв', done: true },
    { id: 3, title: 'Практична робота №1', duration: '90 хв', done: true },
    { id: 4, title: 'Проміжний тест', duration: '30 хв', done: false },
    { id: 5, title: 'Поглиблене вивчення', duration: '75 хв', done: false },
    { id: 6, title: 'Фінальний проєкт', duration: '120 хв', done: false },
];

export default function DetailsScreen({ route, navigation }) {
    const { course } = route.params;

    const done = TOPICS.filter(t => t.done).length;

    return (
        <SafeAreaView style={styles.safe}>
            {/* Hero */}
            <View style={[styles.hero, { backgroundColor: course.color }]}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backIcon}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.heroLabel}>Курс</Text>
                <Text style={styles.heroTitle}>{course.title}</Text>
                <Text style={styles.heroSub}>{course.subject}</Text>

                <View style={styles.heroStats}>
                    <View style={styles.heroStat}>
                        <Text style={styles.heroStatNum}>{TOPICS.length}</Text>
                        <Text style={styles.heroStatLabel}>Тем</Text>
                    </View>
                    <View style={styles.heroDivider} />
                    <View style={styles.heroStat}>
                        <Text style={styles.heroStatNum}>{done}</Text>
                        <Text style={styles.heroStatLabel}>Виконано</Text>
                    </View>
                    <View style={styles.heroDivider} />
                    <View style={styles.heroStat}>
                        <Text style={styles.heroStatNum}>{course.progress}%</Text>
                        <Text style={styles.heroStatLabel}>Прогрес</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Програма курсу</Text>
                {TOPICS.map((topic, index) => (
                    <View key={topic.id} style={styles.topicRow}>
                        <View style={styles.stepCol}>
                            <View style={[styles.stepCircle, topic.done && { backgroundColor: course.color }]}>
                                <Text style={[styles.stepNum, topic.done && { color: '#fff' }]}>
                                    {topic.done ? '✓' : index + 1}
                                </Text>
                            </View>
                            {index < TOPICS.length - 1 && (
                                <View style={[styles.stepLine, topic.done && { backgroundColor: course.color }]} />
                            )}
                        </View>
                        <TouchableOpacity
                            style={[styles.topicCard, topic.done && styles.topicCardDone]}
                            onPress={() => Alert.alert(topic.title, `Тривалість: ${topic.duration}`)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.topicTitle, topic.done && styles.topicTitleDone]}>
                                {topic.title}
                            </Text>
                            <Text style={styles.topicDuration}>⏱ {topic.duration}</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity
                    style={[styles.startBtn, { backgroundColor: course.color }]}
                    onPress={() => Alert.alert('Продовжити', `Розпочати тему ${done + 1}?`)}
                    activeOpacity={0.85}
                >
                    <Text style={styles.startBtnText}>Продовжити навчання →</Text>
                </TouchableOpacity>
                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#F8FAFC' },
    hero: {
        paddingTop: 16,
        paddingBottom: 28,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    backIcon: { fontSize: 28, color: '#fff', lineHeight: 32 },
    heroLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, textTransform: 'uppercase' },
    heroTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginTop: 4 },
    heroSub: { fontSize: 15, color: 'rgba(255,255,255,0.8)', marginTop: 4, marginBottom: 20 },
    heroStats: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        padding: 14,
        alignItems: 'center',
    },
    heroStat: { flex: 1, alignItems: 'center' },
    heroStatNum: { fontSize: 20, fontWeight: '800', color: '#fff' },
    heroStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
    heroDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.25)' },
    content: { flex: 1, paddingHorizontal: 20, paddingTop: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 16 },
    topicRow: { flexDirection: 'row', marginBottom: 4 },
    stepCol: { alignItems: 'center', marginRight: 14, width: 32 },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    stepNum: { fontSize: 13, fontWeight: '700', color: '#9CA3AF' },
    stepLine: { width: 2, flex: 1, backgroundColor: '#E5E7EB', marginVertical: 4 },
    topicCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    topicCardDone: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#BBF7D0' },
    topicTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
    topicTitleDone: { color: '#15803D' },
    topicDuration: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
    startBtn: {
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    startBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});