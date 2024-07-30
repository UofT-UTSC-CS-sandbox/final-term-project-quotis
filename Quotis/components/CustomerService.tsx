import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  Alert,
  Dimensions, 
  Linking
} from "react-native";
import { RootStackParamList, Post } from "../../backend/src/models/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CustomerServiceRouteProp = RouteProp<RootStackParamList, "CustomerService">;

const CustomerService: React.FC = () => {
  /*Do nothing is a void filler function for buttons that allow buttons when pressed to do nothing */
  const navigation: any = useNavigation(); // this is just to have a short hand for the navigation
  const route = useRoute<CustomerServiceRouteProp>();  
  const handleEmailPress = () => {
    const email = 'mailto:someone@example.com';
    Linking.openURL(email).catch(err => console.error('Error opening email:', err));
  };

  return (
    <View style={styles.container}>
        <View style={styles.message}> 
            <Text onPress={handleEmailPress}> For any customer service needs contact @zuharkhan@gmail.com  </Text>
        </View>
           
    </View>
    );
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },  
    message:{ 
        display:"flex", 
        flexDirection:"column",  
        justifyContent:"space-evenly" , 
        alignItems:"center",
    }
    

})

export default CustomerService;
