import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { RootStackParamList } from "../../backend/src/models/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";

type EditProviderProp = RouteProp<RootStackParamList, "EditProviderInfo">;

const EditProviderInfo: React.FC = () => {
  const route: any = useRoute<EditProviderProp>();
  const [profilePic, setProfilePic] = useState(null);
  const [firstName, setFirstName] = useState("default ");
  const [lastName, setLastName] = useState("user");
  const [email, setEmail] = useState("default email");
  const [address, setAddress] = useState("default address"); 
  const [postal, setPostal] = useState("A1A 1A1") ;
  const [phone, setPhone] = useState('12345678');
  const { userId } = route.params;
  const navigation: any = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/${userId}`
        );
        console.log("success ");
        setEmail(response.data.email);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      } catch (error) {
        console.log("damn for user");
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  const handleSubmit = async () => {
    const updatedData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/update/${userId}`,
        updatedData
      );
      Alert.alert("Successfully Updated UserInfo", response.data.message);
      console.log(response.data.message);
      navigation.navigate("ProviderInfo", { userId: userId });
    } catch (error: any) {
      console.log("damn for edit");
      console.error("Error Updating User Information:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update."
      );
    }
  };

  const nothing: any = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EDIT PROFILE</Text>
      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
          }}
        />
        <Button title="change photo" onPress={nothing} color={"lightblue"} />
      </View>
      <Text style={styles.title}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder={firstName}
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.title}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder={lastName}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder={email}
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <Text style={styles.title}>Postal Code</Text>
      <TextInput
        style={styles.input}
        placeholder={postal}
        value={postal}
        onChangeText={setPostal}
      /> 
       <Text style={styles.title}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder={phone}
        value={phone}
        onChangeText={setPhone}
      />
      <View style={styles.submit}>
        <Button title="Submit" color={"lightblue"} onPress={handleSubmit} />
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  profilePicContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    textAlign: "center",
    lineHeight: 100,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
  },
  submit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: width * 0.3,
  },
});

export default EditProviderInfo;
