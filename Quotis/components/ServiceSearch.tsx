import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from "../../backend/src/models/types";
import { TextInput, Button } from 'react-native';
import styles from './ServicesSearchStyles';

type ServiceSearchRouteProp = RouteProp<RootStackParamList, 'ServiceSearch'>;

interface Provider {
  _id: string;
  firstName: string;
  lastName: string;
  description: string;
  services: string[];
  contact: string;
  postCode: string;
}


const ServiceSearch: React.FC = () => {
  const route = useRoute<ServiceSearchRouteProp>();
  const navigation = useNavigation();
  const { userId, serviceType } = route.params;

  const [serviceProviders, setServiceProviders] = useState<Provider[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(serviceType);
  const [postalCode, setPostalCode] = useState<string>('');
  const [maxDistance, setMaxDistance] = useState<number>(10); // Max distance in km

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/providers?services=${selectedFilter}`);
        setServiceProviders(response.data);
      } catch (error) {
        console.error('Error fetching service providers:', error);
      }
    };

    fetchServiceProviders();
  }, [selectedFilter]);

  const applyDistanceFilter = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/providers?services=${selectedFilter}`);
      const providers: Provider[] = response.data;

      // Fetch distances using Google Maps API
      const distances = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${postalCode}&destinations=${providers.map((p: Provider) => p.postCode).join('|')}&key=AIzaSyDzKMmVlTGyMHSGeODHXh8KazikdV-TL8A`
      );

      const filteredProviders = providers.filter((provider, index) => {
        const distance = distances.data.rows[0].elements[index].distance.value / 1000; // Convert meters to km
        return distance <= maxDistance;
      });

      setServiceProviders(filteredProviders);
    } catch (error) {
      console.error('Error applying distance filter:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedFilter('Plumbing')}
        >
          <Text style={styles.filterButtonText}>Plumbing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedFilter('Contractor')}
        >
          <Text style={styles.filterButtonText}>Contractor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedFilter('Electrician')}
        >
          <Text style={styles.filterButtonText}>Electrician</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter postal code"
          value={postalCode}
          onChangeText={setPostalCode}
        />
        <Button title="Apply Filter" onPress={applyDistanceFilter} />
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
              <Text>{item.description}</Text>
              <Text>{item.services.join(', ')}</Text>
              <Text>{item.contact}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ServiceSearch;