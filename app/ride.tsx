import { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
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
  },
  {
    id: 'auto',
    name: 'Auto',
    icon: 'car-sport-outline',
    gradient: ['#63e6be', '#38d9a9'],
  },
  {
    id: 'economy',
    name: 'Economy',
    icon: 'car-outline',
    gradient: ['#ffd43b', '#fab005'],
  },
  {
    id: 'sedan',
    name: 'Sedan',
    icon: 'car-outline',
    gradient: ['#ff8787', '#ff6b6b'],
  },
] as const;

export default function RideScreen() {
  const router = useRouter();

  const handleServicePress = (service: typeof rideServices[number]) => {
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
        <Text style={styles.title}>Ride</Text>
      </View>

      <TouchableOpacity 
        style={styles.searchContainer}
        onPress={() => router.push('/location-select')}
        activeOpacity={0.8}
      >
        <BlurView intensity={50} tint="light" style={styles.searchBar}>
          <Ionicons name="location-outline" size={20} color="#495057" />
          <Text style={styles.searchText}>Where to go?</Text>
          <Ionicons name="chevron-forward" size={20} color="#adb5bd" style={styles.searchIcon} />
        </BlurView>
      </TouchableOpacity>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.servicesContainer}
      >
        {rideServices.map((service) => (
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
            </LinearGradient>
          </TouchableOpacity>
        ))}
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  searchText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#adb5bd',
  },
  searchIcon: {
    marginLeft: 8,
  },
  servicesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  serviceCard: {
    width: 100,
    height: 100,
    marginHorizontal: 4,
    borderRadius: 16,
    overflow: 'hidden',
  },
  serviceGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  serviceName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
}); 