import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Platform, Alert } from "react-native";
import axios from "axios";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post } from "../../backend/src/models/Post";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImageManipulator from 'expo-image-manipulator';

type UserPostRouteProp = RouteProp<RootStackParamList, "UserPost">;

const UserPost: React.FC = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const route = useRoute<UserPostRouteProp>();
  const [post, setPost] = useState<Post | null>(null);
  const navigation = useNavigation();
  const { postId, userId } = route.params;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [image, setImage] = useState<any>(null);

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
      const response = await axios.get('http://localhost:3000/s3Url');
      return response.data.url;
    } catch (error) {
      console.error('Error getting upload URL:', error);
      Alert.alert('Error', 'Failed to get upload URL.');
      return null;
    }
  };

  const uploadImage = async (url: string, uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': blob.type,
        },
        body: blob,
      });

      return url.split('?')[0]; // Return the S3 URL without query parameters
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image.');
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
      console.error('Error resizing image:', error);
      Alert.alert('Error', 'Failed to resize image.');
      return null;
    }
  };


  const handleUpdatePost = async () => {
    if (!photoUri || !title || !description) {
        Alert.alert('Error', 'Please fill in all fields and select an image.');
        return;
      }
  
      const resizedUri = await resizeImage(photoUri);
      if (!resizedUri) return;
  
      const uploadUrl = await getUploadUrl();
      if (uploadUrl) {
        const imageUrl = await uploadImage(uploadUrl, resizedUri);
        if (imageUrl) {
          try {
            await axios.put(`http://localhost:3000/posts/${postId}`, {
              title: title,
              photoUrl: imageUrl,
              description: description,
            });
            
            Alert.alert('Success', 'Post update successfully!');
          } catch (error) {
            console.error('Error update post:', error);
            Alert.alert('Error', 'Failed to update post.');
          }
        }
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
          `http://localhost:3000/posts/${postId}`, // URL 수정
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        setPost(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPhotoUrl(response.data.photoUrl);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [userId, postId]);

  return (
    <View style={styles.container}>
      {post ? (
        <>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
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
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePost}>
            <Text style={styles.buttonText}>Update Post</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserPost;