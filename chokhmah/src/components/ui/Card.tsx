import React from 'react';
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  highlighted?: boolean;
  highlightColor?: string;
  leftBorderColor?: string;
  glowColor?: string;
}

export function Card({
  children,
  onPress,
  style,
  highlighted,
  highlightColor,
  leftBorderColor,
  glowColor,
}: CardProps) {
  const cardStyle: ViewStyle[] = [
    styles.base,
    SHADOWS.level1,
    highlighted && highlightColor
      ? { borderWidth: 1, borderColor: highlightColor }
      : undefined,
    leftBorderColor
      ? { borderLeftWidth: 3, borderLeftColor: leftBorderColor }
      : undefined,
    glowColor ? SHADOWS.level3(glowColor) : undefined,
    style,
  ].filter(Boolean) as ViewStyle[];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          ...cardStyle,
          pressed && styles.pressed,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.backgroundCard,
    borderRadius: RADIUS.soft,
    padding: SPACING.md,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
});
