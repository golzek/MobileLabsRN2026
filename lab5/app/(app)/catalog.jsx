import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';

function ProductCard({ item }) {
  return (
    <Link href={`/details/${item.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <Text style={styles.cardName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.cardPrice}>{item.price.toLocaleString('uk-UA')} ₴</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function CatalogScreen() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View>
              <Text style={styles.greeting}>Привіт, {user?.name || 'Користувач'}! 👋</Text>
              <Text style={styles.subtitle}>Оберіть щось цікаве</Text>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.logoutText}>Вийти</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  list: { paddingHorizontal: 12, paddingBottom: 20 },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  greeting: { fontSize: 20, fontWeight: '700', color: '#1A1A2E' },
  subtitle: { fontSize: 13, color: '#666', marginTop: 2 },
  logoutBtn: { backgroundColor: '#FF6B6B', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  logoutText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  row: { justifyContent: 'space-between', marginBottom: 12 },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: { width: '100%', height: 140, resizeMode: 'cover' },
  cardBody: { padding: 10 },
  cardCategory: { fontSize: 10, color: '#6C63FF', fontWeight: '600', textTransform: 'uppercase', marginBottom: 4 },
  cardName: { fontSize: 13, fontWeight: '600', color: '#1A1A2E', marginBottom: 6, lineHeight: 18 },
  cardPrice: { fontSize: 15, fontWeight: '800', color: '#6C63FF' },
});
