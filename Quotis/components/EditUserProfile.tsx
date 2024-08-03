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
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";

type EditRouteProp = RouteProp<RootStackParamList, "EditUserProfile">;

const EditUserProfile: React.FC = () => {
  const route: any = useRoute<EditRouteProp>();
  const [firstName, setFirstName] = useState("default ");
  const [lastName, setLastName] = useState("user");
  const [email, setEmail] = useState("default email");
  const [address, setAddress] = useState("default address");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string>("placeholder");
  const { userId } = route.params;
  const navigation: any = useNavigation();

  /*This function allows us to pick an image from our gallery */
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      if (selectedImage.uri) {
        setPhotoUri(selectedImage.uri);
        console.log("got image");
      }
    }
  };
  /*This function allows the user to directly take a picture from their phone to upload */
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  /*This function gets a presigned url 
    for an image in the S3 database */
  const getUploadUrl = async () => {
    try {
      const response = await axios.get("http://localhost:3000/s3Url");
      console.log("Got the image URL");
      return response.data.url;
    } catch (error) {
      console.error("Error getting upload URL:", error);
      Alert.alert("Error", "Failed to get upload URL.");
      return null;
    }
  };

  /*THis functionn using a presigned url and the uri location of the image uploads the image to the database with some metadata  */
  const uploadImage = async (url: string, uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": blob.type,
        },
        body: blob,
      });
      console.log("Uploaded Image");

      return url.split("?")[0]; // Return the S3 URL without query parameters
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image.");
      return null;
    }
  };

  /*This function resizes the image to  */
  const resizeImage = async (uri: string) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 200, height: 200 } }], // 원하는 크기로 조정
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      console.log("Manipulated Image Size");
      return manipResult.uri;
    } catch (error) {
      console.error("Error resizing image:", error);
      Alert.alert("Error", "Failed to resize image.");
      return null;
    }
  };

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
        setProfilePic(response.data.photoUrl);
      } catch (error) {
        console.log("damn for user");
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    // here once the photoUri is changed i want this to take the pic resize it get get a url and then store the pic at that URL
    profilePicUpload();
  }, [photoUri]);

  const profilePicUpload = async () => {
    if (photoUri == null) {
      Alert.alert("Please pick an image.");
      return;
    }
    const resizedUri = await resizeImage(photoUri);
    if (!resizedUri) return;

    const uploadUrl = await getUploadUrl(); // gets signed url to uplaod into the S3 database
    if (uploadUrl) {
      const imageUrl = await uploadImage(uploadUrl, resizedUri);
      if (imageUrl) {
        try {
          await axios.put(`http://localhost:3000/update/${userId}`, {
            photoUrl: imageUrl,
          });
          Alert.alert("Success", "Post created successfully!");
          setPhotoUri(null);
          navigation.navigate("UserInfo", { userId });
        } catch (error) {
          console.error("Error uploading image:", error);
          Alert.alert("Error", "Failed to upload image.");
        }
      }
    }
  };

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
      navigation.navigate("UserInfo", { userId: userId });
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
        {photoUri === "placeholder" ? (
          <Image
            style={styles.image}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
            }}
          />
        ) : (
          <Image style={styles.image} source={{ uri: profilePic }} />
        )}
        <View style={styles.button}>
          <Button title="change photo" onPress={pickImage} color={"#007bff"} />
        </View>
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
      <Text style={styles.title}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder={address}
        value={address}
        onChangeText={setAddress}
      />
      <View style={styles.submit}>
        <Button title="Submit" color={"#007bff"} onPress={handleSubmit} />
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
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
    borderRadius: 5,
  },
  button: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default EditUserProfile;
