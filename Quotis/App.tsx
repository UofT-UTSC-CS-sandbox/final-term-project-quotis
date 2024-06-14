import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import Profile from './components/Profile'; 
import UserInfo from './components/UserInfo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="ProviderDashboard" component={ProviderDashboard} />
        {/* 다른 화면들도 여기에 추가 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
