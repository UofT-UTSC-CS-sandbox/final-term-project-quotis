import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, Image } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import styles from "./LoginRegisterStyles";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("client");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const registerUser = async () => {
    if (!email || !password || !role || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/register", {
        email: email.toLowerCase(),
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
      <Text style={styles.header}>Register</Text>
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
      <TouchableOpacity style={styles.button} onPress={registerUser}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
