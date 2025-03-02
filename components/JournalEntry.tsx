
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface JournalEntryProps {
  date: string;
  content: string;
  mood: string;
  onPress?: () => void;
}

const JournalEntry = ({ 
  date, 
  content, 
  mood = 'neutral',
  onPress
}: JournalEntryProps) => {
  
  const renderMoodIcon = () => {
    switch(mood) {
      case 'happy':
        return <Ionicons name="happy-outline" size={24} color={Colors.primary} />;
      case 'sad':
        return <Ionicons name="sad-outline" size={24} color="#FF6B6B" />;
      default:
        return <Ionicons name="happy-outline" size={24} color={Colors.textSecondary} />;
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.moodIcon}>
          {renderMoodIcon()}
        </View>
      </View>
      <Text style={styles.content} numberOfLines={3}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardHighlight,
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  moodIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22,
  }
});

export default JournalEntry;
