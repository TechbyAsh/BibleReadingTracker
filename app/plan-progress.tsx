
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import NeomorphBox from '../components/NeomorphBox';
import NavigationBar from '../components/NavigationBar';
import ProgressCircle from '../components/ProgressCircle';

// Mock data - replace with actual data storage later
const CURRENT_PLAN = {
  title: 'Bible in a Year',
  startDate: '2024-01-01',
  totalDays: 365,
  completedDays: 15,
  frequency: 'Daily',
  nextReading: 'Genesis 16-18',
  streak: 15,
};

export default function PlanProgressScreen() {
  const progress = (CURRENT_PLAN.completedDays / CURRENT_PLAN.totalDays) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Reading Plan Progress</Text>
        </View>

        <ScrollView style={styles.content}>
          <NeomorphBox style={styles.planCard}>
            <Text style={styles.planTitle}>{CURRENT_PLAN.title}</Text>
            <View style={styles.progressSection}>
              <ProgressCircle progress={progress} />
              <View style={styles.progressDetails}>
                <Text style={styles.progressText}>
                  {CURRENT_PLAN.completedDays} of {CURRENT_PLAN.totalDays} days
                </Text>
                <Text style={styles.frequencyText}>
                  {CURRENT_PLAN.frequency} Reading
                </Text>
              </View>
            </View>
          </NeomorphBox>

          <NeomorphBox style={styles.statsCard}>
            <View style={styles.statItem}>
              <Ionicons name="flame" size={24} color={Colors.secondary} />
              <Text style={styles.statValue}>{CURRENT_PLAN.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Ionicons name="calendar" size={24} color={Colors.secondary} />
              <Text style={styles.statValue}>
                {CURRENT_PLAN.totalDays - CURRENT_PLAN.completedDays}
              </Text>
              <Text style={styles.statLabel}>Days Left</Text>
            </View>
          </NeomorphBox>

          <NeomorphBox style={styles.upNextCard}>
            <Text style={styles.upNextTitle}>Up Next</Text>
            <Text style={styles.upNextText}>{CURRENT_PLAN.nextReading}</Text>
          </NeomorphBox>
        </ScrollView>
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
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  planCard: {
    padding: 20,
    marginBottom: 15,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 15,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  progressDetails: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 5,
  },
  frequencyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsCard: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 15,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: Colors.textSecondary,
    opacity: 0.2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  upNextCard: {
    padding: 20,
  },
  upNextTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  upNextText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
