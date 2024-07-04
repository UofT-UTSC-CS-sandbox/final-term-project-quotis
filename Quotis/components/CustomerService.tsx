
import React from "react";
import { View, Text, StyleSheet, Button, Image, Dimensions } from "react-native" 

const CustomerService: React.FC = () => {
    /*Do nothing is a void filler function for buttons that allow buttons when pressed to do nothing */


    return(
        <View style={styles.container}> 
            <Text style={styles.message}> 
                For any customer Support services contact Zuhair Khan at zuhairkhan@mail.utoronto.ca
            </Text>
        </View>
    );
} 

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      display:"flex", 
      flexDirection: "row",
      justifyContent:"center", 
      alignItems:"center"
    }, 
    message:{
        alignItems:"center",
        fontWeight:"bold",
    }

  }); 

  export default CustomerService;