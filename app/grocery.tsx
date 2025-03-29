import { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/Themed';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 120;

type GroceryItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
};

const groceryItems: GroceryItem[] = [
  {
    id: '1',
    name: 'Fresh Apples',
    price: 180,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    unit: 'kg',
  },
  {
    id: '2',
    name: 'Organic Bananas',
    price: 60,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    unit: 'dozen',
  },
  {
    id: '3',
    name: 'Fresh Tomatoes',
    price: 40,
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337',
    unit: 'kg',
  },
  {
    id: '4',
    name: 'Bell Peppers',
    price: 120,
    image: 'https://images.unsplash.com/photo-1563246367-d5c89a7a239e',
    unit: 'kg',
  },
  {
    id: '5',
    name: 'Organic Carrots',
    price: 60,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
    unit: 'kg',
  },
];

export default function GroceryScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<Record<string, number>>({});

  const handleAddToCart = useCallback((item: GroceryItem) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  }, []);

  const handleRemoveFromCart = useCallback((item: GroceryItem) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[item.id] > 1) {
        newCart[item.id]--;
      } else {
        delete newCart[item.id];
      }
      return newCart;
    });
  }, []);

  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const totalAmount = groceryItems.reduce((sum, item) => (
    sum + (cart[item.id] || 0) * item.price
  ), 0);

  return (
    <LinearGradient
      colors={['#f8f9fa', '#e9ecef'] as const}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#212529" />
        </TouchableOpacity>
        <Text style={styles.title}>Grocery</Text>
        <View style={styles.cartIndicator}>
          <Ionicons name="cart-outline" size={24} color="#212529" />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {groceryItems.map((item) => (
          <BlurView
            key={item.id}
            intensity={50}
            tint="light"
            style={styles.itemCard}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price}/{item.unit}</Text>
              <View style={styles.quantityContainer}>
                {cart[item.id] ? (
                  <>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleRemoveFromCart(item)}
                    >
                      <Ionicons name="remove" size={20} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{cart[item.id]}</Text>
                  </>
                ) : null}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToCart(item)}
                >
                  <Ionicons 
                    name={cart[item.id] ? "add" : "cart-outline"}
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        ))}
      </ScrollView>

      {totalItems > 0 && (
        <BlurView intensity={80} tint="light" style={styles.cartSummary}>
          <View style={styles.cartDetails}>
            <Text style={styles.cartText}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </Text>
            <Text style={styles.cartTotal}>₹{totalAmount}</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewCartButton}
            onPress={() => router.push('/cart')}
          >
            <Text style={styles.viewCartText}>View Cart</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </BlurView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#212529',
  },
  cartIndicator: {
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  itemCard: {
    flexDirection: 'row',
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: CARD_HEIGHT,
  },
  itemImage: {
    width: CARD_HEIGHT,
    height: CARD_HEIGHT,
  },
  itemDetails: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#228be6',
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#228be6',
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartDetails: {
    flex: 1,
  },
  cartText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  cartTotal: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
  },
  viewCartButton: {
    backgroundColor: '#228be6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginLeft: 16,
  },
  viewCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
}); 