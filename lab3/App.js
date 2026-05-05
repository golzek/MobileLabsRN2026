import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider as SCProvider } from 'styled-components/native';

import { GameProvider }  from './src/context/GameContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

function Inner() {
  const { theme, isDark } = useTheme();
  return (
      <SCProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <AppNavigator />
        </NavigationContainer>
      </SCProvider>
  );
}

export default function App() {
  return (
      <ThemeProvider>
        <GameProvider>
          <Inner />
        </GameProvider>
      </ThemeProvider>
  );
}