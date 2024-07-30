import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { RootStackParamList } from "../../backend/src/models/types";
import styles from "./MyJobsStyles";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome

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
}

const MyJobs: React.FC = () => {
  const route = useRoute<MyJobsRouteProp>();
  const navigation: any = useNavigation();
  const { userId } = route.params;

  const [acceptedQuotes, setAcceptedQuotes] = useState<Quote[]>([]);
  const [showAcceptedJobs, setShowAcceptedJobs] = useState<boolean>(true); // Toggle state

  const fetchAcceptedQuotes = async () => {
    try {
      let status = showAcceptedJobs ? "accepted" : "cancelled"; // Determine which status to fetch
      const response = await axios.get(
        `http://localhost:3000/jobs?provider_id=${userId}&status=${status}`
      );
      setAcceptedQuotes(response.data);
    } catch (error) {
      console.error(
        `Error fetching ${showAcceptedJobs ? "accepted" : "cancelled"} quotes:`,
        error
      );
    }
  };

  const cancelJob = async (jobId: string) => {
    try {
      await axios.patch(`http://localhost:3000/jobs/${jobId}`, {
        status: "cancelled",
      });
      fetchAcceptedQuotes(); // Refresh the list of accepted or cancelled quotes
      Alert.alert("Job Cancelled", "The job has been successfully cancelled.");
    } catch (error) {
      console.error("Error cancelling job:", error);
      Alert.alert("Error", "Failed to cancel the job. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAcceptedQuotes();
  }, [showAcceptedJobs]); // Refresh quotes when showAcceptedJobs state changes

  return (
    <View style={styles.container}>
      <View style={styles.toggleButtonContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            showAcceptedJobs ? styles.activeToggle : null,
          ]}
          onPress={() => setShowAcceptedJobs(true)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              showAcceptedJobs ? styles.activeToggleText : null,
            ]}
          >
            Accepted Jobs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !showAcceptedJobs ? styles.activeToggle : null,
          ]}
          onPress={() => setShowAcceptedJobs(false)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              !showAcceptedJobs ? styles.activeToggleText : null,
            ]}
          >
            Cancelled Jobs
          </Text>
        </TouchableOpacity>
      </View>

      {acceptedQuotes.length === 0 ? (
        <Text style={styles.noJobsText}>
          No {showAcceptedJobs ? "Accepted" : "Cancelled"} Jobs
        </Text>
      ) : (
        <FlatList
          data={acceptedQuotes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.jobItem}>
              <Text style={styles.jobTitle}>{item.provider_name}</Text>
              <Text>{new Date(item.date_sent).toLocaleDateString()}</Text>
              <Text>{item.description}</Text>
              <Text>Estimated Price: {item.price_estimate}</Text>
              <Text>Status: {item.status}</Text>
              {showAcceptedJobs && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => cancelJob(item._id)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
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
