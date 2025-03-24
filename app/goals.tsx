
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import NeomorphBox from '../components/NeomorphBox';
import AddGoalModal from '../components/AddGoalModal';
import ProgressCircle from '../components/ProgressCircle';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
}

const CURRENT_PLAN = {
  title: 'Bible in a Year',
  startDate: '2024-01-01',
  totalDays: 365,
  completedDays: 15,
  frequency: 'Daily',
  nextReading: 'Genesis 16-18',
  streak: 15,
};

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
  const [modalVisible, setModalVisible] = useState(false);
  const progress = (CURRENT_PLAN.completedDays / CURRENT_PLAN.totalDays) * 100;

  const handleAddGoal = (newGoal: { title: string; target: number; deadline: string }) => {
    setGoals(prevGoals => [
      ...prevGoals,
      {
        id: (prevGoals.length + 1).toString(),
        ...newGoal,
        current: 0
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Reading Goals</Text>
      </LinearGradient>

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

        <NeomorphBox style={styles.readingSection}>
          <Text style={styles.sectionTitle}>Daily Readings</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendarView}>
            {[...Array(7)].map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() + index);
              return (
                <View key={index} style={styles.dateCard}>
                  <Text style={styles.dayText}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
                  <Text style={styles.dateText}>{date.getDate()}</Text>
                  <Text style={styles.readingText}>
                    {index === 0 ? 'Genesis 16-18' : 
                     index === 1 ? 'Genesis 19-20' :
                     index === 2 ? 'Genesis 21-23' :
                     index === 3 ? 'Genesis 24-25' :
                     'Genesis 26-27'}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.listView}>
            <Text style={styles.listTitle}>Upcoming Readings</Text>
            {[...Array(5)].map((_, index) => (
              <View key={index} style={styles.readingItem}>
                <TouchableOpacity style={styles.checkbox}>
                  <Ionicons name="square-outline" size={24} color={Colors.textSecondary} />
                </TouchableOpacity>
                <View style={styles.readingDetails}>
                  <Text style={styles.readingDay}>Day {CURRENT_PLAN.completedDays + index + 1}</Text>
                  <Text style={styles.readingText}>Genesis {16 + (index * 2)}-{17 + (index * 2)}</Text>
                </View>
              </View>
            ))}
          </View>
        </NeomorphBox>

        <TouchableOpacity 
          style={styles.addGoalButton}
          onPress={() => setModalVisible(true)}
        >
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

      <AddGoalModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddGoal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  readingSection: {
    marginVertical: 15,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 15,
  },
  calendarView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateCard: {
    width: 100,
    padding: 10,
    marginRight: 10,
    backgroundColor: Colors.card,
    borderRadius: 10,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginVertical: 5,
  },
  listView: {
    marginTop: 10,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  readingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  checkbox: {
    marginRight: 10,
  },
  readingDetails: {
    flex: 1,
  },
  readingDay: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  readingText: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 2,
  },
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
