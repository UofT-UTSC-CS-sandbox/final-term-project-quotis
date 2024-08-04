import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, TextInput, Alert } from "react-native";
import { RootStackParamList } from "../../backend/src/models/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./EditUserProfileStyles"; // Import the styles

type EditRouteProp = RouteProp<RootStackParamList, "EditUserProfile">;

const EditUserProfile: React.FC = () => {
  const route: any = useRoute<EditRouteProp>();
  const [firstName, setFirstName] = useState("default ");
  const [lastName, setLastName] = useState("user");
  const [email, setEmail] = useState("default email");
  const [address, setAddress] = useState("default address");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string>("placeholder");
  const { userId } = route.params;
  const navigation: any = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      if (selectedImage.uri) {
        setPhotoUri(selectedImage.uri);
        console.log("got image");
      }
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const getUploadUrl = async () => {
    try {
      const response = await axios.get("http://localhost:3000/s3Url");
      console.log("Got the image URL");
      return response.data.url;
    } catch (error) {
      console.error("Error getting upload URL:", error);
      Alert.alert("Error", "Failed to get upload URL.");
      return null;
    }
  };

  const uploadImage = async (url: string, uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": blob.type,
        },
        body: blob,
      });
      console.log("Uploaded Image");

      return url.split("?")[0]; // Return the S3 URL without query parameters
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image.");
      return null;
    }
  };

  const resizeImage = async (uri: string) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 200, height: 200 } }], // desired size
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      console.log("Manipulated Image Size");
      return manipResult.uri;
    } catch (error) {
      console.error("Error resizing image:", error);
      Alert.alert("Error", "Failed to resize image.");
      return null;
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      setEmail(response.data.email);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setProfilePic(response.data.photoUrl);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    if (photoUri) {
      profilePicUpload();
    }
  }, [photoUri]);

  const profilePicUpload = async () => {
    if (photoUri == null) {
      return;
    }
    const resizedUri = await resizeImage(photoUri);
    if (!resizedUri) return;

    const uploadUrl = await getUploadUrl(); // gets signed url to upload into the S3 database
    if (uploadUrl) {
      const imageUrl = await uploadImage(uploadUrl, resizedUri);
      if (imageUrl) {
        try {
          await axios.put(`http://localhost:3000/update/${userId}`, {
            photoUrl: imageUrl,
          });
          setProfilePic(imageUrl);
          setPhotoUri(null);
        } catch (error) {
          console.error("Error uploading image:", error);
          Alert.alert("Error", "Failed to upload image.");
        }
      }
    }
  };

  const handleSubmit = async () => {
    const updatedData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/update/${userId}`,
        updatedData
      );
      Alert.alert("Successfully Updated UserInfo", response.data.message);
      navigation.navigate("UserInfo", { userId: userId });
    } catch (error: any) {
      console.error("Error Updating User Information:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDIT PROFILE</Text>
      <View style={styles.profilePicContainer}>
        {profilePic === "placeholder" ? (
          <Image
            style={styles.image}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
            }}
          />
        ) : (
          <Image style={styles.image} source={{ uri: profilePic }} />
        )}
        <View style={styles.button}>
          <Button title="Change Photo" onPress={pickImage} color={"#007bff"} />
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTitle}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder={firstName}
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.infoTitle}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder={lastName}
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.infoTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={email}
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <Text style={styles.infoTitle}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder={address}
          value={address}
          onChangeText={setAddress}
        />
        <View style={styles.submit}>
          <Button title="Submit" color={"#007bff"} onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

export default EditUserProfile;
