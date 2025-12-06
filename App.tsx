import React from 'react';
import Navigation from './src/navigation/Navigation';
import { Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        translucent={Platform.OS === 'ios'}
        backgroundColor="transparent"
      />

      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;
