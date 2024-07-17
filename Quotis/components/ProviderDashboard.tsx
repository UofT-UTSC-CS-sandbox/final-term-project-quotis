import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import axios from "axios";
import { Post } from "../../backend/src/models/types"; // 인터페이스 경로를 맞춰서 가져옵니다.
import { useNavigation } from "@react-navigation/native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../backend/src/models/types";


const ProviderDashboard: React.FC = () => {
  
type ProviderDashboardRouteProp = RouteProp<RootStackParamList, "ProviderDashboard">;
const navigation:any = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);
  const route = useRoute<ProviderDashboardRouteProp>();
  const { userId } = route.params; // Getting userId from route params 
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Provider Dashboard</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
        <Button 
                    color={"blue"}
                    title="Profile"
                    onPress={()=>{navigation.navigate('ProviderInfo', {
                      userId: userId})}} 
                    accessibilityLabel="Button to access edit ProviderInfo"
                    />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ProviderDashboard;
