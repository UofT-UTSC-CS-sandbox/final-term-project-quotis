import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import styles from "./QuoteFormStyles";
import { RootStackParamList } from "../../backend/src/models/types";

type QuoteFormRouteProp = RouteProp<RootStackParamList, "QuoteForm">;

const QuoteForm: React.FC = () => {
  const route = useRoute<QuoteFormRouteProp>();
  const navigation: any = useNavigation();
  const { postId, providerId, userId, jobDate, clientName } = route.params; // Receive clientName

  const [description, setDescription] = useState("");
  const [priceEstimate, setPriceEstimate] = useState("");
  const [providerDate, setProviderDate] = useState<Date>(new Date());
  const [clientDate, setClientDate] = useState<Date>(new Date(jobDate)); // Set clientDate to jobDate
  const [suggestAlternative, setSuggestAlternative] = useState(false);
  const [alternativeDate, setAlternativeDate] = useState<Date | null>(null);

  const handleSubmit = async () => {
    console.log("Submitting quote with data:", {
      user_id: userId,
      provider_id: providerId,
      description,
      price_estimate: priceEstimate,
      provider_date: providerDate,
      client_date: clientDate,
      alternative_date: alternativeDate,
      client_status: "pending", // Set client_status to pending
      provider_status: "pending", // Set provider_status to pending
      post_id: postId,
      client_name: clientName, // Add client_name
    });

    try {
      const response = await axios.post("http://localhost:3000/quotes", {
        user_id: userId,
        provider_id: providerId,
        description,
        price_estimate: priceEstimate,
        provider_date: providerDate,
        client_date: clientDate,
        alternative_date: suggestAlternative ? alternativeDate : null,
        client_status: "pending", // Set client_status to pending
        provider_status: "pending", // Set provider_status to pending
        post_id: postId,
        client_name: clientName, // Add client_name
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
      Alert.alert("Error", "Failed to create quote. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Send Quote to {clientName}</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Price Estimate"
        value={priceEstimate}
        onChangeText={setPriceEstimate}
        keyboardType="numeric"
      />
      <View style={styles.dateTimePickerContainer}>
        <DateTimePicker
          value={providerDate}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) =>
            setProviderDate(selectedDate || providerDate)
          }
        />
      </View>
      <View style={styles.alternativeSwitchContainer}>
        <Text style={styles.alternativeSwitchText}>
          Suggest an alternative time?
        </Text>
        <Switch
          value={suggestAlternative}
          onValueChange={(value) => setSuggestAlternative(value)}
        />
      </View>
      {suggestAlternative && (
        <View style={styles.dateTimePickerContainer}>
          <DateTimePicker
            value={alternativeDate || new Date()}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) =>
              setAlternativeDate(selectedDate || alternativeDate)
            }
          />
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuoteForm;
