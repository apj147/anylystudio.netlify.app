import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Animated, Pressable,
} from 'react-native';
import {
  ScreenWrapper, Card, StatBox, ProgressBar, PersonaAvatar, OrnamentalDivider,
} from '../components/ui';
import {
  COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS,
  LAYOUT, ANIMATION, PERSONA_COLORS, PersonaId,
} from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { PERSONA_LIST } from '../services/personas';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function ProgressScreen() {
  const { progress } = useAppStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const flameScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.normal,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(flameScale, { toValue: 1.2, duration: 800, useNativeDriver: true }),
        Animated.timing(flameScale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const maxWeeklyMin = Math.max(...progress.weeklyActivity, 1);
  const avgMinPerDay = Math.round(progress.weeklyActivity.reduce((s, v) => s + v, 0) / 7);

  // Streak week display
  const today = new Date().getDay();
  const streakDays = Array.from({ length: 7 }, (_, i) =>
    i <= today && i >= today - progress.currentStreak + 1
  );

  return (
    <ScreenWrapper showConstellation>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Progress</Text>
            <Pressable style={styles.calendarBtn}>
              <Text style={styles.calendarIcon}>📅</Text>
            </Pressable>
          </View>
          <Text style={styles.subtitle}>Your wisdom journey</Text>
        </Animated.View>

        {/* Streak Card */}
        <Card
          style={styles.streakCard}
          highlighted
          highlightColor={COLORS.goldBorder}
        >
          <View style={styles.streakHeader}>
            <Animated.Text style={[styles.streakFlame, { transform: [{ scale: flameScale }] }]}>
              🔥
            </Animated.Text>
            <Text style={styles.streakTitle}>
              {progress.currentStreak}-Day Streak!
            </Text>
          </View>

          <View style={styles.streakWeek}>
            {DAYS.map((day, idx) => {
              const isActive = streakDays[idx];
              return (
                <View key={idx} style={styles.streakDay}>
                  <Text style={styles.streakDayLabel}>{day}</Text>
                  <View style={[
                    styles.streakDot,
                    isActive ? styles.streakDotActive : styles.streakDotInactive,
                  ]}>
                    {isActive && <Text style={styles.streakDotSymbol}>✦</Text>}
                  </View>
                </View>
              );
            })}
          </View>

          <Text style={styles.streakBest}>
            Best: {progress.bestStreak} days
          </Text>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatBox
              value={`${progress.retentionRate}%`}
              label="Retention Rate"
              delta="2.1%"
              deltaPositive
            />
            <View style={{ width: SPACING.sm }} />
            <StatBox
              value={progress.totalQuestionsAnswered}
              label="Questions Answered"
              delta="8"
              deltaPositive
            />
          </View>
          <View style={[styles.statsRow, { marginTop: SPACING.sm }]}>
            <StatBox
              value={(progress.totalMinutesLearned / 60).toFixed(1)}
              label="Hours Learned"
              delta="0.5h"
              deltaPositive
            />
            <View style={{ width: SPACING.sm }} />
            <StatBox
              value={`Level ${progress.level}`}
              label="Current Level"
              delta={`from ${progress.level - 1}`}
              deltaPositive
            />
          </View>
        </View>

        {/* Weekly Chart */}
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Learning Activity</Text>

          <View style={styles.chartContainer}>
            {progress.weeklyActivity.map((minutes, idx) => {
              const height = maxWeeklyMin > 0
                ? Math.max(4, (minutes / maxWeeklyMin) * 100)
                : 4;
              return (
                <View key={idx} style={styles.chartBar}>
                  <View style={styles.barContainer}>
                    <Animated.View
                      style={[
                        styles.barFill,
                        { height: `${height}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{DAYS[idx]}</Text>
                </View>
              );
            })}
          </View>

          <Text style={styles.chartAvg}>Avg: {avgMinPerDay} min/day</Text>
        </Card>

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Achievements</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.achieveScroll}
        >
          {progress.achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achieveCard,
                !achievement.isUnlocked && styles.achieveLocked,
              ]}
            >
              <Text style={styles.achieveIcon}>{achievement.icon}</Text>
              <Text style={[
                styles.achieveTitle,
                !achievement.isUnlocked && { color: COLORS.textMuted },
              ]}>
                {achievement.isUnlocked ? achievement.title : '???'}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Persona Mastery */}
        <Text style={styles.sectionTitle}>Persona Mastery</Text>

        <Card style={styles.masteryCard}>
          {PERSONA_LIST.slice(0, 5).map((persona) => {
            const mastery = progress.personaMastery[persona.id] || 0;
            const colors = PERSONA_COLORS[persona.id];
            const isTop = persona.id === 'solomon'; // highest mastery
            return (
              <View key={persona.id} style={styles.masteryRow}>
                <PersonaAvatar
                  personaId={persona.id}
                  size={28}
                  showGlow={false}
                />
                <Text style={styles.masteryName}>{persona.name}</Text>
                <View style={styles.masteryBarTrack}>
                  <View
                    style={[
                      styles.masteryBarFill,
                      { width: `${mastery}%`, backgroundColor: colors.primary },
                    ]}
                  />
                </View>
                <Text style={styles.masteryPercent}>{mastery}%</Text>
                {isTop && <Text style={styles.masteryStar}>⭐</Text>}
              </View>
            );
          })}
        </Card>

        <View style={{ height: LAYOUT.tabBarHeight + SPACING.lg }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingTop: SPACING.xl },
  header: { marginBottom: SPACING.lg },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { ...TYPOGRAPHY.displayLg },
  calendarBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  calendarIcon: { fontSize: 18 },
  subtitle: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, marginTop: SPACING.xs },

  // Streak
  streakCard: {
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  streakFlame: { fontSize: 28, marginRight: SPACING.sm },
  streakTitle: { ...TYPOGRAPHY.displaySm, color: COLORS.gold },
  streakWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
  },
  streakDay: { alignItems: 'center' },
  streakDayLabel: { ...TYPOGRAPHY.caption, marginBottom: SPACING.xs },
  streakDot: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  streakDotActive: { backgroundColor: COLORS.gold },
  streakDotInactive: { backgroundColor: COLORS.surface },
  streakDotSymbol: { color: COLORS.textInverse, fontSize: 14 },
  streakBest: { ...TYPOGRAPHY.caption, textAlign: 'center' },

  // Stats
  statsGrid: { marginBottom: SPACING.lg },
  statsRow: { flexDirection: 'row' },

  // Chart
  chartCard: { marginBottom: SPACING.lg },
  chartTitle: { ...TYPOGRAPHY.subheading, marginBottom: SPACING.md },
  chartContainer: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  chartBar: { alignItems: 'center', flex: 1 },
  barContainer: {
    width: 24, height: 100,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.soft,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.soft,
  },
  barLabel: { ...TYPOGRAPHY.caption, marginTop: SPACING.xs },
  chartAvg: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, marginTop: SPACING.md },

  // Achievements
  sectionTitle: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  achieveScroll: { gap: SPACING.sm, paddingBottom: SPACING.lg },
  achieveCard: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: COLORS.backgroundCard,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: COLORS.gold,
    ...SHADOWS.level1,
  },
  achieveLocked: {
    opacity: 0.4,
    borderColor: COLORS.surface,
  },
  achieveIcon: { fontSize: 24, marginBottom: 2 },
  achieveTitle: {
    ...TYPOGRAPHY.micro,
    color: COLORS.gold,
    textAlign: 'center',
  },

  // Mastery
  masteryCard: {},
  masteryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  masteryName: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    width: 70,
    marginLeft: SPACING.sm,
  },
  masteryBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 4,
    marginHorizontal: SPACING.sm,
    overflow: 'hidden',
  },
  masteryBarFill: { height: 8, borderRadius: 4 },
  masteryPercent: { ...TYPOGRAPHY.caption, width: 36, textAlign: 'right' },
  masteryStar: { fontSize: 14, marginLeft: SPACING.xs },
});
