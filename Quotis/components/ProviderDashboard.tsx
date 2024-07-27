import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../../backend/src/models/types";
import styles from "./ProviderDashboardStyles";

type ProviderDashboardRouteProp = RouteProp<
  RootStackParamList,
  "ProviderDashboard"
>;

interface PostWithUser {
  _id: string;
  userId: string;
  title: string;
  description: string;
  photoUrl: string;
  createdAt: string;
  jobDate: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

const ProviderDashboard: React.FC = () => {
  const navigation: any = useNavigation();
  const route = useRoute<ProviderDashboardRouteProp>();
  const { userId } = route.params;

  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [providerName, setProviderName] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProviderDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/providers/${userId}`
      );
      setProviderName(`${response.data.firstName} ${response.data.lastName}`);
    } catch (error) {
      console.error("Error fetching provider details:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts`);
      const postsWithUser = await Promise.all(
        response.data.map(async (post: any) => {
          const userResponse = await axios.get(
            `http://localhost:3000/user/${post.userId}`
          );
          return {
            ...post,
            user: {
              firstName: userResponse.data.firstName,
              lastName: userResponse.data.lastName,
            },
          };
        })
      );
      const sortedPosts = postsWithUser.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchProviderDetails();
    fetchPosts();
  }, [userId]);

  const navigateToQuoteForm = (
    postId: string,
    userId: string,
    jobDate: string
  ) => {
    navigation.navigate("QuoteForm", {
      postId,
      providerId: route.params.userId,
      userId,
      jobDate, // Pass jobDate as client_date
    });
  };

  const renderPostItem = ({ item }: { item: PostWithUser }) => (
    <View style={styles.postContainer}>
      <Text
        style={styles.userName}
      >{`${item.user.firstName} ${item.user.lastName}`}</Text>
      <Image source={{ uri: item.photoUrl }} style={styles.postImage} />
      <Text style={styles.postDescription}>{item.description}</Text>
      <Text style={styles.postTime}>
        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
      </Text>
      <Text style={styles.actualPostTime}>{`Posted on: ${new Date(
        item.createdAt
      ).toLocaleString()}`}</Text>
      <TouchableOpacity
        style={styles.sendQuoteButton}
        onPress={() => navigateToQuoteForm(item._id, item.userId, item.jobDate)}
      >
        <Text style={styles.sendQuoteButtonText}>Send Quote</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {providerName}</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderPostItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContainer}
      />
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <FontAwesome name="home" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("MyJobs", { userId })}
        >
          <FontAwesome name="briefcase" size={24} color="black" />
          <Text>My Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ProviderInbox", { userId })}
        >
          <FontAwesome name="envelope" size={24} color="black" />
          <Text>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ProviderProfile", { userId })}
        >
          <FontAwesome name="user" size={24} color="black" />
          <Text>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProviderDashboard;
