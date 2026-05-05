import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { products } from '../../../data/products';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === String(id));

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundEmoji}>😕</Text>
        <Text style={styles.notFoundTitle}>Товар не знайдено</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Повернутися</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <View style={styles.body}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price.toLocaleString('uk-UA')} ₴</Text>

          <View style={styles.divider} />

          <Text style={styles.descLabel}>Опис</Text>
          <Text style={styles.description}>{product.description}</Text>

          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyBtnText}>🛒 Додати до кошика</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
            <Text style={styles.backLinkText}>← Назад до каталогу</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  content: { paddingBottom: 40 },
  image: { width: '100%', height: 280, resizeMode: 'cover' },
  body: { padding: 20 },
  category: { fontSize: 12, color: '#6C63FF', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  name: { fontSize: 24, fontWeight: '800', color: '#1A1A2E', lineHeight: 32, marginBottom: 10 },
  price: { fontSize: 28, fontWeight: '900', color: '#6C63FF', marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#E8E8E8', marginBottom: 16 },
  descLabel: { fontSize: 13, fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  description: { fontSize: 15, color: '#444', lineHeight: 24 },
  buyBtn: { backgroundColor: '#6C63FF', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 28 },
  buyBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  backLink: { marginTop: 16, alignSelf: 'center' },
  backLinkText: { color: '#6C63FF', fontSize: 14, fontWeight: '600' },
  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  notFoundEmoji: { fontSize: 64, marginBottom: 16 },
  notFoundTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 24 },
  backBtn: { backgroundColor: '#6C63FF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  backBtnText: { color: '#fff', fontWeight: '700' },
});
