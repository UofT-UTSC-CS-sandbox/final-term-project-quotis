import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { RootStackParamList } from "../../backend/src/models/types";
import styles from "./MyJobsStyles";
import { FontAwesome } from "@expo/vector-icons";

type MyJobsRouteProp = RouteProp<RootStackParamList, "MyJobs">;

interface Quote {
  _id: string;
  provider_name: string;
  date_sent: string;
  description: string;
  price_estimate: string;
  status: string;
  user_id: string;
  provider_id: string;
  post_id: string; // Add this field to the Quote interface
  client_name: string;
  job_post_title: string;
}

const MyJobs: React.FC = () => {
  const route = useRoute<MyJobsRouteProp>();
  const navigation = useNavigation<any>();
  const { userId } = route.params;

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentFilter, setCurrentFilter] = useState<
    "accepted" | "completed" | "cancelled"
  >("accepted");

  const fetchQuotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/jobs?provider_id=${userId}&status=${currentFilter}`
      );
      setQuotes(response.data);
    } catch (error) {
      console.error(`Error fetching ${currentFilter} quotes:`, error);
      Alert.alert("Error", "Failed to fetch quotes. Please try again later.");
    }
  };

  const cancelJob = async (jobId: string) => {
    try {
      await axios.patch(`http://localhost:3000/jobs/${jobId}`, {
        status: "cancelled",
      });
      fetchQuotes();
      Alert.alert("Job Cancelled", "The job has been successfully cancelled.");
    } catch (error) {
      console.error("Error cancelling job:", error);
      Alert.alert("Error", "Failed to cancel the job. Please try again later.");
    }
  };

  const markAsComplete = async (job: Quote) => {
    try {
      await axios.patch(`http://localhost:3000/jobs/${job._id}`, {
        status: "completed",
      });
      fetchQuotes();
      navigation.navigate("ProviderReview", {
        userId: job.provider_id,
        clientId: job.user_id,
        clientName: job.provider_name,
      });
    } catch (error) {
      console.error("Error completing job:", error);
      Alert.alert(
        "Error",
        "Failed to complete the job. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [currentFilter]);

  return (
    <View style={styles.container}>
      <View style={styles.toggleButtonContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            currentFilter === "accepted" ? styles.activeToggle : null,
          ]}
          onPress={() => setCurrentFilter("accepted")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              currentFilter === "accepted" ? styles.activeToggleText : null,
            ]}
          >
            Accepted Jobs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            currentFilter === "completed" ? styles.activeToggle : null,
          ]}
          onPress={() => setCurrentFilter("completed")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              currentFilter === "completed" ? styles.activeToggleText : null,
            ]}
          >
            Completed Jobs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            currentFilter === "cancelled" ? styles.activeToggle : null,
          ]}
          onPress={() => setCurrentFilter("cancelled")}
        >
          <Text
            style={[
              styles.toggleButtonText,
              currentFilter === "cancelled" ? styles.activeToggleText : null,
            ]}
          >
            Cancelled Jobs
          </Text>
        </TouchableOpacity>
      </View>

      {quotes.length === 0 ? (
        <Text style={styles.noJobsText}>
          No{" "}
          {currentFilter === "accepted"
            ? "Accepted"
            : currentFilter === "completed"
            ? "Completed"
            : "Cancelled"}{" "}
          Jobs
        </Text>
      ) : (
        <FlatList
          data={quotes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.jobItem}>
              <Text style={styles.jobTitle}>{item.client_name}</Text>
              <Text>{item.job_post_title}</Text>
              <Text>{new Date(item.date_sent).toLocaleDateString()}</Text>
              <Text>{item.description}</Text>
              <Text>Estimated Price: {item.price_estimate}</Text>
              <Text>Status: {item.status}</Text>
              {currentFilter === "accepted" && (
                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => markAsComplete(item)}
                  >
                    <Text style={styles.completeButtonText}>Complete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => cancelJob(item._id)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      )}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ProviderDashboard", { userId })}
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
      </View>
    </View>
  );
};

export default MyJobs;
