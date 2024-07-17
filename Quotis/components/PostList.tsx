import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TextInput, Alert } from 'react-native';
import axios from 'axios';

interface Post {
  id: string;
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
        const response = await axios.get('http://localhost:3000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
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
        await axios.put(`http://localhost:3000/posts/${selectedPost.id}`, selectedPost);
        Alert.alert('Success', 'Post updated successfully!');
        setSelectedPost(null);
      } catch (error) {
        console.error('Error updating post:', error);
        Alert.alert('Error', 'Failed to update post.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {posts.map(post => (
        <View key={post.id} style={styles.post}>
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
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  editContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default PostList;
