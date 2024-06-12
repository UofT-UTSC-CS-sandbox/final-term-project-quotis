import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../backend/src/models/types'; // RootStackParamList 타입을 정의한 파일

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); // 기본값을 클라이언트로 설정
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const registerUser = async () => {
    console.log('Email:', email);  // Log the email state
    console.log('Password:', password);  // Log the password state
    console.log('Role:', role); // Log the role state

    if (!email || !password || !role) {
      Alert.alert("Error", "Email, password, and role are required.");
      return;
    }
    try { // send the data to server.
      const response = await axios.post('http://localhost:3000/register', {
        email,
        password,
        role
      });
      Alert.alert("Success", response.data.message);
      if (role === 'client') {
        navigation.navigate('UserDashboard');
      } else {
        navigation.navigate('ProviderDashboard');
      }
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
