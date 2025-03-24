import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import Colors from '../constants/Colors';

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => router.push('/dashboard')}
      >
        <Ionicons 
          name="home-outline" 
          size={24} 
          color={pathname === '/dashboard' ? Colors.primary : Colors.textSecondary} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => router.push('/journal')}
      >
        <Ionicons 
          name="journal-outline" 
          size={24} 
          color={pathname === '/journal' ? Colors.primary : Colors.textSecondary} 
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push('/goals')}
      >
        <Ionicons
          name={pathname === '/goals' ? 'trophy' : 'trophy-outline'}
          size={24}
          color={pathname === '/goals' ? Colors.primary : Colors.textSecondary}
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => router.push('/planner')} // Added planner navigation
      >
        <Ionicons 
          name="calendar-outline" 
          size={24} 
          color={pathname === '/planner' ? Colors.primary : Colors.textSecondary} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/add-habit')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => router.push('/books-and-chapters')}
      >
        <Ionicons 
          name="book-outline" 
          size={24} 
          color={pathname === '/books-and-chapters' ? Colors.primary : Colors.textSecondary} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => router.push('/profile')}
      >
        <Ionicons 
          name="person-outline" 
          size={24} 
          color={pathname === '/profile' ? Colors.primary : Colors.textSecondary} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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