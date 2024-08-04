import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import axios from "axios";
import { styles } from "./ProviderInfoStyles"; // Import the styles

type ProviderInfoRouteProp = RouteProp<RootStackParamList, "ProviderInfo">;

const ProviderInfo: React.FC = () => {
  const route = useRoute<ProviderInfoRouteProp>();
  const { userId } = route.params;
  const [email, setEmail] = useState<string>("defaultEmail");
  const [firstName, setFirstName] = useState<string>("default");
  const [lastName, setLastName] = useState<string>("User");
  const [postCode, setPostCode] = useState<string>("default Post");
  const [photoUri, setPhotoUri] = useState<string>("placeholder");
  const [desc, setDesc] = useState<string>("default description");
  const [contact, setContact] = useState<string>("default contact");
  const navigation: any = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/providers/${userId}`
        );
        console.log("success");
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhotoUri(response.data.photoUri);
        setDesc(response.data.description);
        setContact(response.data.contact);
        setPostCode(response.data.postCode);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text>
      <View style={styles.picHolder}>
        {photoUri === "placeholder" ? (
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
      <View style={styles.banner}>
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <View style={styles.editButton}>
          <Button
            color={"#007bff"}
            title="Edit Profile"
            onPress={() => {
              navigation.navigate("EditProviderInfo", {
                userId: userId,
              });
            }}
            accessibilityLabel="Button to access edit UserInfo"
          />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Email</Text>
        <Text style={styles.infoCont}>{email}</Text>
        <View style={styles.line} />
        <Text style={styles.infoTitle}>PostCode</Text>
        <Text style={styles.infoCont}>{postCode}</Text>
        <View style={styles.line} />
        <Text style={styles.infoTitle}>Description</Text>
        <Text style={styles.infoCont}>{desc}</Text>
        <View style={styles.line} />
        <Text style={styles.infoTitle}>Contact</Text>
        <Text style={styles.infoCont}>{contact}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.verifybutton}>
        <Button
          color={"#007bff"}
          title="Get Verified"
          onPress={() => {
            navigation.navigate("Verification");
          }}
        />
      </View>
    </View>
  );
};

export default ProviderInfo;
