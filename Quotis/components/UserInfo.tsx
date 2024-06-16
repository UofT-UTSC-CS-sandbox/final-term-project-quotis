import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { RouteProp, useRoute } from '@react-navigation/native'; 
import { RootStackParamList } from '../../backend/src/models/types';
import { useEffect, useState } from 'react';
import axios from 'axios';


// I need to pass this page a prop of the basic info of who logged in 
type UserInfoRouteProp = RouteProp<RootStackParamList, "UserInfo">;

const UserInfo: React.FC = () => {  
  

  const route = useRoute<UserInfoRouteProp>();
  const { userId } = route.params;  
  const [email, setEmail] = useState<string>("defaultEmail") 
  const [username, setUsername] = useState<string>("defaultUser")
  const [address, setAddress] = useState<string>("default Address")
  const [UserType, setUserType]  = useState<string>("IDK")

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/${userId}`
        ); 
        console.log('success');
        setEmail(response.data.email);
        setUserType(response.data.role);
      } catch (error) {
        console.log('damn');
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>
      <View style={styles.info}></View>
      <Text>User Name: {email} </Text> 
      <Text>Address {address}</Text>  
      <Text>User Type: {UserType} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: "lightblue"
  },   
  title: {
    fontSize: 20,
  },
  info:{ 
    display: "flex" ,
    justifyContent: "space-around", 
    alignItems: "center", 
  }
});

export default UserInfo;
