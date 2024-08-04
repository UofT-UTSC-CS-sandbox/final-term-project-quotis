import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPost as Post } from "../../backend/src/models/Post";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImageManipulator from "expo-image-manipulator";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import styles from "./UserPostStyles"; // Import styles from the new file

type UserPostRouteProp = RouteProp<RootStackParamList, "UserPost">;
type NavigationProp = StackNavigationProp<RootStackParamList, "UserPost">;

const UserPost: React.FC = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [jobDate, setJobDate] = useState<Date>(new Date());

  const route = useRoute<UserPostRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { postId, userId } = route.params;

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
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (error) {
      console.error("Error resizing image:", error);
      Alert.alert("Error", "Failed to resize image.");
      return null;
    }
  };

  const handleUpdatePost = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    let imageUrl = photoUrl;
    if (photoUri) {
      const uploadUrl = await getUploadUrl();
      if (uploadUrl) {
        imageUrl = await uploadImage(uploadUrl, photoUri);
      }
    }

    try {
      await axios.put(`http://localhost:3000/posts/${postId}`, {
        title,
        photoUrl: imageUrl,
        description,
        jobDate: jobDate.toISOString(),
      });

      Alert.alert("Success", "Post updated successfully!");
      navigation.navigate("UserDashboard", { userId });
    } catch (error) {
      console.error("Error updating post:", error);
      Alert.alert("Error", "Failed to update post.");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/posts/${postId}`,
          {
            headers: { "x-auth-token": token },
          }
        );

        const post = response.data;
        setTitle(post.title);
        setDescription(post.description);
        setPhotoUrl(post.photoUrl);
        setJobDate(new Date(post.jobDate));
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [userId, postId]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Photo</Text>
      {photoUrl ? (
        <Image source={{ uri: photoUrl }} style={styles.image} />
      ) : (
        <Text>No photo available</Text>
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Text style={styles.label}>Select Date and Time of Job</Text>
      <DateTimePicker
        value={jobDate}
        mode="datetime"
        display="default"
        onChange={(event, selectedDate) => setJobDate(selectedDate || jobDate)}
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePost}>
        <Text style={styles.buttonText}>Update Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserPost;
