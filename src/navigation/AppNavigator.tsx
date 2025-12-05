import React, { FC, useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authStack, dashboardStack } from './ScreenCollections';

const Stack = createNativeStackNavigator();

const MainNavigator: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = false;
      setIsAuthenticated(authStatus);
    };

    checkAuthStatus();
  }, []);

  const currentStack = isAuthenticated ? dashboardStack : authStack;

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      {currentStack.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default MainNavigator;
