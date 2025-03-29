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

// Mock data for suggestions
const suggestions = [
  {
    id: '1',
    name: 'Central Mall',
    address: '123 Mall Road, City Center',
    icon: 'business-outline',
  },
  {
    id: '2',
    name: 'City Park',
    address: 'Park Street, Green Zone',
    icon: 'leaf-outline',
  },
  {
    id: '3',
    name: 'Tech Hub',
    address: '456 Innovation Drive',
    icon: 'desktop-outline',
  },
  {
    id: '4',
    name: 'Metro Station',
    address: 'Metro Line 1, Transport Hub',
    icon: 'train-outline',
  },
  {
    id: '5',
    name: 'Food Court',
    address: '789 Dining Street',
    icon: 'restaurant-outline',
  },
] as const;

export default function LocationSelectScreen() {
  const router = useRouter();
  const [fromLocation, setFromLocation] = useState('Current Location');
  const [toLocation, setToLocation] = useState('');

  const handleSuggestionPress = (suggestion: typeof suggestions[number]) => {
    setToLocation(suggestion.name);
    // Navigate to ride confirmation screen
    router.push('/ride-confirmation');
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
        <Text style={styles.title}>Select Location</Text>
      </View>

      <View style={styles.locationInputs}>
        <BlurView intensity={50} tint="light" style={styles.inputContainer}>
          <View style={styles.locationMarkers}>
            <View style={styles.fromDot} />
            <View style={styles.dottedLine} />
            <View style={styles.toDot} />
          </View>
          
          <View style={styles.inputs}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={fromLocation}
                onChangeText={setFromLocation}
                placeholder="From"
                placeholderTextColor="#adb5bd"
                editable={false}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={toLocation}
                onChangeText={setToLocation}
                placeholder="To"
                placeholderTextColor="#adb5bd"
                autoFocus
              />
            </View>
          </View>
        </BlurView>
      </View>

      <View style={styles.suggestionsSection}>
        <Text style={styles.sectionTitle}>Suggestions</Text>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.suggestionsContainer}
        >
          {suggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.id}
              style={styles.suggestionCard}
              onPress={() => handleSuggestionPress(suggestion)}
              activeOpacity={0.8}
            >
              <BlurView intensity={50} tint="light" style={styles.suggestionContent}>
                <View style={styles.suggestionIcon}>
                  <Ionicons name={suggestion.icon as any} size={20} color="#495057" />
                </View>
                <View style={styles.suggestionInfo}>
                  <Text style={styles.suggestionName}>{suggestion.name}</Text>
                  <Text style={styles.suggestionAddress}>{suggestion.address}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#adb5bd" />
              </BlurView>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
  locationInputs: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
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
    marginTop: 8,
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
    marginBottom: 8,
  },
  inputs: {
    flex: 1,
  },
  inputWrapper: {
    height: 40,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    color: '#212529',
  },
  divider: {
    height: 1,
    backgroundColor: '#dee2e6',
    marginVertical: 8,
  },
  suggestionsSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  suggestionsContainer: {
    paddingBottom: 20,
  },
  suggestionCard: {
    marginBottom: 12,
    borderRadius: 12,
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
  suggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  suggestionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f3f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 4,
  },
  suggestionAddress: {
    fontSize: 14,
    color: '#868e96',
  },
}); 