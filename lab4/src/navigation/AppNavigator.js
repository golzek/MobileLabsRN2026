import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

import HomeScreen     from '../screens/HomeScreen';
import ExplorerScreen from '../screens/ExplorerScreen';
import ViewerScreen   from '../screens/ViewerScreen';
import EditorScreen   from '../screens/EditorScreen';
import FileInfoScreen from '../screens/FileInfoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const dark = useColorScheme() === 'dark';

    const screenOptions = {
        headerStyle: { backgroundColor: dark ? '#1E293B' : '#FFFFFF' },
        headerTintColor: dark ? '#F1F5F9' : '#0F172A',
        headerTitleStyle: { fontWeight: '700', fontSize: 16 },
        contentStyle: { backgroundColor: dark ? '#0F172A' : '#F1F5F9' },
    };

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: '💾 Файловий менеджер' }}
            />
            <Stack.Screen
                name="Explorer"
                component={ExplorerScreen}
                options={{ title: 'Файли' }}
            />
            <Stack.Screen
                name="Viewer"
                component={ViewerScreen}
                options={{ title: 'Перегляд' }}
            />
            <Stack.Screen
                name="Editor"
                component={EditorScreen}
                options={{ title: 'Редактор' }}
            />
            <Stack.Screen
                name="FileInfo"
                component={FileInfoScreen}
                options={{ title: 'Властивості' }}
            />
        </Stack.Navigator>
    );
}