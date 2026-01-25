import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import ReportIncidentScreen from '../screens/ReportIncidentScreen';
import FloodAlertsScreen from '../screens/FloodAlertsScreen';
import FloodRiskMapScreen from '../screens/FloodRiskMapScreen';
import SafetyTipsScreen from '../screens/SafetyTipsScreen';
import LiveFloodMapScreen from '../screens/LiveFloodMapScreen';
import { Ionicons } from '@expo/vector-icons'; // Assuming Expo
import { Text } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Reports') {
                        iconName = focused ? 'document-text' : 'document-text-outline';
                    } else if (route.name === 'Map') {
                        iconName = focused ? 'map' : 'map-outline';
                    } else if (route.name === 'More') {
                        iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#003366',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Reports" component={FloodAlertsScreen} options={{ title: 'Alerts' }} />
            <Tab.Screen name="Map" component={LiveFloodMapScreen} />
            <Tab.Screen name="More" component={SafetyTipsScreen} />
        </Tab.Navigator>
    );
}

export default function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ReportIncident" component={ReportIncidentScreen} options={{ title: 'Report Flood Incident', headerStyle: { backgroundColor: '#003366' }, headerTintColor: '#fff' }} />
            <Stack.Screen name="SafetyTips" component={SafetyTipsScreen} options={{ title: 'Safety Tips' }} />
            <Stack.Screen name="RiskMap" component={FloodRiskMapScreen} options={{ title: 'Flood Risk Map' }} />
        </Stack.Navigator>
    );
}
