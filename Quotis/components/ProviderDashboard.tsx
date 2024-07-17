import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../backend/src/models/types"; 
import { Post } from "../../backend/src/models/types"; 

type ProviderDashboardRouteProp = RouteProp<RootStackParamList, 'ProviderDashboard'>;

const ProviderDashboard: React.FC = () => {
  const navigation:any = useNavigation();
  const route = useRoute<ProviderDashboardRouteProp>();
  const { userId } = route.params;

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/${userId}`
        );
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserDetails();
    fetchPosts();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Provider Dashboard</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('MyJobs', {userId: userId})}
      >
        <Text style={styles.buttonText}>View My Jobs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProviderDashboard;
