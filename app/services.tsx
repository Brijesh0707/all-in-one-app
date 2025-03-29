import { View, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/Themed';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const services = [
  {
    id: 'ride',
    title: 'Ride',
    subtitle: 'Book a ride anywhere',
    icon: 'car-outline',
    gradient: ['#74c0fc', '#4dabf7'] as const,
  },
  {
    id: 'porter',
    title: 'Porter',
    subtitle: 'Move anything, anywhere',
    icon: 'cube-outline',
    gradient: ['#63e6be', '#38d9a9'] as const,
  },
  {
    id: 'grocery',
    title: 'Grocery',
    subtitle: 'Fresh groceries delivered',
    icon: 'cart-outline',
    gradient: ['#ffd43b', '#fab005'] as const,
  },
] as const;

export default function ServicesScreen() {
  const router = useRouter();

  const handleServicePress = (serviceId: typeof services[number]['id']) => {
    router.push(serviceId as any); // TODO: Add proper route typing
  };

  return (
    <LinearGradient
      colors={['#f8f9fa', '#e9ecef'] as const}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to AllInOne</Text>
        <Text style={styles.subtitle}>What service do you need today?</Text>
      </View>

      <View style={styles.servicesContainer}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => handleServicePress(service.id)}
            activeOpacity={0.9}
          >
            <BlurView intensity={50} tint="light" style={styles.cardContent}>
              <LinearGradient
                colors={service.gradient}
                style={styles.iconContainer}
              >
                <Ionicons
                  name={service.icon as any}
                  size={24}
                  color="#fff"
                />
              </LinearGradient>
              <View style={styles.textContainer}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#adb5bd"
                style={styles.arrow}
              />
            </BlurView>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  servicesContainer: {
    flex: 1,
    gap: 16,
  },
  serviceCard: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  arrow: {
    marginLeft: 12,
  },
}); 