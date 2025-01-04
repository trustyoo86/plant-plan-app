import React, { createContext, useState, useContext, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import { makeRedirectUri } from 'expo-auth-session';
import { Platform } from 'react-native';
import { User } from '../types';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthError {
  code?: string;
  message: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Replace these with your actual client IDs
const GOOGLE_CLIENT_ID = "your-google-client-id";
const FACEBOOK_APP_ID = "your-facebook-app-id";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [request, response, promptGoogleAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_CLIENT_ID,
    iosClientId: GOOGLE_CLIENT_ID,
    redirectUri: makeRedirectUri({
      scheme: 'your-scheme'
    }),
  });

  const [fbRequest, fbResponse, promptFacebookAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
    redirectUri: makeRedirectUri({
      scheme: 'your-scheme'
    }),
  });

  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      // Check for stored credentials
      setIsLoading(false);
    } catch (error: unknown) {
      const authError = error as AuthError;
      console.error('Error checking auth:', authError.message);
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const response = await promptGoogleAsync();
      if (response?.type === 'success') {
        const { authentication } = response;
        // Handle the authentication token
        console.log('Google auth success:', authentication);
        setUser({
          id: 'temp-id',
          email: 'temp@email.com',
          displayName: 'Temp User',
        });
      }
    } catch (error: unknown) {
      const authError = error as AuthError;
      console.error('Google sign in error:', authError.message);
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      const response = await promptFacebookAsync();
      if (response?.type === 'success') {
        const { authentication } = response;
        console.log('Facebook auth success:', authentication);
        setUser({
          id: 'temp-id',
          email: 'temp@email.com',
          displayName: 'Temp User',
        });
      }
    } catch (error: unknown) {
      const authError = error as AuthError;
      console.error('Facebook sign in error:', authError.message);
      throw error;
    }
  };

  const signInWithApple = async () => {
    if (Platform.OS !== 'ios') {
      throw new Error('Apple Sign In is only available on iOS devices');
    }

    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      
      if (credential) {
        setUser({
          id: credential.user,
          email: credential.email || undefined,
          displayName: credential.fullName?.givenName 
            ? `${credential.fullName.givenName} ${credential.fullName.familyName || ''}`
            : undefined,
          photoURL: undefined,
        });
      }
    } catch (error: unknown) {
      const authError = error as AuthError;
      if (authError.code !== 'ERR_CANCELED') {
        console.error('Apple sign in error:', authError.message);
        throw error;
      }
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
    } catch (error: unknown) {
      const authError = error as AuthError;
      console.error('Sign out error:', authError.message);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
