import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Post } from "../../backend/src/models/types"; // Adjust the import path as needed
import { FontAwesome } from "@expo/vector-icons"; // You may need to install this package
import styles from "./UserDashboardStyles"; // Import styles from the new file
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import { useNavigation } from "@react-navigation/native";

type UserDashboardRouteProp = RouteProp<RootStackParamList, "UserDashboard">;

const UserDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  const route = useRoute<UserDashboardRouteProp>();
  const { userId } = route.params; // Getting userId from route params 
  const navigation:any = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/${userId}`
        );
        setUserEmail(response.data.email);
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
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome, {userEmail}</Text>
          <Button title="Make a Post" onPress={() => {}} />
        </View>
        <Text style={styles.location}>1095 Military Trail, Toronto, ON</Text>
        <View style={styles.upcomingJob}>
          <Text style={styles.upcomingJobText}>
            You have an upcoming electrical job in:
          </Text>
          <Text style={styles.jobTime}>3 days: 2 hrs: 25 min</Text>
          <Button title="View job details" onPress={() => {}} />
        </View>
        <Text style={styles.sectionHeader}>Current Posts</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Button title="View full post" onPress={() => {}} />
            </View>
          )}
        />
        <Text style={[styles.sectionHeader, { marginBottom: 20 }]}>Quotes</Text>
        {/* Add components for quotes here */}
      </ScrollView>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <FontAwesome name="home" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <FontAwesome name="wrench" size={24} color="black" />
          <Text>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <FontAwesome name="envelope" size={24} color="black" />
          <Text>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {navigation.navigate('Profile', {
          userId: userId})
          }}>
          <FontAwesome name="user" size={24} color="black" />
          <Text>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDashboard;
