import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Post {
  _id: string;
  title: string;
  photoUrl: string;
  description: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No token found');
          return;
        }

        const response = await axios.get('http://localhost:3000/posts', {
          headers: {
            'x-auth-token': token,
          },
        });
        setPosts(response.data);
      } catch (error: any) { // 타입을 any로 명시
        console.error('Error fetching posts:', error.response ? error.response.data : error.message);
        Alert.alert('Error', 'Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
  };

  const handleSave = async () => {
    if (selectedPost) {
      try {
        const token = await AsyncStorage.getItem('token');
        await axios.put(`http://localhost:3000/posts/${selectedPost._id}`, selectedPost, {
          headers: {
            'x-auth-token': token,
          },
        });
        Alert.alert('Success', 'Post updated successfully!');
        setSelectedPost(null);
      } catch (error: any) { // 타입을 any로 명시
        console.error('Error updating post:', error.response ? error.response.data : error.message);
        Alert.alert('Error', 'Failed to update post.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {posts.map(post => (
        <View key={post._id} style={styles.post}>
          <Text style={styles.title}>{post.title}</Text>
          <Image source={{ uri: post.photoUrl }} style={styles.image} />
          <Text style={styles.description}>{post.description}</Text>
          <Button title="Edit" onPress={() => handleEdit(post)} />
        </View>
      ))}
      {selectedPost && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Edit title"
            value={selectedPost.title}
            onChangeText={(text) => setSelectedPost({ ...selectedPost, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Edit description"
            value={selectedPost.description}
            onChangeText={(text) => setSelectedPost({ ...selectedPost, description: text })}
          />
          <Button title="Save" onPress={handleSave} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  editContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default PostList;