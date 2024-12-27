import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Plant Plan</Text>
    </View>
  );
};

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

export default Home;
