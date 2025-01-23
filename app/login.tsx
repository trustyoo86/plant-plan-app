import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Stack, useRouter } from 'expo-router';

export default function LoginScreen() {
  const { user, signInWithGoogle, signInWithFacebook, signInWithApple } = useAuth();
  const router = useRouter();

  // If user is already logged in, redirect to home
  if (user) {
    router.push('/(tabs)');
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/logo.svg')}
            style={styles.logo}
          />
          <Text style={styles.title}>Plant Plan</Text>
          <Text style={styles.subtitle}>Your Personal Plant Care Assistant</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={signInWithGoogle}
          >
            <Image
              source={require('../assets/images/google-logo.svg')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.facebookButton]}
            onPress={signInWithFacebook}
          >
            <Image
              source={require('../assets/images/facebook-logo.svg')}
              style={styles.buttonIcon}
            />
            <Text style={[styles.buttonText, styles.facebookButtonText]}>
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={[styles.button, styles.appleButton]}
              onPress={signInWithApple}
            >
              <Image
                source={require('../assets/images/apple-logo.svg')}
                style={styles.buttonIcon}
              />
              <Text style={[styles.buttonText, styles.appleButtonText]}>
                Continue with Apple
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleButton: {
    backgroundColor: '#fff',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  appleButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  facebookButtonText: {
    color: '#fff',
  },
  appleButtonText: {
    color: '#fff',
  },
  terms: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});
