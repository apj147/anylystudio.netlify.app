import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';

interface OrnamentalDividerProps {
  symbol?: string;
  color?: string;
  style?: ViewStyle;
}

export function OrnamentalDivider({
  symbol = '✦',
  color = COLORS.gold,
  style,
}: OrnamentalDividerProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.line, { backgroundColor: `${color}30` }]} />
      <Text style={[styles.symbol, { color }]}>{symbol}</Text>
      <View style={[styles.line, { backgroundColor: `${color}30` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  line: {
    flex: 1,
    height: 1,
  },
  symbol: {
    marginHorizontal: SPACING.sm,
    fontSize: 14,
  },
});
