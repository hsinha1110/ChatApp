import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamsList';
import ScreenName from '../constants/ScreenNames';
import SplashScreen from '../screens/auth/splash/SplashScreen';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import UsersScreen from '../screens/app/users/UsersScreen';
import ChatScreen from '../screens/app/chats/ChatScreen';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenName.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={ScreenName.LoginScreen} component={LoginScreen} />
      <Stack.Screen
        name={ScreenName.RegisterScreen}
        component={RegisterScreen}
      />
      <Stack.Screen name={ScreenName.UsersScreen} component={UsersScreen} />
      <Stack.Screen name={ScreenName.ChatScreen} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
