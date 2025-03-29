import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/Themed';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 48 = horizontal padding (20 * 2) + gap (8)

const porterServices = [
  {
    id: 'trucks',
    name: 'Trucks',
    icon: 'truck-outline',
    subtitle: 'For heavy loads',
    gradient: ['#74c0fc', '#4dabf7'],
  },
  {
    id: '2wheeler',
    name: '2 Wheeler',
    icon: 'bicycle-outline',
    subtitle: 'Quick delivery',
    gradient: ['#63e6be', '#38d9a9'],
  },
  {
    id: 'packers',
    name: 'Packers & Movers',
    icon: 'cube-outline',
    subtitle: 'Full service',
    gradient: ['#ffd43b', '#fab005'],
  },
  {
    id: 'parcel',
    name: 'All India Parcel',
    icon: 'gift-outline',
    subtitle: 'Pan India delivery',
    gradient: ['#ff8787', '#ff6b6b'],
  },
] as const;

export default function PorterScreen() {
  const router = useRouter();

  const handleServicePress = (service: typeof porterServices[number]) => {
    router.push('/location-select');
  };

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
        <Text style={styles.title}>Porter</Text>
      </View>

      <BlurView intensity={50} tint="light" style={styles.locationContainer}>
        <View style={styles.locationHeader}>
          <Text style={styles.locationLabel}>Pick up from</Text>
          <TouchableOpacity 
            onPress={() => router.push('/location-select')}
            style={styles.editButton}
          >
            <Ionicons name="pencil-outline" size={20} color="#228be6" />
          </TouchableOpacity>
        </View>
        <View style={styles.locationContent}>
          <Ionicons name="location" size={24} color="#228be6" />
          <Text style={styles.locationText} numberOfLines={1}>
            Current Location
          </Text>
        </View>
      </BlurView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.servicesContainer}
      >
        <View style={styles.servicesGrid}>
          {porterServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServicePress(service)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={service.gradient}
                style={styles.serviceGradient}
              >
                <Ionicons name={service.icon as any} size={32} color="#fff" />
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#212529',
  },
  locationContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationLabel: {
    fontSize: 14,
    color: '#868e96',
    fontWeight: '500',
  },
  editButton: {
    padding: 4,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
    marginLeft: 12,
    fontWeight: '500',
  },
  servicesContainer: {
    padding: 20,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
  },
  serviceGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  serviceName: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  serviceSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
}); 