import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SPACING, ANIMATION } from '../../constants/theme';

interface StatBoxProps {
  value: string | number;
  label: string;
  delta?: string;
  deltaPositive?: boolean;
  color?: string;
  style?: ViewStyle;
}

export function StatBox({
  value,
  label,
  delta,
  deltaPositive = true,
  color = COLORS.gold,
  style,
}: StatBoxProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.slow,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }, style]}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {delta && (
        <Text style={[styles.delta, { color: deltaPositive ? COLORS.success : COLORS.error }]}>
          {deltaPositive ? '↑' : '↓'} {delta}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.soft,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  value: {
    fontFamily: 'EBGaramond_600SemiBold',
    fontSize: 28,
    lineHeight: 36,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  delta: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    lineHeight: 14,
    marginTop: 2,
  },
});
