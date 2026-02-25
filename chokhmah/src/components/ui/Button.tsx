import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
}

const SIZE_MAP: Record<ButtonSize, { height: number; paddingH: number; text: TextStyle }> = {
  sm: { height: 36, paddingH: SPACING.md, text: { fontSize: 12, lineHeight: 16 } },
  md: { height: 44, paddingH: SPACING.lg, text: { fontSize: 14, lineHeight: 20 } },
  lg: { height: 52, paddingH: SPACING.xl, text: { fontSize: 16, lineHeight: 22 } },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  fullWidth = false,
}: ButtonProps) {
  const sizeConfig = SIZE_MAP[size];

  const isPrimary = variant === 'primary';
  const isGold = variant === 'gold';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  const containerStyle: ViewStyle[] = [
    styles.base,
    { height: sizeConfig.height, paddingHorizontal: sizeConfig.paddingH },
    isSecondary && styles.secondary,
    isGhost && styles.ghost,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    !isPrimary && !isGold && SHADOWS.level1,
    style,
  ].filter(Boolean) as ViewStyle[];

  const textColor =
    isPrimary || isGold ? COLORS.white :
    isSecondary ? COLORS.secondary :
    COLORS.textSecondary;

  const content = (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        ...containerStyle,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.label,
              sizeConfig.text,
              { color: textColor },
              icon ? { marginLeft: SPACING.xs } : undefined,
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );

  if (isPrimary || isGold) {
    const gradientColors = isGold ? GRADIENTS.gold : GRADIENTS.primary;
    return (
      <LinearGradient
        colors={[...gradientColors]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradientWrapper,
          { height: sizeConfig.height },
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          SHADOWS.level1,
          style,
        ]}
      >
        <Pressable
          onPress={onPress}
          disabled={disabled || loading}
          style={({ pressed }) => [
            styles.gradientInner,
            pressed && styles.pressed,
          ]}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <>
              {icon}
              <Text
                style={[
                  styles.label,
                  sizeConfig.text,
                  { color: isGold ? COLORS.textInverse : COLORS.white },
                  icon ? { marginLeft: SPACING.xs } : undefined,
                ]}
              >
                {label}
              </Text>
            </>
          )}
        </Pressable>
      </LinearGradient>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.pill,
  },
  gradientWrapper: {
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  gradientInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  secondary: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  ghost: {
    backgroundColor: COLORS.transparent,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
});
