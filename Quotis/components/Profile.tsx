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
  Dimensions
} from "react-native";
import { RootStackParamList, Post } from "../../backend/src/models/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProfileRouteProp = RouteProp<RootStackParamList, "Profile">;

const Profile: React.FC = () => {
  /*Do nothing is a void filler function for buttons that allow buttons when pressed to do nothing */
  const do_nothing: any = () => {};
  const navigation: any = useNavigation(); // this is just to have a short hand for the navigation
  const route = useRoute<ProfileRouteProp>();
  const { userId } = route.params;

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Error", "No token found");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/posts/user/${userId}`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setPosts(response.data);
      } catch (error: any) {
        // 타입을 any로 명시
        console.error(
          "Error fetching posts:",
          error.response ? error.response.data : error.message
        );
        Alert.alert("Error", "Failed to fetch posts");
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.pfp}>
        <Image
          style={styles.image}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
          }}
        />
      </View>
      <View style={styles.button_list}>
        <Button
          color={"blue"}
          title="Personal"
          onPress={() => {
            navigation.navigate("UserInfo", {
              userId: userId,
            });
          }} // passsing userid to the user information page
          accessibilityLabel="Button to access Personal Info"
        />
        <Button 
                color={"blue"}
                title="Customer Service"
                onPress={()=> {navigation.navigate('CustomerService')}}  
                accessibilityLabel="Button to access Personal Info"
        />
        <Button
          color={"blue"}
          title="Log-Out"
          onPress={()=>{navigation.naviagate('Login')}}
          accessibilityLabel="Button to access Personal Info"
        
        />
        </View>
           
            </View>
    );
} 

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    }, 
    button_list: { 
        display:"flex", 
        padding: 20,
        flexDirection:"column",  
        justifyContent:"space-evenly" , 
        alignItems:"center",
        height: height*0.7,
        minWidth: width*0.4,
    }, 
    pfp:{ 
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center",
    }, 
    image:{ 
            width: 50,
            height: 50,
    
    },
})

export default Profile;
