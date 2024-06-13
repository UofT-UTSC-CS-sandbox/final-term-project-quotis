import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from '../../backend/src/models/types'; // types.ts 파일을 import 합니다.

interface Post {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

const UserDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      <Button title="Post a Job" onPress={() => navigation.navigate('CreatePost')} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default UserDashboard;
