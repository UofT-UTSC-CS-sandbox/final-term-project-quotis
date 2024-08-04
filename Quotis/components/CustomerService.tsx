import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Alert, Linking } from "react-native";
import { RootStackParamList } from "../../backend/src/models/types";
import { RouteProp, useRoute } from "@react-navigation/native";

type CustomerServiceRouteProp = RouteProp<
  RootStackParamList,
  "CustomerService"
>;

const CustomerService: React.FC = () => {
  const navigation: any = useNavigation();
  const route = useRoute<CustomerServiceRouteProp>();

  const handleEmailPress = () => {
    const email = "mailto:zuhair.khan@mail.utoronto.ca";
    Linking.canOpenURL(email)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Email client is not available");
        } else {
          return Linking.openURL(email);
        }
      })
      .catch((err) => console.error("Error opening email:", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text onPress={handleEmailPress}>
          For any customer service needs, contact zuhair.khan@mail.utoronto.ca
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  message: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomerService;
