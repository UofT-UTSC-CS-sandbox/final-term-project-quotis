import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserDashboard: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      <Button title="Post a Job" onPress={() => navigation.navigate('PostJob')} />
      <Button title="View Providers" onPress={() => navigation.navigate('ProvidersList')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default UserDashboard;
