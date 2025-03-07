import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import ProgressCircle from '../components/ProgressCircle';
import HabitCard from '../components/HabitCard';
import NeomorphBox from '../components/NeomorphBox';
import GlowingIcon from '../components/GlowingIcon'; // Placeholder for GlowingIcon component

export default function DashboardScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(78);
  const [activeTab, setActiveTab] = useState('dashboard'); // Added state for active tab

  const habits = [
    { id: '1', title: 'Night Sleep', time: '06:00 AM', completed: true, icon: 'bed-outline' },
    { id: '2', title: 'Morning Walk', time: '07:00 AM', completed: false, pending: true, icon: 'walk-outline' },
    { id: '3', title: 'Cycling', time: '05:00 PM', completed: false, icon: 'bicycle-outline' },
  ];

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'journal':
        router.push('/journal');
        break;
      case 'routines':
        router.push('/routines');
        break;
      case 'profile':
        router.push('/profile');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <NeomorphBox style={styles.headerContainer}>
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
      </NeomorphBox>

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
        <View style={styles.tabBar}> {/* Added TabBar */}
          <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress('dashboard')}>
            <GlowingIcon 
              name="grid-outline" 
              size={24} 
              active={activeTab === 'dashboard'} 
              color={Colors.textSecondary} 
            />
            <Text style={[styles.tabLabel, activeTab === 'dashboard' && styles.activeTabLabel]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress('routines')}>
            <GlowingIcon 
              name="calendar-outline" 
              size={24} 
              active={activeTab === 'routines'} 
              color={Colors.textSecondary} 
            />
            <Text style={[styles.tabLabel, activeTab === 'routines' && styles.activeTabLabel]}>Routines</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress('journal')}>
            <GlowingIcon 
              name="book-outline" 
              size={24} 
              active={activeTab === 'journal'} 
              color={Colors.textSecondary} 
            />
            <Text style={[styles.tabLabel, activeTab === 'journal' && styles.activeTabLabel]}>Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress('profile')}>
            <GlowingIcon 
              name="person-outline" 
              size={24} 
              active={activeTab === 'profile'} 
              color={Colors.textSecondary} 
            />
            <Text style={[styles.tabLabel, activeTab === 'profile' && styles.activeTabLabel]}>Profile</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/add-habit')}
        >
          <GlowingIcon name="add" size={30} active={true} /> {/* Added GlowingIcon */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    padding: 15,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.neomorphismShadowLight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.neomorphismShadowDark,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  statsContainer: {
    marginTop: 10,
  },
  statItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: 'center',
    padding: 5,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  habitsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
  },
  habitsContainer: {
    flex:1
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex:1,
    paddingHorizontal: 20,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  activeTabLabel: {
    color: Colors.primary,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.neomorphismShadowLight,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.neomorphismShadowDark,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonIcon:{
    color: '#fff'
  }

});