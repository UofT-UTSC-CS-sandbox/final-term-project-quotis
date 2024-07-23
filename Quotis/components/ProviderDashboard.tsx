import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { Post } from "../../backend/src/models/Post"; // Adjust the import path as needed
import { FontAwesome } from "@expo/vector-icons"; // You may need to install this package
import styles from "./UserDashboardStyles"; // Import styles from the new file
import { useRoute, RouteProp, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNow } from "date-fns"; // Import date-fns
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProviderDashboardRouteProp = RouteProp<
  RootStackParamList,
  "ProviderDashboard"
>;

const ProviderDashboard: React.FC = () => {
  const navigation: any = useNavigation();
  const route = useRoute<ProviderDashboardRouteProp>();
  const { userId } = route.params;

  const [posts, setPosts] = useState<Post[]>([]);
  const [userFirstName, setUserFirstName] = useState<string>("");
  const [quotes, setQuotes] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      setUserFirstName(response.data.firstName); // Update to set first name
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(`http://localhost:3000/posts`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts().then(() => setRefreshing(false));
  }, []);

  const fetchQuotes = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/quotes/user/${userId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log("Fetched quotes:", response.data); // Add this line
      setQuotes(response.data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchPosts();
    fetchQuotes();
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [userId])
  );

  const handleQuoteAction = async (quoteId: string, action: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/quotes/${quoteId}/notify`,
        { action },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (response.status === 200) {
        console.log(`Notification added for ${action} action.`);
        setQuotes((prevQuotes) =>
          prevQuotes.map((quote) =>
            quote._id === quoteId ? { ...quote, status: action } : quote
          )
        );
      }
    } catch (error) {
      console.error(`Error adding notification:`, error);
    }
  };

  const QuoteItem: React.FC<{ quote: any }> = ({ quote }) => {
    const [expanded, setExpanded] = useState(false);

    const getQuoteStyle = (status: string) => {
      switch (status) {
        case "accepted":
          return styles.acceptedQuote;
        case "denied":
          return styles.declinedQuote;
        default:
          return styles.pendingQuote;
      }
    };

    return (
      <View style={[styles.quoteContainer, getQuoteStyle(quote.status)]}>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <View style={styles.quoteHeader}>
            <Text style={styles.quoteText}>Provider:</Text>
            <Text style={styles.quoteText}>{quote.provider_name}</Text>
            <Text style={styles.quoteText}>Price: {quote.price_estimate}</Text>
            <Text style={styles.quoteText}>Status: {quote.status}</Text>
          </View>
        </TouchableOpacity>
        {expanded && (
          <View style={styles.quoteDetails}>
            <Text>Description: {quote.description}</Text>
            <Text>
              Date Sent:{" "}
              {formatDistanceToNow(new Date(quote.date_sent), {
                addSuffix: true,
              })}
            </Text>
            {quote.status === "pending" && (
              <>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleQuoteAction(quote._id, "accepted")}
                >
                  <Text style={styles.buttonText}>Accept Quote</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={() => handleQuoteAction(quote._id, "denied")}
                >
                  <Text style={styles.buttonText}>Decline Quote</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>
    );
  };

  const navigateToCreatePost = () => {
    navigation.navigate("CreatePost", { userId });
  };

  const navigateToPostList = () => {
    navigation.navigate("PostList", { userId });
  };

  const navigateToUserPost = (postId: string, userId: string) => {
    navigation.navigate("UserPost", { postId, userId });
  };

  const handleNotificationPost = async (postId: string) => {
    // try {
    //   const token = await AsyncStorage.getItem("token");
    //   if (!token) {
    //     console.error("No token found");
    //     return;
    //   }
    //   const response = await axios.put(
    //     `http://localhost:3000/posts/${postId}`, //need to fix it , make it noticication goes to inbox user.
    //     {
    //       headers: {
    //         "x-auth-token": token,
    //       },
    //     }
    //   );
    //   if (response.status === 200) {
    //     console.log("Post notification later. successfully");
    //     setPosts((prevPosts) => prevPosts.filter((post) => post._id.toString() !== postId));
    //   }
    // } catch (error) {
    //   console.error("Error deleting post:", error);
    // }
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {userFirstName}</Text>
        <TouchableOpacity
          style={styles.postButton}
          onPress={navigateToCreatePost}
        >
          <Text style={styles.postButtonText}>Make a Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postButton}
          onPress={navigateToPostList}
        >
          <Text style={styles.postButtonText}>View Posts</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.location}>1095 Military Trail, Toronto, ON</Text>
      <View style={styles.upcomingJob}>
        <Text style={styles.upcomingJobText}>
          You have an upcoming electrical job in:
        </Text>
        <Text style={styles.jobTime}>3 days: 2 hrs: 25 min</Text>
        <TouchableOpacity style={styles.jobButton} onPress={() => {}}>
          <Text style={styles.jobButtonText}>View job details</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionHeader}>All Posts</Text>
      <ScrollView
        horizontal
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {posts.map((post) => (
          <View key={post._id.toString()} style={styles.post}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text>{post.description}</Text>
            <Text>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </Text>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => navigateToUserPost(post._id.toString(), userId)}
            >
              <Text style={styles.viewButtonText}>View full post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
                marginTop: 10,
              }}
              onPress={() => handleNotificationPost(post._id.toString())}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Notification
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Text style={[styles.sectionHeader, { marginBottom: 20 }]}>Quotes</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={quotes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <QuoteItem quote={item} />}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.scrollContainer} // Add this line to apply padding to FlatList content
      />
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <FontAwesome name="home" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Services", {
              userId: userId,
            });
          }}
        >
          <FontAwesome name="wrench" size={24} color="black" />
          <Text>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("ProviderInbox", {
              userId: userId,
            });
          }}
        >
          <FontAwesome name="envelope" size={24} color="black" />
          <Text>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("ProviderProfile", {
              userId: userId,
            });
          }}
        >
          <FontAwesome name="user" size={24} color="black" />
          <Text>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('MyJobs', {userId: userId})}
        >
          <FontAwesome name="briefcase" size={24} color="black" />
          <Text>My Jobs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProviderDashboard;
