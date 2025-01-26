import React, { createContext, useState, useContext, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import { makeRedirectUri } from 'expo-auth-session';
import { Platform } from 'react-native';
import { User } from '../types';
import Config from 'react-native-config';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Config.GOOGLE_WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
    redirectUri: makeRedirectUri({
      scheme: 'plantplanapp', // Make sure this matches your app's deep link scheme
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication) {
        fetchGoogleUserInfo(authentication.accessToken);
      }
    }
  }, [response]);

  const fetchGoogleUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );
      const userInfo = await response.json();
      setUser({
        id: userInfo.id,
        email: userInfo.email,
        displayName: userInfo.name,
        photoURL: userInfo.picture,
      });
    } catch (error) {
      console.error('Error fetching Google user info:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await promptAsync();
      if (result.type !== 'success') {
        throw new Error('Google Sign-In failed');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const signInWithApple = async () => {
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
          email: credential.email || '',
          displayName: credential.fullName?.givenName
            ? `${credential.fullName.givenName} ${credential.fullName.familyName || ''}`
            : undefined,
          photoURL: undefined,
        });
      }
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
    }
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
