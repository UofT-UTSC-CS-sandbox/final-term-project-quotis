import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, TouchableOpacity, Alert, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";
import styles from "./LoginRegisterStyles";
import { Picker } from '@react-native-picker/picker';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("client");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Quotis",
      headerTitleAlign: "center",
      headerLeft: () => (
        <Image
          source={require("../assets/prototype.png")}
          style={{ width: 40, height: 40 }}
        />
      ),
    });
  }, [navigation]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const registerUser = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Invalid email format.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/register", {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        role,
      });
      Alert.alert("Success", response.data.message);
      navigation.navigate("Login");
    } catch (error: any) {
      console.error("Error during registration:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to register user."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Register</Text>
          <View style={styles.nameContainer}>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={[styles.input, styles.halfInput]}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={[styles.input, styles.halfInput]}
            />
          </View>
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
            style={styles.picker}
            onValueChange={(itemValue: string) => setRole(itemValue)}
          >
            <Picker.Item label="Client" value="client" />
            <Picker.Item label="Service Provider" value="provider" />
          </Picker>
          <TouchableOpacity style={styles.button} onPress={registerUser}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLinkText}>Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
