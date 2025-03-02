
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import Button from '../components/Button';

export default function ProfileScreen() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  
  // Dummy user data
  const user = {
    name: 'John D.',
    email: 'johndoe@example.com',
    joined: 'January 2023',
    streak: 28,
    totalHabits: 5,
    completionRate: 89
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => setEditMode(!editMode)}
        >
          <Ionicons name={editMode ? "checkmark" : "create-outline"} size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('../assets/images/icon.png')} 
              style={styles.profileImage}
            />
            {editMode && (
              <TouchableOpacity style={styles.changePhotoButton}>
                <Ionicons name="camera" size={18} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <Text style={styles.joinedDate}>Member since {user.joined}</Text>
        </View>

        <LinearGradient
          colors={[Colors.primary, Colors.primaryGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.statsContainer}
        >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.totalHabits}</Text>
            <Text style={styles.statLabel}>Habits</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.completionRate}%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </LinearGradient>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="notifications-outline" size={24} color={Colors.primary} />
            <Text style={styles.settingText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="time-outline" size={24} color={Colors.primary} />
            <Text style={styles.settingText}>Reminders</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="moon-outline" size={24} color={Colors.primary} />
            <Text style={styles.settingText}>Dark Mode</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="lock-closed-outline" size={24} color={Colors.primary} />
            <Text style={styles.settingText}>Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Log Out"
            onPress={() => router.push('/')}
            gradient={false}
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/dashboard')}
        >
          <Ionicons name="grid-outline" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/journal')}
        >
          <Ionicons name="book-outline" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/add-habit')}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  editButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  joinedDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 15,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    width: '100%',
  },
  logoutButtonText: {
    color: Colors.textSecondary,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navButton: {
    padding: 10,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});
