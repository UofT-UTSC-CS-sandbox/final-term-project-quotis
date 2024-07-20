import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { Post } from "../../backend/src/models/types"; // 인터페이스 경로를 맞춰서 가져옵니다.
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import { FontAwesome } from "@expo/vector-icons"; // You may need to install this package

import { useNavigation } from "@react-navigation/native";

type UserDashboardRouteProp = RouteProp<RootStackParamList, "ProviderDashboard">;
const ProviderDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation:any = useNavigation();
  const route = useRoute<UserDashboardRouteProp>();
  const { userId } = route.params; // Getting userId from route params

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Provider Dashboard</Text> 
      <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("ProviderInfo", {
              userId: userId,
            });
          }}
        >
          <FontAwesome name="user" size={24} color="black" />
          <Text>Account</Text>
        </TouchableOpacity>
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
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProviderDashboard;
