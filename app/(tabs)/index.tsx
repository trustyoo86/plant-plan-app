import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const CustomHeader: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.headerTitle}>Plant Plan</Text>
          <Text style={styles.headerSubtitle}>
            Good morning{user?.displayName ? `, ${user.displayName}` : ''}!
          </Text>
        </View>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : { uri: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg' }
            }
            style={styles.avatar}
          />
          <View style={styles.avatarBadge} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

interface PlantCardProps {
  id: number;
  name: string;
}

const PlantCard: React.FC<PlantCardProps> = ({ id, name }) => (
  <View key={id} style={styles.plantCard}>
    <View style={styles.plantImagePlaceholder} />
    <Text style={styles.plantName}>{name}</Text>
  </View>
);

interface TaskItemProps {
  id: number;
  name: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, name }) => (
  <View key={id} style={styles.taskItem}>
    <Ionicons name="water-outline" size={24} color="#4CAF50" />
    <Text style={styles.taskText}>{name}</Text>
  </View>
);

export default function TabHomeScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <CustomHeader />,
          headerShown: true,
        }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Plants</Text>
          <View style={styles.plantGrid}>
            {[1, 2, 3, 4].map((id) => (
              <PlantCard key={id} id={id} name={`Plant ${id}`} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          {[1, 2, 3].map((id) => (
            <TaskItem key={id} id={id} name={`Water Plant ${id}`} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  avatarContainer: {
    position: 'relative',
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  plantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  plantCard: {
    width: '50%',
    padding: 8,
  },
  plantImagePlaceholder: {
    backgroundColor: '#e0e0e0',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  plantName: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});
