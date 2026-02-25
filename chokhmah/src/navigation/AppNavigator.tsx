import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, SPACING, TYPOGRAPHY, LAYOUT, SHADOWS } from '../constants/theme';

import { HomeScreen } from '../screens/HomeScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SolomonsVoiceScreen } from '../screens/SolomonsVoiceScreen';
import { BookDetailScreen } from '../screens/BookDetailScreen';
import { ReaderScreen } from '../screens/ReaderScreen';

import { RootStackParamList, RootTabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_ICONS: Record<keyof RootTabParamList, { active: string; inactive: string }> = {
  Home: { active: '🏠', inactive: '🏡' },
  Library: { active: '📚', inactive: '📖' },
  Explore: { active: '🧭', inactive: '🔍' },
  Progress: { active: '📊', inactive: '📈' },
  Profile: { active: '👤', inactive: '👤' },
};

function TabIcon({ routeName, focused }: { routeName: keyof RootTabParamList; focused: boolean }) {
  const icons = TAB_ICONS[routeName];
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>
        {focused ? icons.active : icons.inactive}
      </Text>
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon routeName={route.name as keyof RootTabParamList} focused={focused} />
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={[
            styles.tabLabel,
            { color: focused ? COLORS.primary : COLORS.textMuted },
          ]}>
            {route.name}
          </Text>
        ),
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="SolomonsVoice" component={SolomonsVoiceScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="Reader" component={ReaderScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.backgroundCard,
    borderTopColor: COLORS.divider,
    borderTopWidth: 1,
    height: LAYOUT.tabBarHeight,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabIconContainer: {
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 2,
  },
  tabLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    lineHeight: 14,
  },
});
