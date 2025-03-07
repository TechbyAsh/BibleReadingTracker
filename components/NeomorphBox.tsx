
import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '../constants/Colors';

interface NeomorphBoxProps {
  children: ReactNode;
  style?: ViewStyle;
  lightShadow?: boolean;
}

const NeomorphBox = ({ children, style, lightShadow = true }: NeomorphBoxProps) => {
  return (
    <View style={[styles.container, lightShadow && styles.lightShadow, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    shadowColor: Colors.neomorphismShadowDark,
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  lightShadow: {
    borderWidth: 1,
    borderColor: Colors.neomorphismShadowLight,
  },
});

export default NeomorphBox;
