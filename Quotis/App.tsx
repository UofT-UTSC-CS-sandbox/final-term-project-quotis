import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import ProviderDashboard from "./components/ProviderDashboard";
import UserPost from "./components/UserPost";
import Profile from "./components/Profile";
import { RootStackParamList } from "../backend/src/models/types";
import CreatePost from "./components/createPost";
import UserInfo from "./components/UserInfo";
import UserInbox from "./components/UserInbox";
import EditUserProfile from "./components/EditUserProfile";
import MyJobs from "./components/MyJobs";
import ProviderInfo from "./components/ProviderInfo";
import Verification from "./components/Verification";
import EditProviderInfo from "./components/EditProviderInfo";
import ProviderInbox from "./components/ProviderInbox";
import ProviderProfile from "./components/ProviderProfile";
import QuoteForm from "./components/QuoteForm";
import Services from "./components/Services";
import ServiceSearch from "./components/ServiceSearch";
import ProviderReview from "./components/ProviderReview";
import CustomerService from "./components/CustomerService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="ProviderDashboard" component={ProviderDashboard} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="UserPost" component={UserPost} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="UserInbox" component={UserInbox} />
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
        <Stack.Screen name="MyJobs" component={MyJobs} />
        <Stack.Screen name="ProviderInfo" component={ProviderInfo} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="EditProviderInfo" component={EditProviderInfo} />
        <Stack.Screen name="ProviderInbox" component={ProviderInbox} />
        <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
        <Stack.Screen name="QuoteForm" component={QuoteForm} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="ServiceSearch" component={ServiceSearch} />
        <Stack.Screen name="ProviderReview" component={ProviderReview} />
        <Stack.Screen name="CustomerService" component={CustomerService} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
