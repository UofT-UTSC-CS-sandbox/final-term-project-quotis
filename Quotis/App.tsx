import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import ProviderDashboard from "./components/ProviderDashboard";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserDashboard">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="ProviderDashboard" component={ProviderDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
