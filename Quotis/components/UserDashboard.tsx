import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { Post } from "../../backend/src/models/types";
import { useNavigation } from "@react-navigation/native";

const UserDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  const userId = "666b578683ad4b3d47c8b1f4"; // Use the correct user ID

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
      <Text style={styles.title}>Welcome, {userEmail}</Text>
      <Button
        title="Make a Post"
        onPress={() => {
          /* Handle post creation */
        }}
      />
      <Text style={styles.subTitle}>1095 Military Trail, Toronto, ON</Text>
      <View style={styles.jobDetails}>
        <Text>You have an upcoming electrical job in:</Text>
        <Text>3 days: 2 hrs: 25 min</Text>
        <Button
          title="View Job Details"
          onPress={() => {
            /* Handle view job details */
          }}
        />
      </View>
      <Text style={styles.header}>Current Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postDescription}>{item.description}</Text>
            <Button
              title="View Full Post"
              onPress={() => {
                /* Handle view full post */
              }}
            />
          </View>
        )}
      />
      <Text style={styles.header}>Quotes</Text>
      {/* Render quotes here */}
      <View style={styles.navbar}>
        <Button
          title="Home"
          onPress={() => {
            /* Navigate to Home */
          }}
        />
        <Button
          title="Services"
          onPress={() => {
            /* Navigate to Services */
          }}
        />
        <Button
          title="Inbox"
          onPress={() => {
            /* Navigate to Inbox */
          }}
        />
        <Button
          title="Account"
          onPress={() => {
            /* Navigate to Account */
          }}
        />
      </View>
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
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  jobDetails: {
    backgroundColor: "#e0f7fa",
    padding: 10,
    marginVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  post: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginVertical: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postDescription: {
    fontSize: 16,
    marginVertical: 5,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default UserDashboard;
