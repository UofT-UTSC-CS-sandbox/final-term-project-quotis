import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native" 
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
                    color={"lighblue"}
                    title="Personal"
                    onPress={()=>{navigation.navigate('UserInfo', {
                        userId: userId})}} // passsing userid to the user information page
                    accessibilityLabel="Button to access Personal Info"
                /> 
                <Button 
                    color={"lighblue"}
                    title="Settings" 
                    onPress={()=>{navigation.navigate('UserDashboard')}}  
                    accessibilityLabel="Button to access Settings"
                />
                <Button 
                    color={"lighblue"}
                    title="Security"
                    onPress={do_nothing}  
                    accessibilityLabel="Button to access Personal Info"
                />
                <Button 
                    color={"lighblue"}
                    title="History"
                    onPress={do_nothing}  
                    accessibilityLabel="Button to access Personal Info"
                    /> 
                    
                <Button 
                    color={"lighblue"}
                    title="Log-Out"
                    onPress={do_nothing}  
                    accessibilityLabel="Button to access Personal Info"
                />
            </View>
        </View>
    );
} 


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
        justifyContent:"center" , 
        alignItems:"center",
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