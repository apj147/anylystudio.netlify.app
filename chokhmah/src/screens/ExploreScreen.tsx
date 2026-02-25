import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Animated, Pressable,
} from 'react-native';
import {
  ScreenWrapper, Card, PersonaAvatar, OrnamentalDivider, Button,
} from '../components/ui';
import {
  COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS,
  LAYOUT, ANIMATION, PERSONA_COLORS,
} from '../constants/theme';
import { PERSONA_LIST } from '../services/personas';
import { LecturerPersona } from '../types';

export function ExploreScreen({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.normal,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderPersonaCard = (persona: LecturerPersona) => {
    const colors = PERSONA_COLORS[persona.id];
    const traits = [
      { label: 'Warmth', value: persona.characteristics.warmth },
      { label: 'Authority', value: persona.characteristics.authority },
      { label: 'Patience', value: persona.characteristics.patience },
      { label: 'Humor', value: persona.characteristics.humor },
    ];

    return (
      <Card
        key={persona.id}
        style={styles.personaCard}
        highlighted
        highlightColor={colors.border}
        glowColor={colors.primary}
        onPress={() => navigation.navigate('SolomonsVoice', {
          bookId: 'breath-james-nestor',
          personaId: persona.id,
        })}
      >
        <View style={styles.personaHeader}>
          <PersonaAvatar
            personaId={persona.id}
            size={LAYOUT.avatarLg}
            showGlow
          />
          <View style={styles.personaInfo}>
            <Text style={styles.personaName}>{persona.name}</Text>
            <Text style={[styles.personaTitle, { color: colors.primary }]}>
              {persona.title}
            </Text>
            <Text style={styles.personaDesc}>{persona.description}</Text>
          </View>
        </View>

        {/* Trait Bars */}
        <View style={styles.traitsContainer}>
          {traits.map(trait => (
            <View key={trait.label} style={styles.traitRow}>
              <Text style={styles.traitLabel}>♦ {trait.label}</Text>
              <View style={styles.traitBarTrack}>
                <View
                  style={[
                    styles.traitBarFill,
                    {
                      width: `${trait.value}%`,
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              </View>
              <Text style={styles.traitPercent}>{trait.value}%</Text>
            </View>
          ))}
        </View>

        {/* Catchphrase */}
        <Text style={[styles.catchphrase, { color: colors.accent }]}>
          "{persona.catchPhrases[0]}"
        </Text>
      </Card>
    );
  };

  return (
    <ScreenWrapper showConstellation>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Choose your guide to wisdom</Text>
        </Animated.View>

        <OrnamentalDivider />

        <Text style={styles.sectionTitle}>
          "Each voice carries its own wisdom"
        </Text>

        {/* Persona Cards */}
        {PERSONA_LIST.map(renderPersonaCard)}

        <View style={{ height: LAYOUT.tabBarHeight + SPACING.lg }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingTop: SPACING.xl },
  header: { marginBottom: SPACING.sm },
  title: { ...TYPOGRAPHY.displayLg },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    ...TYPOGRAPHY.body,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  personaCard: {
    marginBottom: SPACING.md,
  },
  personaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  personaInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  personaName: { ...TYPOGRAPHY.heading },
  personaTitle: { ...TYPOGRAPHY.caption, marginTop: 2 },
  personaDesc: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: SPACING.xs },
  traitsContainer: { marginBottom: SPACING.md },
  traitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  traitLabel: {
    ...TYPOGRAPHY.micro,
    color: COLORS.textMuted,
    width: 80,
  },
  traitBarTrack: {
    flex: 1,
    height: 3,
    backgroundColor: COLORS.surface,
    borderRadius: 1.5,
    marginHorizontal: SPACING.sm,
    overflow: 'hidden',
  },
  traitBarFill: { height: 3, borderRadius: 1.5 },
  traitPercent: { ...TYPOGRAPHY.micro, width: 32, textAlign: 'right' },
  catchphrase: {
    ...TYPOGRAPHY.caption,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
