import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Animated, Pressable,
} from 'react-native';
import {
  ScreenWrapper, Card, OrnamentalDivider,
} from '../components/ui';
import {
  COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS,
  LAYOUT, ANIMATION,
} from '../constants/theme';
import { BREATH_BOOK } from '../services/bookData';

export function ReaderScreen({ route, navigation }: any) {
  const { bookId, chapterId } = route.params || {};
  const book = BREATH_BOOK;
  const chapterIdx = book.chapters.findIndex(c => c.id === chapterId);
  const chapter = book.chapters[chapterIdx >= 0 ? chapterIdx : 0];

  const [fontSize, setFontSize] = useState(16);
  const [highlightMode, setHighlightMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.normal,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const progress = contentSize.height > layoutMeasurement.height
      ? contentOffset.y / (contentSize.height - layoutMeasurement.height)
      : 0;
    setScrollProgress(Math.min(1, Math.max(0, progress)));

    // Collapse header on scroll
    if (contentOffset.y > 50) {
      Animated.timing(headerOpacity, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const paragraphs = chapter.content.split('. ').reduce((acc: string[], sentence, idx, arr) => {
    const chunkSize = Math.ceil(arr.length / 3);
    const chunkIdx = Math.floor(idx / chunkSize);
    if (!acc[chunkIdx]) acc[chunkIdx] = '';
    acc[chunkIdx] += sentence + (idx < arr.length - 1 ? '. ' : '');
    return acc;
  }, []);

  return (
    <ScreenWrapper showConstellation={false}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Reader Header */}
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>←</Text>
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              Ch.{chapter.number}: {chapter.title}
            </Text>
            <Text style={styles.headerMeta}>
              {chapter.number} of {book.totalChapters}
            </Text>
          </View>
          <View style={{ width: 32 }} />
        </Animated.View>

        {/* Reading Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.readingContent}
        >
          {/* Chapter Title */}
          <Text style={styles.chapterLabel}>Chapter {chapter.number}</Text>
          <Text style={styles.chapterTitle}>{chapter.title}</Text>

          <OrnamentalDivider />

          {/* Content Paragraphs */}
          {paragraphs.map((paragraph, idx) => (
            <React.Fragment key={idx}>
              <Text style={[styles.bodyText, { fontSize, lineHeight: fontSize * 1.6 }]}>
                {paragraph}
              </Text>

              {/* Key Concept inline (after first paragraph) */}
              {idx === 0 && chapter.keyConcepts.length > 0 && (
                <Card style={styles.keyConceptInline}>
                  <Text style={styles.keyConceptLabel}>✦ Key Concept</Text>
                  <Text style={styles.keyConceptText}>
                    {chapter.keyConcepts[0]}
                  </Text>
                </Card>
              )}
            </React.Fragment>
          ))}

          {/* All Key Concepts */}
          {chapter.keyConcepts.length > 1 && (
            <>
              <OrnamentalDivider symbol="✧" />
              <Text style={styles.conceptsHeading}>Key Concepts</Text>
              {chapter.keyConcepts.map((concept, idx) => (
                <View key={idx} style={styles.conceptItem}>
                  <Text style={styles.conceptBullet}>✦</Text>
                  <Text style={styles.conceptText}>{concept}</Text>
                </View>
              ))}
            </>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Reader Footer */}
        <View style={styles.footer}>
          {/* Progress bar */}
          <View style={styles.footerProgress}>
            <View
              style={[
                styles.footerProgressFill,
                { width: `${scrollProgress * 100}%` },
              ]}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerPage}>
              {Math.round(scrollProgress * 100)}%
            </Text>

            <View style={styles.footerActions}>
              <Pressable
                onPress={() => setFontSize(prev => prev === 14 ? 16 : prev === 16 ? 18 : 14)}
                style={styles.footerBtn}
              >
                <Text style={styles.footerBtnText}>Aa</Text>
              </Pressable>

              <Pressable
                onPress={() => setHighlightMode(!highlightMode)}
                style={[
                  styles.footerBtn,
                  highlightMode && styles.footerBtnActive,
                ]}
              >
                <Text style={styles.footerBtnText}>🔦</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('SolomonsVoice', {
                  bookId: book.id,
                  chapterId: chapter.id,
                })}
                style={styles.footerBtn}
              >
                <Text style={styles.footerBtnText}>🎓</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Animated.View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.backgroundCard,
    marginHorizontal: -SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  backBtn: { ...TYPOGRAPHY.heading, color: COLORS.white, fontSize: 24, width: 32 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { ...TYPOGRAPHY.subheading, color: COLORS.white },
  headerMeta: { ...TYPOGRAPHY.micro, color: COLORS.textMuted },
  readingContent: {
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.sm,
  },
  chapterLabel: {
    ...TYPOGRAPHY.displaySm,
    color: COLORS.gold,
    fontSize: 18,
  },
  chapterTitle: {
    ...TYPOGRAPHY.displayLg,
    marginTop: SPACING.xs,
  },
  bodyText: {
    fontFamily: 'Inter_400Regular',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  keyConceptInline: {
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(107, 78, 230, 0.2)',
    backgroundColor: 'rgba(107, 78, 230, 0.05)',
  },
  keyConceptLabel: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  keyConceptText: {
    ...TYPOGRAPHY.body,
  },
  conceptsHeading: {
    ...TYPOGRAPHY.heading,
    color: COLORS.gold,
    marginBottom: SPACING.md,
  },
  conceptItem: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  conceptBullet: {
    color: COLORS.primary,
    marginRight: SPACING.sm,
    fontSize: 14,
  },
  conceptText: {
    ...TYPOGRAPHY.body,
    flex: 1,
  },
  footer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.round,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  footerProgress: {
    height: 3,
    backgroundColor: COLORS.backgroundCard,
  },
  footerProgressFill: {
    height: 3,
    backgroundColor: COLORS.gold,
    borderRadius: 1.5,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.sm,
  },
  footerPage: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  footerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  footerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBtnActive: {
    backgroundColor: COLORS.primary,
  },
  footerBtnText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
