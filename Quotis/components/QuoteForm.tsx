import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import axios from "axios";
import styles from "./QuoteFormStyles";
import { AnyObject } from "mongoose";

type QuoteFormRouteProp = RouteProp<RootStackParamList, "QuoteForm">;

const QuoteForm: React.FC = () => {
  const route = useRoute<QuoteFormRouteProp>();
  const navigation: any = useNavigation();
  const { postId, providerId, userId } = route.params;

  const [description, setDescription] = useState("");
  const [priceEstimate, setPriceEstimate] = useState("");

  const handleSubmit = async () => {
    console.log("Submitting quote with data:", {
      user_id: userId,
      provider_id: providerId,
      description,
      price_estimate: priceEstimate,
      status: "pending",
    });

    try {
      const response = await axios.post("http://localhost:3000/quotes", {
        user_id: userId,
        provider_id: providerId,
        description,
        price_estimate: priceEstimate,
        status: "pending",
      });
      console.log("Quote created:", response.data);

      Alert.alert(
        "Success",
        "Quote has been created successfully",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("ProviderDashboard", { userId: providerId }),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error creating quote:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Send Quote</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price Estimate"
        value={priceEstimate}
        onChangeText={setPriceEstimate}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default QuoteForm;
