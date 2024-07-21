import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Button, Image, Dimensions } from "react-native" 
import { RootStackParamList } from "../../backend/src/models/types"; 
import { RouteProp, useRoute } from "@react-navigation/native";

type VerificationRouteProp = RouteProp<RootStackParamList, "Verification">;

const Verification: React.FC = () => {
    /*Do nothing is a void filler function for buttons that allow buttons when pressed to do nothing */
    const do_nothing: any = ()=> {

    } 
    const navigation:any = useNavigation(); // this is just to have a short hand for the navigation 
    const route = useRoute<VerificationRouteProp>();

    return(
        <View style={styles.container}> 
        <View style={styles.textcontainer}> 
        <Text>Email your official documentation  to @zuhairkhan@gmail.com</Text>
        </View>
        </View>
    );
} 

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    }, 
    textcontainer:{ 
        display: 'flex', 
        alignItems:'center', 
        justifyContent: 'center',
    }
   
  }); 

  export default Verification;