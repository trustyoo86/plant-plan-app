export interface User {
  id: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
}

export interface AuthResponse {
  type: 'success' | 'error';
  authentication?: {
    accessToken: string;
    idToken?: string;
  };
}

export interface MenuItem {
  icon: string;
  title: string;
  onPress?: () => void;
}
