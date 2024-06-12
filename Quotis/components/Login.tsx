import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../backend/src/models/types'; // RootStackParamList 타입을 정의한 파일

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      if (response.data.role === 'user') {
        navigation.navigate('UserDashboard');
      } else {
        navigation.navigate('ProviderDashboard');
      }
      Alert.alert("Success", response.data.message);
    } catch (error: any) {
      console.error('Error during login:', error);
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
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
        color="gray"
      />
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
