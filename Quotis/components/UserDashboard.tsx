import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./UserDashboardStyles";
import { useRoute, RouteProp, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import { useNavigation } from "@react-navigation/native";
import { formatDistanceToNow, format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserDashboardRouteProp = RouteProp<RootStackParamList, "UserDashboard">;

interface Post {
  _id: string;
  title: string;
  photoUrl: string;
  description: string;
  jobDate: string;
}

interface Quote {
  _id: string;
  provider_name: string;
  date_sent: string;
  description: string;
  price_estimate: string;
  status: string;
  provider_date: string;
  alternative_date?: string;
  job_post_title: string;
  client_name: string; // Add client name field
}

const UserDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userFirstName, setUserFirstName] = useState<string>("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute<UserDashboardRouteProp>();

  const { userId } = route.params;
  const navigation: any = useNavigation();

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      setUserFirstName(response.data.firstName);
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

      const response = await axios.get(
        `http://localhost:3000/posts/user/${userId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
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
      console.log("Fetched quotes:", response.data);
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

  const handleQuoteAction = async (
    quoteId: string,
    action: string,
    providerName: string
  ) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const status = action === "accepted" ? "accepted" : "denied";

      const response = await axios.patch(
        `http://localhost:3000/quotes/${quoteId}/status`,
        { status },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        console.log(`Quote ${action} successfully.`);

        const message =
          action === "accepted"
            ? `You have accepted a quote from ${providerName}`
            : `You have denied a quote from ${providerName}`;

        await axios.post(
          `http://localhost:3000/notifications/client/${userId}/notify`,
          {
            action: "quote",
            entityId: quoteId,
            message,
          },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        setQuotes((prevQuotes) =>
          prevQuotes.map((quote) =>
            quote._id === quoteId ? { ...quote, status } : quote
          )
        );
      }
    } catch (error) {
      console.error(`Error updating quote status:`, error);
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete(
        `http://localhost:3000/quotes/${quoteId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (response.status === 200) {
        console.log("Quote deleted successfully");
        setQuotes((prevQuotes) =>
          prevQuotes.filter((quote) => quote._id !== quoteId)
        );
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  const QuoteItem: React.FC<{ quote: Quote }> = ({ quote }) => {
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
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Confirm Delete",
                  "Are you sure you want to remove this quote?",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Yes",
                      onPress: () => handleDeleteQuote(quote._id),
                    },
                  ]
                )
              }
              style={styles.deleteQuoteButton}
            >
              <Text style={styles.deleteQuoteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {expanded && (
          <View style={styles.quoteDetails}>
            <Text>Job Post: {quote.job_post_title}</Text>
            <Text>Description: {quote.description}</Text>
            <Text>
              Date Sent:{" "}
              {formatDistanceToNow(new Date(quote.date_sent), {
                addSuffix: true,
              })}
            </Text>
            <Text>
              Client Date:{" "}
              {format(new Date(quote.provider_date), "MMMM d, yyyy h:mm a")}
            </Text>
            {quote.alternative_date && (
              <Text>
                Alternative Date:{" "}
                {format(
                  new Date(quote.alternative_date),
                  "MMMM d, yyyy h:mm a"
                )}
              </Text>
            )}
            {quote.status === "pending" && (
              <>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() =>
                    handleQuoteAction(
                      quote._id,
                      "accepted",
                      quote.provider_name
                    )
                  }
                >
                  <Text style={styles.buttonText}>Accept Quote</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={() =>
                    handleQuoteAction(quote._id, "denied", quote.provider_name)
                  }
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

  const navigateToUserPost = (postId: string, userId: string) => {
    navigation.navigate("UserPost", { postId, userId });
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete(
        `http://localhost:3000/posts/${postId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (response.status === 200) {
        console.log("Post deleted successfully");
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const renderHeader = () => {
    const acceptedQuotes = quotes.filter(
      (quote) => quote.status === "accepted"
    );

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome, {userFirstName}</Text>
        </View>
        <Text style={styles.location}>1095 Military Trail, Toronto, ON</Text>

        {acceptedQuotes.length > 0 ? (
          acceptedQuotes.map((quote) => {
            const jobDate = new Date(
              quote.alternative_date || quote.provider_date
            );
            const timeLeft = !isNaN(jobDate.getTime())
              ? formatDistanceToNow(jobDate, { addSuffix: true })
              : "Invalid date";

            return (
              <View key={quote._id} style={styles.upcomingJob}>
                <Text style={styles.upcomingJobText}>
                  You have an upcoming job with {quote.provider_name} in:
                </Text>
                <Text style={styles.jobTime}>{timeLeft}</Text>
                <Text style={styles.jobPostTitle}>{quote.job_post_title}</Text>
                <TouchableOpacity style={styles.jobButton} onPress={() => {}}>
                  <Text style={styles.jobButtonText}>Mark Job as Complete</Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text style={styles.noUpcomingJobsText}>No upcoming jobs</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.postButton}
            onPress={navigateToCreatePost}
          >
            <Text style={styles.postButtonText}>Make a Post</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>Current Posts</Text>
        <ScrollView
          horizontal
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.postContainer}
        >
          {posts.map((post) => (
            <View key={post._id} style={styles.post}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text>{post.description}</Text>
              <Text style={styles.postDate}>
                {`Job Date: ${format(new Date(post.jobDate), "MMMM d, yyyy")}`}
              </Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigateToUserPost(post._id, userId)}
              >
                <Text style={styles.viewButtonText}>View full post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePost(post._id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <Text style={[styles.sectionHeader, { marginBottom: 20 }]}>Quotes</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={quotes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <QuoteItem quote={item} />}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.scrollContainer}
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
            navigation.navigate("UserInbox", {
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
            navigation.navigate("Profile", {
              userId: userId,
            });
          }}
        >
          <FontAwesome name="user" size={24} color="black" />
          <Text>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDashboard;
