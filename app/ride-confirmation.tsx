import { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/Themed';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const rideServices = [
  {
    id: 'bike',
    name: 'Bike',
    icon: 'bicycle-outline',
    gradient: ['#74c0fc', '#4dabf7'],
    price: '₹50',
    time: '15 mins',
  },
  {
    id: 'auto',
    name: 'Auto',
    icon: 'car-sport-outline',
    gradient: ['#63e6be', '#38d9a9'],
    price: '₹100',
    time: '20 mins',
  },
  {
    id: 'economy',
    name: 'Economy',
    icon: 'car-outline',
    gradient: ['#ffd43b', '#fab005'],
    price: '₹150',
    time: '25 mins',
  },
  {
    id: 'sedan',
    name: 'Sedan',
    icon: 'car-outline',
    gradient: ['#ff8787', '#ff6b6b'],
    price: '₹200',
    time: '25 mins',
  },
] as const;

export default function RideConfirmationScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleConfirmRide = () => {
    // Handle ride confirmation
    router.push('/ride-confirmed');
  };

  return (
    <View style={styles.container}>
      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <LinearGradient
          colors={['#e9ecef', '#dee2e6']}
          style={styles.mapPlaceholder}
        >
          <Ionicons name="map-outline" size={48} color="#adb5bd" />
          <Text style={styles.mapText}>Map View</Text>
        </LinearGradient>
      </View>

      {/* Location Details */}
      <BlurView intensity={50} tint="light" style={styles.locationContainer}>
        <View style={styles.locationDetails}>
          <View style={styles.locationMarkers}>
            <View style={styles.fromDot} />
            <View style={styles.dottedLine} />
            <View style={styles.toDot} />
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>FROM</Text>
            <Text style={styles.address} numberOfLines={1}>Current Location</Text>
            <View style={styles.addressDivider} />
            <Text style={styles.addressLabel}>TO</Text>
            <Text style={styles.address} numberOfLines={1}>Central Mall</Text>
          </View>
        </View>
      </BlurView>

      {/* Services List */}
      <BlurView intensity={50} tint="light" style={styles.servicesContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {rideServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService === service.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedService(service.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={service.gradient}
                style={styles.serviceGradient}
              >
                <View style={styles.serviceInfo}>
                  <Ionicons name={service.icon as any} size={24} color="#fff" />
                  <Text style={styles.serviceName}>{service.name}</Text>
                </View>
                <View style={styles.serviceDetails}>
                  <Text style={styles.serviceTime}>{service.time}</Text>
                  <Text style={styles.servicePrice}>{service.price}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            !selectedService && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirmRide}
          disabled={!selectedService}
        >
          <Text style={styles.confirmButtonText}>Confirm Ride</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mapContainer: {
    height: '40%',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    marginTop: 8,
    fontSize: 16,
    color: '#adb5bd',
  },
  locationContainer: {
    position: 'absolute',
    top: '35%',
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  locationDetails: {
    flexDirection: 'row',
  },
  locationMarkers: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
  },
  fromDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#74c0fc',
  },
  dottedLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#dee2e6',
    marginVertical: 4,
  },
  toDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff6b6b',
  },
  addressContainer: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    color: '#868e96',
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: '#212529',
    marginBottom: 8,
  },
  addressDivider: {
    height: 1,
    backgroundColor: '#dee2e6',
    marginVertical: 8,
  },
  servicesContainer: {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  serviceCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#228be6',
  },
  serviceGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 12,
  },
  serviceDetails: {
    alignItems: 'flex-end',
  },
  serviceTime: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#228be6',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  confirmButtonDisabled: {
    backgroundColor: '#adb5bd',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 