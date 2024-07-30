import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import { RootStackParamList } from "../../backend/src/models/types";
import { Ionicons } from '@expo/vector-icons';
import styles from './ServicesSearchStyles';

type ServiceSearchRouteProp = RouteProp<RootStackParamList, 'ServiceSearch'>;

interface Provider {
  _id: string;
  firstName: string;
  lastName: string;
  description?: string;
  services?: string[];
  contact?: string;
  postCode: string;
}

const ServiceSearch: React.FC = () => {
  const route = useRoute<ServiceSearchRouteProp>();
  const navigation = useNavigation();
  const { userId, serviceType } = route.params;

  const [serviceProviders, setServiceProviders] = useState<Provider[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(serviceType);
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [maxDistance, setMaxDistance] = useState<string>(''); // For distance filter input
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [showDistanceMenu, setShowDistanceMenu] = useState<boolean>(false);
  const providerTypes = ['Any', 'Plumbing', 'Contractor', 'Electrician'];

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        console.log('User location:', location.coords);
        setUserLocation(location);
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    getUserLocation();
  }, []);

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
    setShowFilterMenu(false);
  };

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const endpoint = selectedFilter === 'Any'
          ? 'http://localhost:3000/providers'
          : `http://localhost:3000/providers?services=${selectedFilter}`;

        const response = await axios.get(endpoint);
        setServiceProviders(response.data);
      } catch (error) {
        console.error('Error fetching service providers:', error);
      }
    };

    fetchServiceProviders();
  }, [selectedFilter]);

  const fetchDistanceForProviders = async () => {
    if (!userLocation || !maxDistance) {
      console.error('User location or maximum distance is not available');
      return;
    }

    try {
      const destinations = serviceProviders.map(provider => provider.postCode).join('|');
      const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
        params: {
          origins: `${userLocation.coords.latitude},${userLocation.coords.longitude}`,
          destinations: destinations,
          key: 'AIzaSyBc-BBqxU210FzvzOJQpg78YcLTeOTjJlk', // Replace with your API key
        },
      });

      const distances = response.data.rows[0].elements;
      const filteredProviders = serviceProviders.filter((provider, index) => {
        const distanceInMeters = distances[index]?.distance?.value || 0;
        const distanceInKm = distanceInMeters / 1000;
        return distanceInKm <= parseFloat(maxDistance);
      });

      setServiceProviders(filteredProviders);
    } catch (error) {
      console.error('Error fetching distance for providers:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterMenu(!showFilterMenu)}
        >
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
        {showFilterMenu && (
          <View style={styles.dropdownMenu}>
            {providerTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.dropdownItem}
                onPress={() => handleFilterPress(type)}
              >
                <Text style={styles.dropdownItemText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={styles.distanceButton}
          onPress={() => setShowDistanceMenu(!showDistanceMenu)}
        >
          <Ionicons name="location" size={24} color="black" />
        </TouchableOpacity>
        {showDistanceMenu && (
          <View style={styles.distanceDropdownMenu}>
            <TextInput
              style={styles.input}
              placeholder="Max Distance (km)"
              value={maxDistance}
              onChangeText={setMaxDistance}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={fetchDistanceForProviders}>
              <Text style={styles.buttonText}>Filter by Distance</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {serviceProviders.length === 0 ? (
        <Text style={styles.noProvidersText}>No Available Providers</Text>
      ) : (
        <FlatList
          data={serviceProviders}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.providerItem} onPress={() => { /* Handle provider selection */ }}>
              <Text style={styles.providerName}>{item.firstName} {item.lastName}</Text>
              <Text>{item.description || "No Description Provided"}</Text>
              <Text>{item.services?.join(', ') || "No Services Listed"}</Text>
              <Text>{item.contact || "No Contact Provided"}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ServiceSearch;
