import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import ProviderDashboard from "./components/ProviderDashboard";
import Profile from "./components/Profile";
import Services from "./components/Services";
import { RootStackParamList } from "./../backend/src/models/types";
import CreatePost from "./components/createPost";
import UserInfo from "./components/UserInfo";
import ServiceSearch from "./components/ServiceSearch";
import UserInbox from "./components/UserInbox";
import EditUserProfile from "./components/EditUserProfile"; // Added this line
import ProviderInfo from "./components/ProviderInfo";
import Verification from "./components/Verification";
import EditProviderInfo from "./components/EditProviderInfo";
import PostList from "./components/PostList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UserInbox" component={UserInbox} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="ProviderDashboard" component={ProviderDashboard} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="ServiceSearch" component={ServiceSearch} />
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
        <Stack.Screen name="ProviderInfo" component={ProviderInfo} />
        <Stack.Screen name="Verification" component={Verification} /> 
        <Stack.Screen name="EditProviderInfo" component={EditProviderInfo} />
        <Stack.Screen name="PostList" component={PostList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}