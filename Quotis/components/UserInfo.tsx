import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 



// I need to pass this page a prop of the basic info of who logged in 

const UserInfo: React.FC = () => { 


  // i need to have a use effect that calls a function that will get the information about the user from the database
  
  // i need to have a function that can asynchronously connect to the data base and query it for specific information but
  // it has to be stored in the back end since we are following a specific model

  // I need to then take the information gotten from the function called and then insert it into the page

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the page for user info</Text>
      <Text>User Name:</Text> 
      <Text>Email: </Text> 
      <Text>Address:</Text> 
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
    backgroundColor: "lightblue",
  }
});

export default UserInfo;
