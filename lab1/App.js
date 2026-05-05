import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import HomeScreen from './src/screens/Homescreen.js';
import ProfileScreen from './src/screens/Profilescreen.js';
import GalleryScreen from './src/screens/Galleryscreen.js';
import DetailsScreen from './src/screens/Detailsscreen.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ name, focused }) {
  const icons = {
    Home: focused ? '🏠' : '🏡',
    Gallery: focused ? '🖼️' : '🖼',
    Profile: focused ? '👤' : '👥',
  };
  return <Text style={{ fontSize: 22 }}>{icons[name]}</Text>;
}

function MainTabs() {
  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => (
                <TabIcon name={route.name} focused={focused} />
            ),
            tabBarActiveTintColor: '#4F46E5',
            tabBarInactiveTintColor: '#9CA3AF',
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopColor: '#E5E7EB',
              borderTopWidth: 1,
              height: 65,
              paddingBottom: 8,
              paddingTop: 6,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
            headerShown: false,
          })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Головна' }} />
        <Tab.Screen name="Gallery" component={GalleryScreen} options={{ title: 'Галерея' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профіль' }} />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}