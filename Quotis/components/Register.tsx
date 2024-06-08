import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    console.log('Email:', email);  // Log the email state
    console.log('Password:', password);  // Log the password state

    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }
    try { //send the data to server.
      const response = await axios.post('http://localhost:3000/register', {
        //3000 is where mongo db is hostsed, this may change after deploy.
        email,
        password
      });
      Alert.alert("Success", response.data.message);
    } catch (error: any) {
      console.error('Error during registration:', error);
      Alert.alert("Error", error.response?.data?.message || "Failed to register user.");
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
      <Button title="Register" onPress={registerUser} />
    </View>
  );
}

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

export default Register;
