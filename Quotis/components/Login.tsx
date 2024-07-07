import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import styles from "./LoginRegisterStyles";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Quotis",
      headerTitleAlign: "center",
      headerLeft: () => (
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 40, height: 40 }}
        />
      ),
    });
  }, [navigation]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    try {
      console.log("Attempting to log in with:", { email, password });
      const response = await axios.post("http://localhost:3000/login", {
        email: email.toLowerCase(),
        password,
      });
      console.log("Login response:", response.data);
      if (response.data.role === "client") {
        navigation.navigate("UserDashboard", {
          userId: response.data.user._id,
        });
      } else {
        navigation.navigate("ProviderDashboard", {
          userId: response.data.user._id,
        });
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to login.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Login</Text>
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
          <TouchableOpacity style={styles.button} onPress={loginUser}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerLinkText}>Register here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
