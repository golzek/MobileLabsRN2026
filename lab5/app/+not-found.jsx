import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🔍</Text>
      <Text style={styles.code}>404</Text>
      <Text style={styles.title}>Екран не знайдено</Text>
      <Text style={styles.description}>
        Схоже, сторінка, яку ви шукаєте, не існує або була переміщена.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>← На головну</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#F7F8FC' },
  emoji: { fontSize: 72, marginBottom: 12 },
  code: { fontSize: 72, fontWeight: '900', color: '#E0DFF8', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A2E', marginBottom: 12 },
  description: { fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  button: { backgroundColor: '#6C63FF', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 14 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
