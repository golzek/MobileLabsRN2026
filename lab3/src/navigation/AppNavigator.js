import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen     from '../screens/HomeScreen';
import QuestsScreen   from '../screens/QuestsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTheme }   from '../context/ThemeContext';
import { useGame }    from '../context/GameContext';

const Tab = createBottomTabNavigator();

function TabIcon({ emoji, focused, theme }) {
    return (
        <Text style={{ fontSize: focused ? 24 : 20, opacity: focused ? 1 : 0.5 }}>
            {emoji}
        </Text>
    );
}

export default function AppNavigator() {
    const { theme }  = useTheme();
    const { quests } = useGame();
    const doneCnt    = quests.filter(q => q.done).length;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.tabBg,
                    borderTopColor:  theme.tabBorder,
                    borderTopWidth:  1,
                    height: 64,
                    paddingBottom: 10,
                    paddingTop: 6,
                },
                tabBarActiveTintColor:   theme.tabActive,
                tabBarInactiveTintColor: theme.tabInactive,
                tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Гра',
                    tabBarIcon: ({ focused }) => <TabIcon emoji="🎮" focused={focused} theme={theme} />,
                }}
            />
            <Tab.Screen
                name="Quests"
                component={QuestsScreen}
                options={{
                    title: 'Завдання',
                    tabBarIcon: ({ focused }) => <TabIcon emoji="📋" focused={focused} theme={theme} />,
                    tabBarBadge: doneCnt > 0 ? doneCnt : undefined,
                    tabBarBadgeStyle: { backgroundColor: theme.success, color: '#fff', fontSize: 10 },
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Налаштування',
                    tabBarIcon: ({ focused }) => <TabIcon emoji="⚙️" focused={focused} theme={theme} />,
                }}
            />
        </Tab.Navigator>
    );
}