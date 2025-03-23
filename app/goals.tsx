
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import NeomorphBox from '../components/NeomorphBox';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
}

export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Read New Testament',
      target: 260,
      current: 45,
      deadline: '2024-12-31'
    },
    {
      id: '2',
      title: 'Daily Reading Streak',
      target: 30,
      current: 7,
      deadline: '2024-03-01'
    }
  ]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Reading Goals</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.addGoalButton}>
          <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
          <Text style={styles.addGoalText}>Add New Goal</Text>
        </TouchableOpacity>

        {goals.map(goal => (
          <NeomorphBox key={goal.id} style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.deadline}>Due: {goal.deadline}</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(goal.current / goal.target) * 100}%` }
                ]} 
              />
            </View>
            <View style={styles.goalStats}>
              <Text style={styles.statsText}>
                Progress: {goal.current}/{goal.target}
              </Text>
              <Text style={styles.statsText}>
                {Math.round((goal.current / goal.target) * 100)}% Complete
              </Text>
            </View>
          </NeomorphBox>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 15,
  },
  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  addGoalText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  goalCard: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  deadline: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  goalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statsText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
