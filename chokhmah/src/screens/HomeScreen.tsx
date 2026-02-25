import React, { useEffect, useRef, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Animated, Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper, Card, Button, ProgressBar, PersonaAvatar, OrnamentalDivider, StatBox } from '../components/ui';
import {
  COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS, PERSONA_COLORS,
  LAYOUT, ANIMATION, GRADIENTS, PersonaId,
} from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { DAILY_WISDOM_QUOTES } from '../services/bookData';
import { PERSONA_LIST } from '../services/personas';

export function HomeScreen({ navigation }: any) {
  const { progress, books, selectedPersonaId, dailyQuoteIndex } = useAppStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const flameScale = useRef(new Animated.Value(1)).current;
  const quoteSlide = useRef(new Animated.Value(10)).current;

  const quote = DAILY_WISDOM_QUOTES[dailyQuoteIndex % DAILY_WISDOM_QUOTES.length];
  const currentBook = books.length > 0 ? books[0] : null;
  const completedChapters = currentBook?.chapters.filter(c => c.isCompleted).length || 0;
  const progressPercent = currentBook ? Math.round((completedChapters / currentBook.totalChapters) * 100) : 0;

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  useEffect(() => {
    // Fade in screen
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.normal,
      useNativeDriver: true,
    }).start();

    // Quote slide up
    Animated.timing(quoteSlide, {
      toValue: 0,
      duration: ANIMATION.normal,
      delay: 150,
      useNativeDriver: true,
    }).start();

    // Flame pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(flameScale, { toValue: 1.15, duration: 1000, useNativeDriver: true }),
        Animated.timing(flameScale, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <ScreenWrapper showConstellation>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Greeting Header */}
        <Animated.View style={[styles.greetingSection, { opacity: fadeAnim }]}>
          <Text style={styles.greeting}>{greeting}, Seeker</Text>
          <View style={styles.streakRow}>
            <Text style={styles.streakText}>
              ✦ Day {progress.currentStreak} Streak
            </Text>
            <Animated.Text style={[styles.flame, { transform: [{ scale: flameScale }] }]}>
              🔥
            </Animated.Text>
          </View>
        </Animated.View>

        {/* Daily Wisdom Card */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: quoteSlide }] }}>
          <Card
            style={styles.wisdomCard}
            highlighted
            highlightColor={COLORS.goldBorder}
          >
            <Text style={styles.quoteText}>
              {'\u275D'} {quote.text} {'\u275E'}
            </Text>
            <Text style={styles.quoteSource}>— {quote.source}</Text>
            <OrnamentalDivider />
          </Card>
        </Animated.View>

        {/* Continue Learning */}
        <Text style={styles.sectionTitle}>Continue Learning</Text>

        <Card style={styles.bookCard}>
          <View style={styles.bookRow}>
            <View style={styles.bookCover}>
              <LinearGradient
                colors={[...GRADIENTS.primary]}
                style={styles.coverGradient}
              >
                <Text style={styles.coverEmoji}>📖</Text>
              </LinearGradient>
            </View>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>
                {currentBook?.title || 'Breath'}
              </Text>
              <Text style={styles.bookAuthor}>
                {currentBook?.author || 'James Nestor'}
              </Text>
              <Text style={styles.bookMeta}>
                Ch.{completedChapters + 1} of {currentBook?.totalChapters || 11}
              </Text>
            </View>
          </View>

          <ProgressBar progress={progressPercent} style={styles.bookProgress} />
          <Text style={styles.progressText}>{progressPercent}%</Text>

          <Button
            label="▶  Continue with Solomon"
            onPress={() => navigation.navigate('SolomonsVoice', {
              bookId: currentBook?.id || 'breath-james-nestor',
            })}
            fullWidth
            style={styles.continueBtn}
          />
        </Card>

        {/* Quick Start Personas */}
        <Text style={styles.sectionTitle}>Quick Start</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.personaScroll}
        >
          {PERSONA_LIST.map((persona) => {
            const colors = PERSONA_COLORS[persona.id];
            const isSelected = persona.id === selectedPersonaId;
            return (
              <Pressable
                key={persona.id}
                onPress={() => navigation.navigate('SolomonsVoice', {
                  bookId: currentBook?.id || 'breath-james-nestor',
                  personaId: persona.id,
                })}
                style={[
                  styles.personaCard,
                  isSelected && { borderColor: colors.primary },
                ]}
              >
                <PersonaAvatar
                  personaId={persona.id}
                  size={LAYOUT.avatarSm}
                  showGlow={isSelected}
                />
                <Text style={styles.personaName}>{persona.name}</Text>
                <Text style={[styles.personaStyle, { color: colors.primary }]}>
                  {persona.title}
                </Text>
                <View style={[styles.personaBorder, { backgroundColor: colors.primary }]} />
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Learning Stats */}
        <Text style={styles.sectionTitle}>Today's Learning</Text>

        <View style={styles.statsRow}>
          <StatBox
            value={Math.round(progress.totalMinutesLearned % 60) || 0}
            label="mins today"
          />
          <View style={{ width: SPACING.sm }} />
          <StatBox
            value={`${progress.retentionRate || 0}%`}
            label="ret. rate"
          />
          <View style={{ width: SPACING.sm }} />
          <StatBox
            value={(progress.totalMinutesLearned / 60).toFixed(1)}
            label="hrs total"
          />
        </View>

        <View style={{ height: LAYOUT.tabBarHeight + SPACING.lg }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: SPACING.xl,
  },
  greetingSection: {
    marginBottom: SPACING.lg,
  },
  greeting: {
    ...TYPOGRAPHY.displaySm,
    color: COLORS.white,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  streakText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gold,
  },
  flame: {
    fontSize: 16,
    marginLeft: SPACING.xs,
  },
  wisdomCard: {
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
  },
  quoteText: {
    fontFamily: 'EBGaramond_400Regular_Italic',
    fontSize: 18,
    lineHeight: 26,
    color: COLORS.goldLight,
    textAlign: 'center',
  },
  quoteSource: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  bookCard: {
    marginBottom: SPACING.lg,
  },
  bookRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  bookCover: {
    width: 56,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: SPACING.md,
  },
  coverGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverEmoji: {
    fontSize: 28,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    ...TYPOGRAPHY.heading,
  },
  bookAuthor: {
    ...TYPOGRAPHY.caption,
    marginTop: 2,
  },
  bookMeta: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  bookProgress: {
    marginBottom: SPACING.xs,
  },
  progressText: {
    ...TYPOGRAPHY.micro,
    color: COLORS.textMuted,
    textAlign: 'right',
    marginBottom: SPACING.md,
  },
  continueBtn: {
    marginTop: SPACING.xs,
  },
  personaScroll: {
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  personaCard: {
    width: 85,
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: RADIUS.soft,
    backgroundColor: COLORS.backgroundCard,
    borderWidth: 1,
    borderColor: COLORS.surface,
    ...SHADOWS.level1,
  },
  personaName: {
    ...TYPOGRAPHY.micro,
    color: COLORS.white,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  personaStyle: {
    ...TYPOGRAPHY.micro,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 1,
  },
  personaBorder: {
    width: '100%',
    height: 2,
    borderRadius: 1,
    marginTop: SPACING.xs,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
});
