import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const dark = useColorScheme() === 'dark';
  return (
      <NavigationContainer>
        <StatusBar style={dark ? 'light' : 'dark'} />
        <AppNavigator />
      </NavigationContainer>
  );
}