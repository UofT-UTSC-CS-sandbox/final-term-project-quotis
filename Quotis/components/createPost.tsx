import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (!title || !description || !category || !budget || !location || !date || !time || !image) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('budget', budget);
    formData.append('location', location);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('createdBy', 'currentUserId'); // 현재 사용자 ID로 변경해야 함

    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('image', {
      uri: image,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    } as any);

    try {
      const response = await axios.post('http://localhost:3000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert("Success", response.data.message);
    } catch (error: any) {
      console.error('Error creating post:', error);
      Alert.alert("Error", error.response?.data?.message || "Failed to create post.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Job Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Electrical" value="Electrical" />
        <Picker.Item label="Plumbing" value="Plumbing" />
        <Picker.Item label="Moving" value="Moving" />
      </Picker>
      <TextInput
        placeholder="Budget"
        value={budget}
        onChangeText={setBudget}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Date"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Time"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Create Post" onPress={createPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
});

export default CreatePost;
