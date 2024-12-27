import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Text style={styles.title}>Settings Page</Text>
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
  },
});
