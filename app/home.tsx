import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Home",
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
