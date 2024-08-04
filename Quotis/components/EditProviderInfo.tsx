import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, TextInput, Alert } from "react-native";
import { RootStackParamList } from "../../backend/src/models/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./EditProfileInfoStyles"; // Import the styles

type EditProviderProp = RouteProp<RootStackParamList, "EditProviderInfo">;

const EditProviderInfo: React.FC = () => {
  const route: any = useRoute<EditProviderProp>();
  const [profilePic, setProfilePic] = useState(null);
  const [firstName, setFirstName] = useState("default ");
  const [lastName, setLastName] = useState("user");
  const [email, setEmail] = useState("default email");
  const [postal, setPostal] = useState("A1A 1A1");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [pic, setPic] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [contact, setContact] = useState<string>("");
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

      return url.split("?")[0];
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
        [{ resize: { width: 200, height: 200 } }],
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/providers/${userId}`
        );
        console.log("success ");
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPic(response.data.photoUri);
        setDesc(response.data.description);
        setContact(response.data.contact);
        setPostal(response.data.postCode);
      } catch (error) {
        console.log("damn for user");
        console.error("Error fetching user details:", error);
      }
    };
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

    const uploadUrl = await getUploadUrl();
    if (uploadUrl) {
      const imageUrl = await uploadImage(uploadUrl, resizedUri);
      if (imageUrl) {
        try {
          await axios.put(`http://localhost:3000/updateProvider/${userId}`, {
            photoUri: imageUrl,
          });
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
      description: desc,
      contact: contact,
      postCode: postal,
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/updateProvider/${userId}`,
        updatedData
      );
      Alert.alert("Successfully Updated UserInfo", response.data.message);
      console.log(response.data.message);
      navigation.navigate("ProviderInfo", { userId: userId });
    } catch (error: any) {
      console.log("damn for edit");
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
        {pic === "" ? (
          <Image
            style={styles.image}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
            }}
          />
        ) : (
          <Image style={styles.image} source={{ uri: pic }} />
        )}
        <Button title="Change Photo" onPress={pickImage} color={"#007bff"} />
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
        <Text style={styles.infoTitle}>Postal Code</Text>
        <TextInput
          style={styles.input}
          placeholder={postal}
          value={postal}
          onChangeText={setPostal}
        />
        <Text style={styles.infoTitle}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder={desc}
          value={desc}
          onChangeText={setDesc}
        />
        <Text style={styles.infoTitle}>Contact</Text>
        <TextInput
          style={styles.input}
          placeholder={contact}
          value={contact}
          onChangeText={setContact}
        />
        <View style={styles.submit}>
          <Button title="Submit" color={"#007bff"} onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
};

export default EditProviderInfo;
