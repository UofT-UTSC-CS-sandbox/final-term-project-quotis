import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      Alert.alert("Success", response.data.message);
    } catch (error: any) {  // declare the type as  'any' for aoviding error on err.
      console.error('Error during registration:', error); 
      Alert.alert("Error", error.response?.data?.message || "Failed to login.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={loginUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  }
});

export default Login;
