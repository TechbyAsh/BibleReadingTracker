
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G, LinearGradient, Stop, Defs } from 'react-native-svg';
import Colors from '../constants/Colors';

interface ProgressCircleProps {
  size?: number;
  strokeWidth?: number;
  progress: number;
}

const ProgressCircle = ({ size = 120, strokeWidth = 12, progress }: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressValue = (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={Colors.gradient[0]} />
            <Stop offset="0.5" stopColor={Colors.gradient[1]} />
            <Stop offset="1" stopColor={Colors.gradient[2]} />
          </LinearGradient>
        </Defs>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`rgba(0, 0, 0, 0.1)`}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#grad)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progressValue}
            strokeLinecap="round"
            fill="transparent"
          />
        </G>
      </Svg>
      <View style={[styles.textContainer, { width: size, height: size }]}>
        <Text style={styles.percentageText}>{progress}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.neomorphismShadowDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    backgroundColor: Colors.background,
    borderRadius: 60,
    padding: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.neomorphismShadowLight,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default ProgressCircle;
