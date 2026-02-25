import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Animated, Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ScreenWrapper, Card, Button, Chip, ProgressBar,
} from '../components/ui';
import {
  COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS,
  LAYOUT, ANIMATION, GRADIENTS,
} from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { BREATH_BOOK } from '../services/bookData';

type LibraryFilter = 'all' | 'reading' | 'completed' | 'imported';

export function LibraryScreen({ navigation }: any) {
  const { books } = useAppStore();
  const [filter, setFilter] = React.useState<LibraryFilter>('all');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Always include the featured book
  const allBooks = [BREATH_BOOK, ...books.filter(b => b.id !== BREATH_BOOK.id)];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.normal,
      useNativeDriver: true,
    }).start();
  }, []);

  const featuredBook = BREATH_BOOK;
  const completedChapters = featuredBook.chapters.filter(c => c.isCompleted).length;
  const progressPercent = Math.round((completedChapters / featuredBook.totalChapters) * 100);

  const FILTERS: { key: LibraryFilter; label: string; icon?: string }[] = [
    { key: 'all', label: 'All', icon: '✦' },
    { key: 'reading', label: 'Reading' },
    { key: 'completed', label: 'Completed' },
    { key: 'imported', label: 'Imported' },
  ];

  return (
    <ScreenWrapper showConstellation>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Library</Text>
            <Pressable style={styles.searchBtn}>
              <Text style={styles.searchIcon}>🔍</Text>
            </Pressable>
          </View>
          <Text style={styles.subtitle}>Your collection of wisdom</Text>
        </Animated.View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map(f => (
            <Chip
              key={f.key}
              label={f.label}
              icon={f.icon}
              active={filter === f.key}
              onPress={() => setFilter(f.key)}
            />
          ))}
        </ScrollView>

        {/* Featured Book (Hero Card) */}
        <Card style={styles.featuredCard}>
          <LinearGradient
            colors={['rgba(107, 78, 230, 0.1)', 'transparent']}
            style={styles.featuredGradient}
          />
          <View style={styles.featuredRow}>
            <View style={styles.featuredCover}>
              <LinearGradient
                colors={[...GRADIENTS.primary]}
                style={styles.coverGradient}
              >
                <Text style={styles.coverEmoji}>📖</Text>
              </LinearGradient>
            </View>
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredTitle}>{featuredBook.title}</Text>
              <Text style={styles.featuredAuthor}>{featuredBook.author}</Text>
              <View style={styles.featuredBadge}>
                <Text style={styles.badgeText}>★ Featured</Text>
              </View>
              <Text style={styles.featuredMeta}>
                {featuredBook.totalChapters} Chapters
              </Text>
              <Text style={styles.featuredCompleted}>
                {completedChapters} completed
              </Text>
            </View>
          </View>

          <ProgressBar progress={progressPercent} style={styles.featuredProgress} />
          <Text style={styles.featuredPercent}>{progressPercent}% complete</Text>

          <View style={styles.featuredActions}>
            <Button
              label="▶ Continue"
              onPress={() => navigation.navigate('SolomonsVoice', { bookId: featuredBook.id })}
              size="sm"
              style={{ flex: 1 }}
            />
            <View style={{ width: SPACING.sm }} />
            <Button
              label="📖 Read"
              variant="secondary"
              onPress={() => navigation.navigate('BookDetail', { bookId: featuredBook.id })}
              size="sm"
              style={{ flex: 1 }}
            />
          </View>
        </Card>

        {/* Your Books Grid */}
        <Text style={styles.sectionTitle}>Your Books</Text>

        <View style={styles.booksGrid}>
          {allBooks.map((book, idx) => {
            const bCompleted = book.chapters.filter(c => c.isCompleted).length;
            const bProgress = Math.round((bCompleted / book.totalChapters) * 100);
            return (
              <Pressable
                key={book.id}
                style={styles.bookGridCard}
                onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
              >
                <View style={styles.gridCover}>
                  <LinearGradient
                    colors={idx === 0 ? [...GRADIENTS.primary] : [...GRADIENTS.surface]}
                    style={styles.gridCoverGradient}
                  >
                    <Text style={styles.gridCoverEmoji}>📚</Text>
                  </LinearGradient>
                </View>
                <Text style={styles.gridBookTitle} numberOfLines={1}>
                  {book.title}
                </Text>
                <Text style={styles.gridBookAuthor} numberOfLines={1}>
                  {book.author}
                </Text>
                <ProgressBar
                  progress={bProgress}
                  height={2}
                  style={styles.gridProgress}
                />
              </Pressable>
            );
          })}

          {/* Import PDF Card */}
          <Pressable style={styles.importCard}>
            <Text style={styles.importIcon}>+</Text>
            <Text style={styles.importLabel}>Import</Text>
            <Text style={styles.importSub}>PDF</Text>
          </Pressable>
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
  header: {
    marginBottom: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.displayLg,
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: { fontSize: 18 },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  filterRow: {
    gap: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  featuredCard: {
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.soft,
  },
  featuredRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  featuredCover: {
    width: 80,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: SPACING.md,
  },
  coverGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverEmoji: { fontSize: 32 },
  featuredInfo: { flex: 1, justifyContent: 'center' },
  featuredTitle: { ...TYPOGRAPHY.heading },
  featuredAuthor: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, marginTop: 2 },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  badgeText: {
    ...TYPOGRAPHY.micro,
    color: COLORS.gold,
  },
  featuredMeta: { ...TYPOGRAPHY.caption, marginTop: SPACING.xs },
  featuredCompleted: { ...TYPOGRAPHY.caption, color: COLORS.success },
  featuredProgress: { marginBottom: SPACING.xs },
  featuredPercent: {
    ...TYPOGRAPHY.micro,
    color: COLORS.textMuted,
    textAlign: 'right',
    marginBottom: SPACING.md,
  },
  featuredActions: {
    flexDirection: 'row',
  },
  sectionTitle: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  bookGridCard: {
    width: '47%',
    backgroundColor: COLORS.backgroundCard,
    borderRadius: RADIUS.soft,
    padding: SPACING.sm,
    ...SHADOWS.level1,
  },
  gridCover: {
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  gridCoverGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridCoverEmoji: { fontSize: 28 },
  gridBookTitle: {
    ...TYPOGRAPHY.heading,
    fontSize: 16,
  },
  gridBookAuthor: {
    ...TYPOGRAPHY.caption,
    marginTop: 2,
  },
  gridProgress: {
    marginTop: SPACING.sm,
  },
  importCard: {
    width: '47%',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.soft,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.textMuted,
    minHeight: 170,
  },
  importIcon: {
    fontSize: 32,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  importLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  importSub: {
    ...TYPOGRAPHY.micro,
    color: COLORS.textMuted,
  },
});
