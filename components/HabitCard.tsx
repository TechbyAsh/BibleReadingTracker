
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface HabitCardProps {
  title: string;
  time: string;
  isCompleted?: boolean;
  isPending?: boolean;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

const HabitCard = ({ 
  title, 
  time, 
  isCompleted = false, 
  isPending = false,
  onPress,
  icon = 'bed-outline'
}: HabitCardProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        isCompleted && styles.completedCard,
        isPending && styles.pendingCard
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={isCompleted ? '#fff' : Colors.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, isCompleted && styles.completedText]}>{title}</Text>
        <Text style={[styles.time, isCompleted && styles.completedText]}>{time}</Text>
      </View>
      {isCompleted && (
        <View style={styles.checkContainer}>
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
        </View>
      )}
      {isPending && (
        <View style={styles.checkContainer}>
          <Ionicons name="time-outline" size={24} color={Colors.pending} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.cardHighlight,
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedCard: {
    backgroundColor: Colors.primary,
  },
  pendingCard: {
    borderColor: Colors.pending,
    borderWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  time: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  completedText: {
    color: '#fff',
  },
  checkContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HabitCard;
