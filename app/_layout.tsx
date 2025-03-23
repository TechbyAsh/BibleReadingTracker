
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <LinearGradient
          colors={['#87CEEB', '#B0E0E6', '#FFD700']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.background}
        >
          <Stack
            screenOptions={{
              headerShown: true,
              contentStyle: { backgroundColor: 'transparent' },
              animation: 'slide_from_right',
              animationDuration: 200,
              headerStyle: { backgroundColor: Colors.primary },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="dashboard" options={{ title: 'Dashboard', headerShown: false }} />
            <Stack.Screen name="add-habit" options={{ title: 'Add Habit' }} />
            <Stack.Screen name="journal" options={{ title: 'Bible Journal' }} />
            <Stack.Screen name="books-and-chapters" options={{ title: 'Bible Reading' }} />
            <Stack.Screen name="goals" options={{ title: 'Reading Goals' }} />
            <Stack.Screen name="profile" options={{ title: 'Profile' }} />
          </Stack>
        </LinearGradient>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
