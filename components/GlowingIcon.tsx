
import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface GlowingIconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  active?: boolean;
  style?: ViewStyle;
}

const GlowingIcon = ({ 
  name, 
  size = 24, 
  color = Colors.icon, 
  active = false,
  style 
}: GlowingIconProps) => {
  return (
    <View style={[
      styles.container, 
      active && styles.active,
      style
    ]}>
      <Ionicons 
        name={name} 
        size={size} 
        color={active ? Colors.primary : color} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: 'rgba(242, 122, 125, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: `0 0 10px ${Colors.primary}`,
      },
    }),
  },
});

export default GlowingIcon;
