
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
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
  const [frequency, setFrequency] = useState('daily');
  const [isStacked, setIsStacked] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('default');

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

  const frequencyOptions = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'custom', label: 'Custom' },
  ];

  const themeOptions = [
    { id: 'default', color: Colors.primary, label: 'Default' },
    { id: 'health', color: '#FF84B7', label: 'Health' },
    { id: 'productivity', color: '#6A7BFF', label: 'Productivity' },
    { id: 'mindfulness', color: '#6FCF97', label: 'Mindfulness' },
  ];

  const routineOptions = [
    { id: 'morning', label: 'Morning Routine' },
    { id: 'evening', label: 'Evening Routine' },
    { id: 'none', label: 'No Routine' },
  ];

  const [selectedRoutine, setSelectedRoutine] = useState('none');

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

        {/* Frequency Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Frequency</Text>
          <View style={styles.optionsContainer}>
            {frequencyOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  frequency === option.id && styles.selectedOption
                ]}
                onPress={() => setFrequency(option.id)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    frequency === option.id && styles.selectedOptionText
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Theme Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Habit Theme</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.themeContainer}
          >
            {themeOptions.map(theme => (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.themeCircle,
                  { backgroundColor: theme.color },
                  selectedTheme === theme.id && styles.selectedThemeCircle
                ]}
                onPress={() => setSelectedTheme(theme.id)}
              >
                {selectedTheme === theme.id && (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.themeLabels}>
            {themeOptions.map(theme => (
              <Text 
                key={theme.id} 
                style={[
                  styles.themeLabel,
                  selectedTheme === theme.id && { color: theme.color }
                ]}
              >
                {theme.label}
              </Text>
            ))}
          </View>
        </View>

        {/* Habit Stacking */}
        <View style={styles.inputGroup}>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Add to Routine</Text>
            <Switch
              value={isStacked}
              onValueChange={setIsStacked}
              trackColor={{ false: '#D9D9D9', true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          {isStacked && (
            <View style={styles.stackOptions}>
              <Text style={styles.stackSubLabel}>Select Routine</Text>
              <View style={styles.optionsContainer}>
                {routineOptions.map(routine => (
                  <TouchableOpacity
                    key={routine.id}
                    style={[
                      styles.optionButton,
                      selectedRoutine === routine.id && styles.selectedOption
                    ]}
                    onPress={() => setSelectedRoutine(routine.id)}
                  >
                    <Text 
                      style={[
                        styles.optionText,
                        selectedRoutine === routine.id && styles.selectedOptionText
                      ]}
                    >
                      {routine.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {selectedRoutine !== 'none' && (
                <View style={styles.routineBuilder}>
                  <Text style={styles.stackSubLabel}>Drag to arrange in your routine</Text>
                  <View style={styles.timelineContainer}>
                    <View style={styles.timelineLine} />
                    <View style={styles.timelineItem}>
                      <View style={styles.timelineDot} />
                      <View style={styles.timelineContent}>
                        <Text style={styles.timelineText}>Wake Up</Text>
                      </View>
                    </View>
                    <View style={styles.timelineItem}>
                      <View style={styles.timelineDot} />
                      <View style={[styles.timelineContent, styles.timelineContentActive]}>
                        <Text style={styles.timelineTextActive}>New Habit</Text>
                        <Ionicons name="menu" size={18} color="#666" />
                      </View>
                    </View>
                    <View style={styles.timelineItem}>
                      <View style={styles.timelineDot} />
                      <View style={styles.timelineContent}>
                        <Text style={styles.timelineText}>Breakfast</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    color: Colors.text,
    fontWeight: '500',
    fontSize: 14,
  },
  selectedOptionText: {
    color: '#fff',
  },
  themeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  themeCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedThemeCircle: {
    borderWidth: 2,
    borderColor: '#fff',
    shadowOpacity: 0.3,
  },
  themeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  themeLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    width: 70,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  stackOptions: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 12,
    marginTop: 5,
  },
  stackSubLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 10,
  },
  routineBuilder: {
    marginTop: 20,
  },
  timelineContainer: {
    marginTop: 10,
    position: 'relative',
    paddingLeft: 20,
  },
  timelineLine: {
    position: 'absolute',
    left: 9,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#D9D9D9',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: 15,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  timelineContentActive: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: 'rgba(0, 96, 214, 0.05)',
  },
  timelineText: {
    fontSize: 14,
    color: Colors.text,
  },
  timelineTextActive: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
});
