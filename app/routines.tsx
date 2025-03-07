
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import Colors from '../constants/Colors';
import HabitCard from '../components/HabitCard';

export default function RoutinesScreen() {
  const router = useRouter();
  const [activeRoutine, setActiveRoutine] = useState('morning');
  
  const [morningRoutine, setMorningRoutine] = useState([
    { id: '1', title: 'Wake Up', time: '06:00 AM', icon: 'sunny-outline' },
    { id: '2', title: 'Drink Water', time: '06:05 AM', icon: 'water-outline' },
    { id: '3', title: 'Morning Stretch', time: '06:15 AM', icon: 'body-outline' },
    { id: '4', title: 'Meditation', time: '06:30 AM', icon: 'flower-outline' },
  ]);
  
  const [eveningRoutine, setEveningRoutine] = useState([
    { id: '1', title: 'Evening Walk', time: '07:00 PM', icon: 'walk-outline' },
    { id: '2', title: 'Read Book', time: '09:00 PM', icon: 'book-outline' },
    { id: '3', title: 'Journal', time: '09:30 PM', icon: 'create-outline' },
    { id: '4', title: 'Sleep', time: '10:00 PM', icon: 'bed-outline' },
  ]);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={0.7}
          onLongPress={drag}
          delayLongPress={200}
          disabled={isActive}
          style={[
            styles.dragItem,
            isActive && { backgroundColor: 'rgba(0, 96, 214, 0.1)' }
          ]}
        >
          <HabitCard 
            title={item.title}
            time={item.time}
            icon={item.icon}
            onPress={() => {}}
          />
          <TouchableOpacity 
            onPressIn={drag} 
            style={styles.dragHandle}
          >
            <Ionicons name="menu-outline" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Routines</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/add-habit')}
        >
          <Text style={styles.addButtonText}>Add Habit</Text>
          <Ionicons name="add-circle" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.routineTypeContainer}>
        <TouchableOpacity 
          style={[
            styles.routineTypeButton, 
            activeRoutine === 'morning' && styles.activeRoutineType
          ]}
          onPress={() => setActiveRoutine('morning')}
        >
          <Ionicons name="sunny-outline" size={20} color={activeRoutine === 'morning' ? '#fff' : Colors.text} />
          <Text style={[
            styles.routineTypeText,
            activeRoutine === 'morning' && styles.activeRoutineTypeText
          ]}>Morning</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.routineTypeButton, 
            activeRoutine === 'evening' && styles.activeRoutineType
          ]}
          onPress={() => setActiveRoutine('evening')}
        >
          <Ionicons name="moon-outline" size={20} color={activeRoutine === 'evening' ? '#fff' : Colors.text} />
          <Text style={[
            styles.routineTypeText,
            activeRoutine === 'evening' && styles.activeRoutineTypeText
          ]}>Evening</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.timelineHeaderContainer}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.timelineHeader}
        >
          <View style={styles.timelineHeaderContent}>
            <Text style={styles.timelineTitle}>
              {activeRoutine === 'morning' ? 'Morning Routine' : 'Evening Routine'}
            </Text>
            <Text style={styles.timelineSubtitle}>
              Drag to reorder your habits
            </Text>
          </View>
        </LinearGradient>
      </View>
      
      <View style={styles.timelineContainer}>
        <DraggableFlatList
          data={activeRoutine === 'morning' ? morningRoutine : eveningRoutine}
          onDragEnd={({ data }) => {
            if (activeRoutine === 'morning') {
              setMorningRoutine(data);
            } else {
              setEveningRoutine(data);
            }
          }}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.timelineList}
        />
      </View>
      
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Routine</Text>
      </TouchableOpacity>
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 96, 214, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    marginRight: 5,
  },
  routineTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  routineTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    width: '48%',
    justifyContent: 'center',
  },
  activeRoutineType: {
    backgroundColor: Colors.primary,
  },
  routineTypeText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  activeRoutineTypeText: {
    color: '#fff',
  },
  timelineHeaderContainer: {
    paddingHorizontal: 20,
  },
  timelineHeader: {
    borderRadius: 15,
    marginBottom: 15,
  },
  timelineHeaderContent: {
    padding: 20,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  timelineSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  timelineContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timelineList: {
    paddingBottom: 20,
  },
  dragItem: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dragHandle: {
    padding: 10,
    marginLeft: -10,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
