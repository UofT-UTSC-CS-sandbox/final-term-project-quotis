import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types"; // Correct import path
import styles from "./RegisterStyles"; // Import styles from the new file

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const registerUser = async () => {
    if (!email || !password || !role) {
      Alert.alert("Error", "Email, password, and role are required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/register", {
        email,
        password,
        role,
      });
      Alert.alert("Success", response.data.message);
      if (role === "client") {
        navigation.navigate("UserDashboard", {
          userId: response.data.user._id,
        });
      } else {
        navigation.navigate("ProviderDashboard", {
          userId: response.data.user._id,
        });
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to register user."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Picker
        selectedValue={role}
        style={styles.input}
        onValueChange={(itemValue: string) => setRole(itemValue)}
      >
        <Picker.Item label="Client" value="client" />
        <Picker.Item label="Service Provider" value="provider" />
      </Picker>
      <Button title="Register" onPress={registerUser} />
    </View>
  );
};

export default Register;
