import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { RootStackParamList } from "../../backend/src/models/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

type EditRouteProp = RouteProp<RootStackParamList, "EditUserProfile">;

const EditUserProfile: React.FC = () => {
  const route = useRoute<EditRouteProp>();
  const { userId } = route.params;
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("default ");
  const [lastName, setLastName] = useState("user");
  const [email, setEmail] = useState("default email");
  const [address, setAddress] = useState("default address");
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
    profilePicUpload();
  }, [photoUri]);

  const profilePicUpload = async () => {
    if (photoUri == null) {
      Alert.alert("Please pick an image.");
      return;
    }
    const resizedUri = await resizeImage(photoUri);
    if (!resizedUri) return;

    const uploadUrl = await getUploadUrl();
    if (uploadUrl) {
      const imageUrl = await uploadImage(uploadUrl, resizedUri);
      if (imageUrl) {
        try {
          await axios.put(`http://localhost:3000/update/${userId}`, {
            photoUrl: imageUrl,
          });
          Alert.alert("Success", "Post created successfully!");
          setPhotoUri(null);
          navigation.navigate("UserInfo", { userId });
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
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/update/${userId}`,
        updatedData
      );
      Alert.alert("Successfully Updated UserInfo", response.data.message);
      fetchUserInfo();
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
        <Image
          style={styles.profilePic}
          source={{
            uri:
              profilePic ||
              "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
          }}
        />
        <Button title="Change Photo" onPress={pickImage} color={"lightblue"} />
      </View>
      <Text style={styles.title}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder={firstName}
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.title}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder={lastName}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder={email}
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <Text style={styles.title}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder={address}
        value={address}
        onChangeText={setAddress}
      />
      <View style={styles.submit}>
        <Button title="Submit" color={"lightblue"} onPress={handleSubmit} />
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  profilePicContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    textAlign: "center",
    lineHeight: 100,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
  },
  submit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: width * 0.3,
  },
});

export default EditUserProfile;
