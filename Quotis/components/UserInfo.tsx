import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as Location from "expo-location";
import { styles } from "./UserInfoStyles";
import { RootStackParamList } from "../../backend/src/models/types";

type UserInfoRouteProp = RouteProp<RootStackParamList, "UserInfo">;

const UserInfo: React.FC = () => {
  const route = useRoute<UserInfoRouteProp>();
  const { userId } = route.params;
  const [email, setEmail] = useState<string>("defaultEmail");
  const [firstName, setFirstName] = useState<string>("default");
  const [lastName, setLastName] = useState<string>("User");
  const [address, setAddress] = useState<string | null>(null);
  const [photoUri, setPhotoUri] = useState<string>("place");
  const navigation: any = useNavigation();

  const fetchAddress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
    );
    setAddress(response.data.display_name);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/${userId}`
        );
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhotoUri(response.data.photoUrl);
        await fetchAddress();
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>
      <View style={styles.banner}>
        <Image
          style={styles.image}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
          }}
        />
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <Button
          color={"lightblue"}
          title="Edit Profile"
          onPress={() => {
            navigation.navigate("EditUserProfile", {
              userId: userId,
            });
          }}
          accessibilityLabel="Button to access edit UserInfo"
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTitle}>Email</Text>
        <Text style={styles.infoCont}>{email}</Text>
        <View style={styles.line} />
        <Text style={styles.infoTitle}>Address</Text>
        <Text style={styles.infoCont}>{address || "Address loading..."}</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
};

export default UserInfo;
