
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import ActivityIcon from '../components/ActivityIcon';

export default function AddHabitScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('5');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const activities = [
    { id: '1', name: 'barbell-outline', label: 'Gym' },
    { id: '2', name: 'fitness-outline', label: 'Fitness' },
    { id: '3', name: 'bicycle-outline', label: 'Cycling' },
    { id: '4', name: 'boat-outline', label: 'Swimming' },
    { id: '5', name: 'walk-outline', label: 'Walking' },
    { id: '6', name: 'body-outline', label: 'Yoga' },
    { id: '7', name: 'water-outline', label: 'Drinking' },
    { id: '8', name: 'fast-food-outline', label: 'Eating' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.header}
      >
        <Button 
          title="←" 
          onPress={() => router.back()} 
          style={styles.backButton}
          textStyle={styles.backButtonText}
          gradient={false}
        />
        <Text style={styles.headerTitle}>Add Habit</Text>
      </LinearGradient>
      
      <ScrollView style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Habit Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter Habit Title"
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Choose an Activity</Text>
          <View style={styles.activitiesContainer}>
            {activities.map(activity => (
              <ActivityIcon
                key={activity.id}
                name={activity.name as any}
                label={activity.label}
                isSelected={selectedActivity === activity.id}
                onPress={() => setSelectedActivity(activity.id)}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select a goal</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.sliderLabelContainer}>
              <Text style={styles.sliderValue}>{duration} min</Text>
            </View>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: `${parseInt(duration) * 2}%` }]} />
              <View style={styles.sliderThumb} />
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Add Habit" 
          onPress={() => {
            // Save habit logic here
            router.back();
          }} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 0,
  },
  backButtonText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sliderContainer: {
    marginTop: 15,
  },
  sliderLabelContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    position: 'relative',
  },
  sliderFill: {
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: -6,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
});
