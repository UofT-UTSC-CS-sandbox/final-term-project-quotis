import React from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { RouteProp, useRoute } from '@react-navigation/native'; 
import { RootStackParamList } from '../../backend/src/models/types';
import { useEffect, useState } from 'react';
import axios from 'axios';


// I need to pass this page a prop of the basic info of who logged in 
type UserInfoRouteProp = RouteProp<RootStackParamList, "UserInfo">;

const UserInfo: React.FC = () => {  
  

  const route = useRoute<UserInfoRouteProp>();
  const { userId } = route.params;  
  const [email, setEmail] = useState<string>("defaultEmail");
  const [firstName, setFirstName] = useState<string>("default"); 
  const [lastName, setLastName] = useState<string>("User");
  const [address, setAddress] = useState<string>("default Address");
  const [UserType, setUserType]  = useState<string>("IDK");  
  const navigation:any = useNavigation();
  const do_nothing: any = ()=> {

  } 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/${userId}`
        ); 
        console.log('success');
        setEmail(response.data.email); 
        setUserType(response.data.role);
        setFirstName(response.data.firstName); 
        setLastName(response.data.lastName);

      } catch (error) {
        console.log('damn');
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Information</Text> 

      <View style={styles.banner}>  
      <Image
        style={styles.image}
            source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
            }}
        />
        <Text style={styles.name}> {firstName} {lastName} </Text>   
        <Button 
                    color={"lightblue"}
                    title="Edit Profile"
                    onPress={()=>{navigation.navigate('EditUserProfile', {
                      userId: userId})}} 
                    accessibilityLabel="Button to access edit UserInfo"
                    />  

      </View>

      <View style={styles.info}>
        <Text>Email   {email}</Text>
        <Text>Address   {address}</Text>  
      </View>
      
    </View>
  );
}; 

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: "flex-start",
    alignItems: "center", 
    backgroundColor: "#f8f8f8"
  },   
  title: {
    fontSize: 20, 
    fontWeight:"bold",
  },
  info:{ 
    display: "flex",
    flexDirection:"column",
    justifyContent: "center", 
    alignItems: "flex-start", 
  },
  banner: { 
    display: "flex", 
    flexDirection:"row",
    justifyContent: "space-around",
    alignItems:"center", 
    padding:20,

  }, 
  name:{ 
    padding:10, 
    fontWeight:"bold",
  }, 
  image:{ 
    width: 100,
    height: 100,
    borderRadius: 50,
    
},
important: {
   fontWeight:"bold",
}
});


export default UserInfo;

/*Changes to implement
1) Make it that you can edit the information all on that page  
2) Make it that all the information is displayed in a innstagram like way 
*/
