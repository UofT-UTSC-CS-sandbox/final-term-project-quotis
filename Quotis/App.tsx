import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import CreatePost from './components/createPost';
import { RootStackParamList } from '../backend/src/models/types'; // types.ts 파일을 import 합니다.
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
        {/* 다른 화면들도 여기에 추가 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
