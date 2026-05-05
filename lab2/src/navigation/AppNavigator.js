import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function NewsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={({ route }) => ({

                    title: route.params?.newsItem?.title ?? 'Деталі',
                    headerShown: false,
                })}
            />
        </Stack.Navigator>
    );
}


export default function AppNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: { width: 280 },
                swipeEdgeWidth: 50,
            }}
        >
            <Drawer.Screen name="NewsStack" component={NewsStack} />
            <Drawer.Screen name="Contacts" component={ContactsScreen} />
        </Drawer.Navigator>
    );
}