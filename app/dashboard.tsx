import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import ProgressCircle from '../components/ProgressCircle';
import HabitCard from '../components/HabitCard';

export default function DashboardScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(78);

  const habits = [
    { id: '1', title: 'Night Sleep', time: '06:00 AM', completed: true, icon: 'bed-outline' },
    { id: '2', title: 'Morning Walk', time: '07:00 AM', completed: false, pending: true, icon: 'walk-outline' },
    { id: '3', title: 'Cycling', time: '05:00 PM', completed: false, icon: 'bicycle-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Day 👋</Text>
          <Text style={styles.username}>John D.</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-circle-outline" size={40} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItems}>
          <View style={styles.statItem}>
            <Ionicons name="bed-outline" size={20} color={Colors.primary} />
            <Text style={styles.statLabel}>Sleep</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="walk-outline" size={20} color="#FF84B7" />
            <Text style={styles.statLabel}>Walking</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="bicycle-outline" size={20} color="#6A7BFF" />
            <Text style={styles.statLabel}>Cycling</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <ProgressCircle percentage={progress} />
        </View>
      </View>

      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.habitsHeaderContainer}
      >
        <Text style={styles.habitsHeader}>Today's Habits</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.habitsContainer}>
        {habits.map(habit => (
          <HabitCard 
            key={habit.id}
            title={habit.title}
            time={habit.time}
            isCompleted={habit.completed}
            isPending={habit.pending}
            icon={habit.icon as any}
            onPress={() => {}}
          />
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="grid-outline" size={24} color={Colors.primary} />
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
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/routines')}
        >
          <Ionicons name="calendar-outline" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-outline" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  statItems: {
    flex: 1,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.text,
  },
  progressContainer: {
    alignItems: 'center',
  },
  habitsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 15,
  },
  habitsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  habitsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 15,
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