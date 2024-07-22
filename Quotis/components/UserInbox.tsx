import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./UserDashboardStyles";
import { formatDistanceToNow } from "date-fns";

import { RootStackParamList } from "../../backend/src/models/types";

type UserInboxRouteProp = RouteProp<RootStackParamList, "UserInbox">;

const UserInbox: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const route = useRoute<UserInboxRouteProp>();
  const navigation: any = useNavigation();

  const { userId } = route.params;
  const userType = "client"; // Assuming the user type is 'client', update this based on your app logic

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/notifications/${userType}/${userId}/notifications`
        );
        setNotifications(response.data.reverse()); // Reverse the notifications array
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      console.log(`Attempting to delete notification: ${notificationId}`);
      const response = await axios.delete(
        `http://localhost:3000/notifications/${userType}/${userId}/notifications/${notificationId}`
      );
      if (response.status === 200) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notificationId
          )
        );
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      Alert.alert("Error", "Failed to delete notification.");
    }
  };

  const NotificationItem: React.FC<{ notification: any }> = ({
    notification,
  }) => (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationText}>{notification.message}</Text>
        <Text style={styles.notificationDate}>
          {formatDistanceToNow(new Date(notification.date_created), {
            addSuffix: true,
          })}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteNotification(notification._id)}
      >
        <FontAwesome name="close" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <Text style={styles.sectionHeader}>Notifications</Text>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.scrollContainer}
      />
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("UserDashboard", { userId })}
        >
          <FontAwesome name="home" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {
          navigation.navigate("Services", {
            userId: userId,
          });
        }}>
          <FontAwesome name="wrench" size={24} color="black" />
          <Text>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <FontAwesome name="envelope" size={24} color="black" />
          <Text>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Profile", {
              userId: userId,
            });
          }}
        >
          <FontAwesome name="user" size={24} color="black" />
          <Text>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInbox;
