import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Animated, Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ScreenWrapper, Card, Button, ProgressBar, StatBox,
} from '../components/ui';
import {
  COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS,
  LAYOUT, ANIMATION, GRADIENTS,
} from '../constants/theme';
import { BREATH_BOOK } from '../services/bookData';

type TabKey = 'chapters' | 'concepts' | 'notes';

export function BookDetailScreen({ route, navigation }: any) {
  const { bookId } = route.params || {};
  const book = BREATH_BOOK; // For now, always use the featured book

  const [activeTab, setActiveTab] = useState<TabKey>('chapters');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const tabIndicator = useRef(new Animated.Value(0)).current;

  const completedChapters = book.chapters.filter(c => c.isCompleted).length;
  const progressPercent = Math.round((completedChapters / book.totalChapters) * 100);
  const totalMinutes = book.chapters.reduce((sum, c) => sum + c.timeSpentMinutes, 0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.normal,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    const tabIndex = tab === 'chapters' ? 0 : tab === 'concepts' ? 1 : 2;
    Animated.timing(tabIndicator, {
      toValue: tabIndex,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'chapters', label: 'Chapters' },
    { key: 'concepts', label: 'Concepts' },
    { key: 'notes', label: 'Notes' },
  ];

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with back button */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>←</Text>
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable>
            <Text style={styles.moreBtn}>⋮</Text>
          </Pressable>
        </View>

        {/* Book Hero */}
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
          <View style={styles.coverContainer}>
            <LinearGradient
              colors={[...GRADIENTS.primary]}
              style={styles.heroGradient}
            >
              <Text style={styles.heroCoverEmoji}>📖</Text>
            </LinearGradient>
          </View>

          <Text style={styles.heroTitle}>{book.title}</Text>
          <Text style={styles.heroSubtitle}>
            The New Science of a Lost Art
          </Text>
          <Text style={styles.heroAuthor}>{book.author}</Text>

          <ProgressBar
            progress={progressPercent}
            height={LAYOUT.progressBarHeightLg}
            style={styles.heroProgress}
          />
          <Text style={styles.heroMeta}>
            {completedChapters} of {book.totalChapters} chapters · {progressPercent}%
          </Text>

          {/* Stat pills */}
          <View style={styles.statPills}>
            <StatBox value={book.totalChapters} label="chap" />
            <View style={{ width: SPACING.sm }} />
            <StatBox value={totalMinutes || 0} label="mins" />
            <View style={{ width: SPACING.sm }} />
            <StatBox value="89%" label="ret" />
          </View>
        </Animated.View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          {TABS.map((tab) => (
            <Pressable
              key={tab.key}
              onPress={() => handleTabChange(tab.key)}
              style={styles.tab}
            >
              <Text style={[
                styles.tabLabel,
                activeTab === tab.key && styles.tabLabelActive,
              ]}>
                {tab.label}
              </Text>
              {activeTab === tab.key && (
                <View style={styles.tabUnderline} />
              )}
            </Pressable>
          ))}
        </View>

        {/* Chapters List */}
        {activeTab === 'chapters' && book.chapters.map((chapter, idx) => {
          const isCompleted = chapter.isCompleted;
          const isCurrent = idx === completedChapters;
          const isLocked = idx > completedChapters;

          const leftColor = isCompleted
            ? COLORS.success
            : isCurrent
            ? COLORS.primary
            : COLORS.surface;

          const iconBg = isCompleted
            ? COLORS.success
            : isCurrent
            ? COLORS.primary
            : COLORS.surface;

          return (
            <Card
              key={chapter.id}
              leftBorderColor={leftColor}
              style={[styles.chapterCard, isLocked && styles.chapterLocked]}
              onPress={!isLocked ? () => {
                if (isCurrent || isCompleted) {
                  navigation.navigate('SolomonsVoice', {
                    bookId: book.id,
                    chapterId: chapter.id,
                  });
                }
              } : undefined}
            >
              <View style={styles.chapterRow}>
                <View style={[styles.chapterIcon, { backgroundColor: iconBg }]}>
                  <Text style={styles.chapterIconText}>
                    {isCompleted ? '✓' : isCurrent ? '▶' : '○'}
                  </Text>
                </View>
                <View style={styles.chapterInfo}>
                  <Text style={[
                    styles.chapterTitle,
                    isLocked && { color: COLORS.textMuted },
                  ]}>
                    Ch.{chapter.number}: {chapter.title}
                  </Text>
                  <Text style={styles.chapterMeta}>
                    {chapter.keyConcepts.length} key concepts
                  </Text>
                  <Text style={[
                    styles.chapterStatus,
                    { color: isCompleted ? COLORS.success : isCurrent ? COLORS.primary : COLORS.textMuted },
                  ]}>
                    {isCompleted
                      ? `Completed · ${chapter.timeSpentMinutes} min`
                      : isCurrent
                      ? 'In progress'
                      : 'Not started'}
                  </Text>
                </View>
              </View>

              {(isCurrent || isCompleted) && (
                <Button
                  label={isCompleted ? '🎓 Review with Solomon' : '🎓 Continue with Solomon'}
                  onPress={() => navigation.navigate('SolomonsVoice', {
                    bookId: book.id,
                    chapterId: chapter.id,
                  })}
                  variant={isCurrent ? 'primary' : 'secondary'}
                  size="sm"
                  fullWidth
                  style={{ marginTop: SPACING.sm }}
                />
              )}
            </Card>
          );
        })}

        {/* Concepts Tab */}
        {activeTab === 'concepts' && (
          <View style={styles.conceptsContainer}>
            {book.chapters.flatMap(ch =>
              ch.keyConcepts.map((concept, idx) => (
                <Card key={`${ch.id}-${idx}`} style={styles.conceptCard}>
                  <Text style={styles.conceptTitle}>✦ {concept}</Text>
                  <Text style={styles.conceptSource}>
                    Ch.{ch.number}: {ch.title}
                  </Text>
                </Card>
              ))
            )}
          </View>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={styles.emptyTitle}>No notes yet</Text>
            <Text style={styles.emptyText}>
              Your highlights and notes will appear here as you read.
            </Text>
          </View>
        )}

        <View style={{ height: LAYOUT.tabBarHeight + SPACING.lg }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingTop: SPACING.md },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  backBtn: { ...TYPOGRAPHY.heading, color: COLORS.white, fontSize: 24 },
  moreBtn: { ...TYPOGRAPHY.heading, color: COLORS.white, fontSize: 24 },
  heroSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  coverContainer: {
    width: 120,
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    ...SHADOWS.level2,
    marginBottom: SPACING.lg,
  },
  heroGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCoverEmoji: { fontSize: 48 },
  heroTitle: { ...TYPOGRAPHY.displayLg, textAlign: 'center' },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  heroAuthor: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.gold,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  heroProgress: {
    width: '70%',
    marginTop: SPACING.lg,
  },
  heroMeta: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  statPills: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
    width: '100%',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    marginBottom: SPACING.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  tabLabel: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.textMuted,
  },
  tabLabelActive: {
    color: COLORS.primary,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '60%',
    backgroundColor: COLORS.primary,
    borderRadius: 1,
  },
  chapterCard: {
    marginBottom: SPACING.sm,
  },
  chapterLocked: {
    opacity: 0.5,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  chapterIconText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  chapterInfo: { flex: 1 },
  chapterTitle: { ...TYPOGRAPHY.heading, fontSize: 16 },
  chapterMeta: { ...TYPOGRAPHY.caption, marginTop: 2 },
  chapterStatus: { ...TYPOGRAPHY.caption, marginTop: 2 },
  conceptsContainer: { gap: SPACING.sm },
  conceptCard: {},
  conceptTitle: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.primary,
  },
  conceptSource: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyEmoji: { fontSize: 48, marginBottom: SPACING.md },
  emptyTitle: { ...TYPOGRAPHY.heading, marginBottom: SPACING.sm },
  emptyText: { ...TYPOGRAPHY.body, color: COLORS.textMuted, textAlign: 'center' },
});
