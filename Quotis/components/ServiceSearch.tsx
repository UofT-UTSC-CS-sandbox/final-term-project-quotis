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