import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import ProviderDashboard from "./components/ProviderDashboard";
import Profile from "./components/Profile";
import { RootStackParamList } from "./../backend/src/models/types";
import CreatePost from "./components/createPost";
import UserInfo from "./components/UserInfo";
import EditUserProfile from "./components/EditUserProfile"
import CustomerService from "./components/CustomerService"
import UserInbox from "./components/UserInbox";


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
        <Stack.Screen name="EditUserProfile" component={EditUserProfile} /> 
        <Stack.Screen name="CustomerService" component={CustomerService} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
