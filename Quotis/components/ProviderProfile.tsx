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
} from "react-native";
import { RootStackParamList, Post } from "../../backend/src/models/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProviderProfileRouteProp = RouteProp<
  RootStackParamList,
  "ProviderProfile"
>;

const ProviderProfile: React.FC = () => {
  const navigation: any = useNavigation(); // this is just to have a shorthand for navigation
  const route = useRoute<ProviderProfileRouteProp>();
  const { userId } = route.params;
  const [photoUri, setPhotoUri] = useState<string>("placeholder");
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
        console.error(
          "Error fetching posts:",
          error.response ? error.response.data : error.message
        );
        Alert.alert("Error", "Failed to fetch posts");
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/providers/${userId}`
        );
        console.log("success");
        setPhotoUri(response.data.photoUri);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserInfo();
    fetchPosts();
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.pfp}>
        {photoUri === "" ? (
          <Image
            style={styles.image}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
            }}
          />
        ) : (
          <Image source={{ uri: photoUri }} style={styles.image} />
        )}
      </View>
      <View style={styles.button_list}>
        <View style={styles.buttonHolder}>
          <Button
            color={"#007bff"}
            title="Personal"
            onPress={() => {
              navigation.navigate("ProviderInfo", {
                userId: userId,
              });
            }} // passing userId to the user information page
            accessibilityLabel="Button to access Personal Info"
          />
        </View>
        <View style={styles.buttonHolder}>
          <Button
            color={"#007bff"}
            title="Customer Service"
            onPress={() => {
              navigation.navigate("CustomerService");
            }}
            accessibilityLabel="Button to access Customer Service"
          />
        </View>
        <View style={styles.buttonHolder}>
          <Button
            color={"#007bff"}
            title="Log-Out"
            onPress={() => {
              navigation.navigate("Login");
            }}
            accessibilityLabel="Button to log out"
          />
        </View>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button_list: {
    display: "flex",
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: height * 0.7,
    minWidth: width * 0.4,
  },
  buttonHolder: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 3,
  },
  pfp: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: height * 0.1,
    height: height * 0.1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default ProviderProfile;
