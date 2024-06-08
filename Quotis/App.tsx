import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <View style={styles.container}>
      {isRegister ? <Register /> : <Login />}
      <Button
        title={isRegister ? "Switch to Login" : "Switch to Register"}
        onPress={() => setIsRegister(!isRegister)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  }
});
