import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Profile",
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Manage your plant care profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
