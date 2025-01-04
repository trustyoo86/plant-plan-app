import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#4CAF50" />
    <Text style={styles.menuText}>{title}</Text>
    <Ionicons name="chevron-forward" size={24} color="#ccc" />
  </TouchableOpacity>
);

export default function MenuScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Menu",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <MenuItem 
          icon="leaf-outline" 
          title="My Plants" 
          onPress={() => console.log('My Plants pressed')}
        />
        <MenuItem 
          icon="water-outline" 
          title="Watering Schedule" 
          onPress={() => console.log('Watering Schedule pressed')}
        />
        <MenuItem 
          icon="notifications-outline" 
          title="Notifications" 
          onPress={() => console.log('Notifications pressed')}
        />
        <MenuItem 
          icon="settings-outline" 
          title="Settings" 
          onPress={() => console.log('Settings pressed')}
        />
        <MenuItem 
          icon="help-circle-outline" 
          title="Help & Support" 
          onPress={() => console.log('Help & Support pressed')}
        />
        <MenuItem 
          icon="log-out-outline" 
          title="Sign Out" 
          onPress={signOut}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 16,
  },
});
