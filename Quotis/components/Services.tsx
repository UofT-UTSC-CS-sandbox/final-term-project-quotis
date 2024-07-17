import React from 'react';
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { RootStackParamList } from "../../backend/src/models/types";
import { useRoute, RouteProp } from "@react-navigation/native";
import styles from './ServicesStyles';
import { useNavigation} from '@react-navigation/native';
import axios from 'axios';
type ServicesRouteProp = RouteProp<RootStackParamList, "Services">;


const Services: React.FC = () => {
    const navigation:any = useNavigation();
  const route = useRoute<ServicesRouteProp>();
  const { userId } = route.params;

  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        setUserEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Select a Service</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ServiceSearch', { userId, serviceType: 'Plumbing' })}
      >
        <Text style={styles.buttonText}>Plumbing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ServiceSearch', { userId, serviceType: 'Contractor' })}
      >
        <Text style={styles.buttonText}>Contractor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ServiceSearch', { userId, serviceType: 'Electrician' })}
      >
        <Text style={styles.buttonText}>Electrician</Text>
      </TouchableOpacity>
  
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserDashboard', { userId: userId })}>
            <FontAwesome name="home" size={24} color="black" />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Services', { userId: userId })}>
            <FontAwesome name="wrench" size={24} color="black" />
            <Text>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => {}}>
            <FontAwesome name="envelope" size={24} color="black" />
            <Text>Inbox</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile', { userId: userId })}>
            <FontAwesome name="user" size={24} color="black" />
            <Text>Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default Services;