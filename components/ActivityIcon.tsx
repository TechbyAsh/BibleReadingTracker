
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface ActivityIconProps {
  name: keyof typeof Ionicons.glyphMap;
  label?: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const ActivityIcon = ({ name, label, isSelected = false, onPress }: ActivityIconProps) => {
  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedContainer]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
        <Ionicons 
          name={name} 
          size={24} 
          color={isSelected ? '#fff' : Colors.icon} 
        />
      </View>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(242, 245, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'rgba(106, 123, 255, 0.1)',
  },
  selectedContainer: {
    opacity: 1,
  },
  selectedIconContainer: {
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});

export default ActivityIcon;
