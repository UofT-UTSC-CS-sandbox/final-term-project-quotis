import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

type CreatePostRouteProp = RouteProp<RootStackParamList, "CreatePost">;
type NavigationProp = StackNavigationProp<RootStackParamList, "CreatePost">;

const CreatePost: React.FC = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [jobDate, setJobDate] = useState<Date>(new Date());
  const route = useRoute<CreatePostRouteProp>();
  const { userId } = route.params;

  const navigation = useNavigation<NavigationProp>();

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
        [{ resize: { width: 800 } }], // 원하는 크기로 조정
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (error) {
      console.error("Error resizing image:", error);
      Alert.alert("Error", "Failed to resize image.");
      return null;
    }
  };

  const createPost = async () => {
    if (!photoUri || !title || !description) {
      Alert.alert("Error", "Please fill in all fields and select an image.");
      return;
    }

    const resizedUri = await resizeImage(photoUri);
    if (!resizedUri) return;

    const uploadUrl = await getUploadUrl();
    if (uploadUrl) {
      const imageUrl = await uploadImage(uploadUrl, resizedUri);
      if (imageUrl) {
        try {
          await axios.post("http://localhost:3000/posts/create-post", {
            userId,
            title: title,
            photoUrl: imageUrl,
            description: description,
            jobDate, // Add this line
          });

          Alert.alert("Success", "Post created successfully!");
          setPhotoUri(null);
          setTitle("");
          setDescription("");
          navigation.navigate("UserDashboard", { userId });
        } catch (error) {
          console.error("Error creating post:", error);
          Alert.alert("Error", "Failed to create post.");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Select Image from Gallery" onPress={pickImage} />
      <Button title="Take Photo" onPress={takePhoto} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Select date and time of job:</Text>
      <DateTimePicker
        style={styles.picker}
        value={jobDate}
        mode="datetime" // Change to datetime to include time picker
        display="default"
        onChange={(event, selectedDate) => setJobDate(selectedDate || jobDate)}
      />
      <Button title="Create Post" onPress={createPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20, // Add marginTop to create space between the label and the previous element
  },
  picker: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default CreatePost;
