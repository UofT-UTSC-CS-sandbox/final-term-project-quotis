import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Button, Image, Dimensions } from "react-native" 
import { RootStackParamList } from "../../backend/src/models/types"; 
import { RouteProp, useRoute } from "@react-navigation/native";

type ProfileRouteProp = RouteProp<RootStackParamList, "Profile">;

const Profile: React.FC = () => {
    /*Do nothing is a void filler function for buttons that allow buttons when pressed to do nothing */
    const do_nothing: any = ()=> {

    } 
    const navigation:any = useNavigation(); // this is just to have a short hand for the navigation 
    const route = useRoute<ProfileRouteProp>();
    const { userId } = route.params;  

    return(
        <View style={styles.container}> 
      
        <View style={styles.pfp}> 
        <Image
        style={styles.image}
            source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
            }}
        />
        </View>
            <View style={styles.button_list}> 
                <Button 
                    color={"lightblue"}
                    title="Personal"
                    onPress={()=>{navigation.navigate('UserInfo', {
                        userId: userId})}} // passsing userid to the user information page
                    accessibilityLabel="Button to access Personal Info"
                /> 
                <Button 
                    color={"lightblue"}
                    title="Settings" 
                    onPress={()=>{navigation.navigate('UserDashboard')}}  
                    accessibilityLabel="Button to access Settings"
                />
                <Button 
                    color={"lightblue"}
                    title="Customer Service"
                    onPress={()=> {navigation.navigate('CustomerService')}}  
                    accessibilityLabel="Button to access Personal Info"
                />
                <Button 
                    color={"lightblue"}
                    title="History"
                    onPress={do_nothing}  
                    accessibilityLabel="Button to access Personal Info"
                    /> 
                    
                <Button 
                    color={"lightblue"}
                    title="Log-Out"
                    onPress={()=>{navigation.navigate('Login')}}  
                    accessibilityLabel="Button to access Personal Info"
                />
            </View>
        </View>
    );
} 

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "lightblue",
    }, 
    button_list: { 
        display:"flex", 
        padding: 20,
        flexDirection:"column",  
        justifyContent:"space-evenly" , 
        alignItems:"center",
      
        height: height*0.7,
    }, 
    pfp:{ 
        display:"flex", 
        justifyContent:"center", 
        alignItems:"center",

    },
    image:{ 
        width: 100,
        height: 100,
        borderRadius: 50,
    }
  }); 

  export default Profile;