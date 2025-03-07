
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradient?: boolean;
}

const Button = ({ title, onPress, style, textStyle, gradient = true }: ButtonProps) => {
  if (gradient) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.buttonContainer, style]}>
        <View style={styles.neomorphContainer}>
          <LinearGradient
            colors={Colors.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={[styles.text, textStyle]}>{title}</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.neomorphButton, style]}>
      <Text style={[styles.plainText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  neomorphContainer: {
    borderRadius: 20,
    shadowColor: Colors.neomorphismShadowDark,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 6,
    backgroundColor: Colors.background,
    elevation: 7,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  neomorphButton: {
    backgroundColor: Colors.background,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.neomorphismShadowDark,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 7,
    borderWidth: 1,
    borderColor: Colors.neomorphismShadowLight,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  plainText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
