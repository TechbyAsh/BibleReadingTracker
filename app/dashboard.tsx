import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import { ACHIEVEMENTS } from '../constants/Achievements';
import ProgressCircle from '../components/ProgressCircle';
import NeomorphBox from '../components/NeomorphBox';
import NavigationBar from '../components/NavigationBar';

export default function DashboardScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(35);

  const readings = [
    { id: '1', title: 'Genesis 1-3', completed: true, icon: 'book-outline' },
    { id: '2', title: 'Psalms 1-5', completed: false, pending: true, icon: 'book-outline' },
    { id: '3', title: 'Matthew 1-2', completed: false, icon: 'book-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.gradient}
      >
        <NeomorphBox style={styles.headerContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Welcome Back 🙏</Text>
              <Text style={styles.username}>Daily Bible Reading</Text>
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
          <View style={styles.progressContainer}>
            <ProgressCircle progress={progress} />
            <Text style={styles.progressLabel}>Bible Reading Progress</Text>
          </View>
          <View style={styles.streakContainer}>
            <NeomorphBox style={styles.streakBox}>
              <Ionicons name="flame" size={24} color={Colors.secondary} />
              <Text style={styles.streakCount}>7</Text>
              <Text style={styles.streakLabel}>Day Streak</Text>
            </NeomorphBox>
          </View>
        </View>

        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ACHIEVEMENTS.map(achievement => (
              <NeomorphBox key={achievement.id} style={styles.achievementCard}>
                <View style={[styles.achievementIcon, !achievement.unlocked && styles.achievementLocked]}>
                  <Ionicons 
                    name={achievement.icon as any} 
                    size={24} 
                    color={achievement.unlocked ? Colors.secondary : Colors.textSecondary} 
                  />
                </View>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.achievementLockedText
                ]}>
                  {achievement.title}
                </Text>
              </NeomorphBox>
            ))}
          </ScrollView>
        </View>

        <View style={styles.glassCard}>
          <Text style={styles.sectionTitle}>Today's Reading Plan</Text>
          <ScrollView style={styles.readingList}>
            {readings.map(reading => (
              <TouchableOpacity key={reading.id} style={styles.readingItem}>
                <Ionicons 
                  name={reading.completed ? "checkmark-circle" : "book-outline"} 
                  size={24} 
                  color={reading.completed ? Colors.success : Colors.primary} 
                />
                <Text style={styles.readingText}>{reading.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>

      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  streakContainer: {
    marginTop: 20,
  },
  streakBox: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
  },
  streakCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginTop: 5,
  },
  streakLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  achievementsContainer: {
    marginTop: 20,
  },
  achievementCard: {
    padding: 15,
    marginRight: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: 100,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.text,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementLockedText: {
    color: Colors.textSecondary,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: Colors.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  glassCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    backdropFilter: 'blur(10px)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  readingList: {
    maxHeight: 200,
  },
  readingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardHighlight,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  readingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
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