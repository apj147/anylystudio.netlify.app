import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS, SPACING, LAYOUT } from '../../constants/theme';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  icon?: string;
  completedIcon?: boolean;
  activeColor?: string;
  style?: ViewStyle;
}

export function Chip({
  label,
  active = false,
  onPress,
  icon,
  completedIcon,
  activeColor,
  style,
}: ChipProps) {
  const inner = (
    <>
      {completedIcon && <Text style={styles.checkIcon}>✓</Text>}
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </>
  );

  if (active) {
    return (
      <Pressable onPress={onPress} style={style}>
        <LinearGradient
          colors={activeColor ? [activeColor, activeColor] : [...GRADIENTS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.activeChip}
        >
          {inner}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        completedIcon && styles.completedChip,
        style,
      ]}
    >
      {inner}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: LAYOUT.chipHeight,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
  },
  activeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: LAYOUT.chipHeight,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
  },
  completedChip: {
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: COLORS.textMuted,
  },
  activeLabel: {
    color: COLORS.white,
  },
  icon: {
    marginRight: SPACING.xs,
    fontSize: 12,
  },
  checkIcon: {
    marginRight: SPACING.xs,
    fontSize: 12,
    color: COLORS.gold,
  },
});
