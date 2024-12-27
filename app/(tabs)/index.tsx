import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Plant Plan",
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Text style={styles.title}>Welcome to Plant Plan</Text>
      <Text style={styles.subtitle}>Your Personal Plant Care Assistant</Text>
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
