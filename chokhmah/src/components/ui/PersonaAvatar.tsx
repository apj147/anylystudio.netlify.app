import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ViewStyle } from 'react-native';
import { COLORS, PERSONA_COLORS, SHADOWS, RADIUS, PersonaId, ANIMATION } from '../../constants/theme';

interface PersonaAvatarProps {
  personaId: PersonaId;
  size?: number;
  showGlow?: boolean;
  animated?: boolean;
  initial?: string;
  style?: ViewStyle;
}

const PERSONA_EMOJI: Record<PersonaId, string> = {
  solomon: '👑',
  athena: '🦉',
  marcus: '🔥',
  hypatia: '📐',
  albert: '💡',
  maya: '🌿',
  leonardo: '🎨',
  confucius: '🎋',
  ada: '⚡',
  rumi: '🌹',
};

export function PersonaAvatar({
  personaId,
  size = 48,
  showGlow = true,
  animated = false,
  initial,
  style,
}: PersonaAvatarProps) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const colors = PERSONA_COLORS[personaId];

  useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: -3,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 3,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animated]);

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: size > 56 ? 3 : 2,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const glowStyle = showGlow ? SHADOWS.level3(colors.primary) : {};

  return (
    <Animated.View
      style={[
        containerStyle,
        glowStyle,
        animated ? { transform: [{ translateY: floatAnim }] } : undefined,
        style,
      ]}
    >
      <Text style={{ fontSize: size * 0.45 }}>
        {initial || PERSONA_EMOJI[personaId]}
      </Text>
    </Animated.View>
  );
}
