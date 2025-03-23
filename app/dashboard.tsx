
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import ProgressCircle from '../components/ProgressCircle';
import NeomorphBox from '../components/NeomorphBox';
import NavigationBar from '../components/NavigationBar';

const DAILY_VERSE = {
  text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
  reference: "Joshua 1:9"
};

export default function DashboardScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(35);
  const [streakCount, setStreakCount] = useState(7);
  const [chaptersRead, setChaptersRead] = useState(42);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.gradient}
      >
        <NeomorphBox style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.date}>{currentDate}</Text>
              <Text style={styles.greeting}>Welcome, John</Text>
            </View>
          </View>
          <View style={styles.verseContainer}>
            <Text style={styles.verseText}>"{DAILY_VERSE.text}"</Text>
            <Text style={styles.verseReference}>- {DAILY_VERSE.reference}</Text>
          </View>
        </NeomorphBox>

        <View style={styles.progressSection}>
          <ProgressCircle progress={progress} />
          <Text style={styles.progressLabel}>Bible Reading Progress</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/books-and-chapters')}
          >
            <Ionicons name="book-outline" size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Continue Reading</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/book-chapters')}
          >
            <Ionicons name="checkbox-outline" size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Log Chapter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/journal')}
          >
            <Ionicons name="create-outline" size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Write Reflection</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <NeomorphBox style={styles.statBox}>
            <Ionicons name="flame" size={24} color={Colors.secondary} />
            <Text style={styles.statCount}>{streakCount}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </NeomorphBox>

          <NeomorphBox style={styles.statBox}>
            <Ionicons name="library" size={24} color={Colors.secondary} />
            <Text style={styles.statCount}>{chaptersRead}</Text>
            <Text style={styles.statLabel}>Chapters Read</Text>
          </NeomorphBox>
        </View>

        <NeomorphBox style={styles.remindersContainer}>
          <Text style={styles.reminderTitle}>Today's Reading Reminder</Text>
          <View style={styles.reminderItem}>
            <Ionicons name="time-outline" size={20} color={Colors.secondary} />
            <Text style={styles.reminderText}>8:00 PM - Daily Bible Reading</Text>
          </View>
        </NeomorphBox>
      </LinearGradient>

      <NavigationBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 5,
  },
  verseContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.cardHighlight,
    borderRadius: 10,
  },
  verseText: {
    fontSize: 14,
    color: Colors.text,
    fontStyle: 'italic',
  },
  verseReference: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 5,
    textAlign: 'right',
  },
  progressSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressLabel: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionText: {
    color: Colors.text,
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    alignItems: 'center',
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  remindersContainer: {
    padding: 15,
    borderRadius: 15,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardHighlight,
    padding: 10,
    borderRadius: 10,
  },
  reminderText: {
    marginLeft: 10,
    color: Colors.text,
    fontSize: 14,
  },
});
