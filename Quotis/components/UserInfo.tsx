import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as Location from "expo-location";
import { RootStackParamList } from "../../backend/src/models/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

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
            uri: photoUri || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
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

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: '45%',
  },
  infoTitle: {
    fontWeight: 'light',
  },
  infoCont: {
    fontWeight: 'bold',
  },
  banner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  name: {
    padding: 10,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  important: {
    fontWeight: "bold",
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    height: 1,
    marginVertical: 10,
  },
});

export default UserInfo;
