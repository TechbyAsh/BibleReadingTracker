
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import NeomorphBox from '../components/NeomorphBox';
import NavigationBar from '../components/NavigationBar';

const PREMADE_PLANS = [
  { id: '1', title: 'Bible in a Year', duration: 365, type: 'full' },
  { id: '2', title: 'Gospels in 30 Days', duration: 30, type: 'partial' },
  { id: '3', title: 'Psalms in a Month', duration: 30, type: 'partial' },
];

const FREQUENCY_OPTIONS = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'weekdays', label: 'Weekdays Only' },
];

export default function PlannerScreen() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [frequency, setFrequency] = useState(null);

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Choose a Reading Plan</Text>
      {PREMADE_PLANS.map(plan => (
        <TouchableOpacity
          key={plan.id}
          onPress={() => {
            setSelectedPlan(plan);
            setStep(2);
          }}
        >
          <NeomorphBox style={styles.planCard}>
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.planDuration}>{plan.duration} days</Text>
          </NeomorphBox>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => {
          setSelectedPlan({ id: 'custom', title: 'Custom Plan', type: 'custom' });
          setStep(2);
        }}
      >
        <NeomorphBox style={[styles.planCard, styles.customPlanCard]}>
          <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
          <Text style={styles.customPlanText}>Create Custom Plan</Text>
        </NeomorphBox>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Set Your Schedule</Text>
      {FREQUENCY_OPTIONS.map(option => (
        <TouchableOpacity
          key={option.id}
          onPress={() => {
            setFrequency(option);
            setStep(3);
          }}
        >
          <NeomorphBox style={styles.optionCard}>
            <Text style={styles.optionText}>{option.label}</Text>
          </NeomorphBox>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Review & Start</Text>
      <NeomorphBox style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Plan Summary</Text>
        <Text style={styles.summaryText}>Plan: {selectedPlan.title}</Text>
        <Text style={styles.summaryText}>Frequency: {frequency.label}</Text>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => {
            // Handle plan creation
          }}
        >
          <Text style={styles.startButtonText}>Start Plan</Text>
        </TouchableOpacity>
      </NeomorphBox>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryGradientEnd]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Reading Planner</Text>
          <View style={styles.stepsIndicator}>
            {[1, 2, 3].map(stepNum => (
              <View
                key={stepNum}
                style={[
                  styles.stepDot,
                  step >= stepNum && styles.activeStepDot
                ]}
              />
            ))}
          </View>
        </View>

        <ScrollView style={styles.content}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
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
  stepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 5,
  },
  activeStepDot: {
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 15,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  planCard: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: Colors.card,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  planDuration: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  customPlanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customPlanText: {
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 10,
  },
  optionCard: {
    padding: 15,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
  },
  summaryCard: {
    padding: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
