import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { RootStackParamList } from "../../backend/src/models/types";
import styles from "./MyJobsStyles";
import { StackNavigationProp } from "@react-navigation/stack";

type ClientReviewRouteProp = RouteProp<RootStackParamList, "ClientReview">;
type ClientReviewNavigationProp = StackNavigationProp<RootStackParamList, "ClientReview">;

const ClientReview: React.FC = () => {
  const route = useRoute<ClientReviewRouteProp>();
  const navigation = useNavigation<ClientReviewNavigationProp>();
  const { userId, providerId, providerName } = route.params;
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (description.trim() === "") {
      Alert.alert("Error", "Description cannot be empty.");
      return;
    }

    try {
      await axios.post(`http://localhost:3000/quotes/provider-review/${providerId}`, {
        userId,
        rating,
        description,
      });
      Alert.alert("Success", "Job was successfully completed");
      navigation.navigate("UserDashboard", { userId });
    } catch (error) {
      console.error("Error submitting review:", error);
      Alert.alert("Error", "Failed to submit review");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review for {providerName}</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarClick(star)}>
            <Text style={[styles.star, { color: star <= rating ? "gold" : "grey" }]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={4}
        placeholder={`Describe your experience with ${providerName}`}
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClientReview;
