import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS, LAYOUT, ANIMATION } from '../../constants/theme';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  color?: readonly [string, string];
  trackColor?: string;
  animated?: boolean;
  style?: ViewStyle;
}

export function ProgressBar({
  progress,
  height = LAYOUT.progressBarHeight,
  color,
  trackColor = COLORS.surface,
  animated = true,
  style,
}: ProgressBarProps) {
  const animValue = useRef(new Animated.Value(0)).current;
  const clampedProgress = Math.min(100, Math.max(0, progress));

  useEffect(() => {
    if (animated) {
      Animated.timing(animValue, {
        toValue: clampedProgress,
        duration: ANIMATION.slow + 100,
        useNativeDriver: false,
      }).start();
    } else {
      animValue.setValue(clampedProgress);
    }
  }, [clampedProgress, animated]);

  const width = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const gradientColors = color || GRADIENTS.primary;

  return (
    <View style={[styles.track, { height, backgroundColor: trackColor }, style]}>
      <Animated.View style={[styles.fill, { width, height }]}>
        <LinearGradient
          colors={[...gradientColors]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
});
