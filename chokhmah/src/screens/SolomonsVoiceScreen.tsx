import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Animated, TextInput,
  KeyboardAvoidingView, Platform, Modal, Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ScreenWrapper, Card, Button, Chip, PersonaAvatar, OrnamentalDivider, ProgressBar,
} from '../components/ui';
import {
  COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS, PERSONA_COLORS,
  LAYOUT, ANIMATION, PersonaId,
} from '../constants/theme';
import { useAppStore } from '../store/useAppStore';
import { BREATH_BOOK } from '../services/bookData';
import { PERSONAS } from '../services/personas';
import { generateQuestion, evaluateAnswer, generateLectureSegment } from '../services/lectureService';
import { SocraticQuestion, AnswerResult, UserMood } from '../types';

const MOOD_EMOJI: Record<UserMood, string> = {
  engaged: '😊',
  confused: '😕',
  bored: '😐',
  excited: '🤩',
  struggling: '😤',
};

export function SolomonsVoiceScreen({ route, navigation }: any) {
  const { personaId: routePersonaId } = route.params || {};
  const { selectedPersonaId, selectPersona, activeSession, startSession, recordAnswer, updateMood, updateDifficulty } = useAppStore();

  const personaId: PersonaId = routePersonaId || selectedPersonaId;
  const persona = PERSONAS[personaId];
  const colors = PERSONA_COLORS[personaId];
  const book = BREATH_BOOK;

  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [lectureSegmentIdx, setLectureSegmentIdx] = useState(0);
  const [lectureText, setLectureText] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<SocraticQuestion | null>(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);
  const [difficulty, setDifficulty] = useState(2);
  const [mood, setMood] = useState<UserMood>('engaged');
  const [streak, setStreak] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const questionSlide = useRef(new Animated.Value(20)).current;
  const bubbleSlide = useRef(new Animated.Value(10)).current;

  const chapter = book.chapters[currentChapterIdx];

  // Initialize session
  useEffect(() => {
    if (!activeSession) {
      startSession({
        id: `session-${Date.now()}`,
        bookId: book.id,
        chapterId: chapter.id,
        personaId,
        startedAt: Date.now(),
        questionsAnswered: 0,
        correctAnswers: 0,
        difficulty,
        mood,
      });
    }
  }, []);

  // Generate lecture on chapter/segment change
  useEffect(() => {
    const text = generateLectureSegment(chapter, personaId, lectureSegmentIdx);
    setLectureText('');
    // Typewriter effect
    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= text.length) {
        setLectureText(text.slice(0, idx));
        idx++;
      } else {
        clearInterval(interval);
        // Generate question after lecture
        const q = generateQuestion(chapter, difficulty, personaId);
        setCurrentQuestion(q);
        animateQuestionIn();
      }
    }, ANIMATION.typewriter);

    // Animate bubble
    bubbleSlide.setValue(10);
    Animated.timing(bubbleSlide, {
      toValue: 0,
      duration: ANIMATION.normal,
      useNativeDriver: true,
    }).start();

    return () => clearInterval(interval);
  }, [currentChapterIdx, lectureSegmentIdx, personaId]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION.normal,
      useNativeDriver: true,
    }).start();
  }, []);

  const animateQuestionIn = () => {
    questionSlide.setValue(20);
    Animated.spring(questionSlide, {
      toValue: 0,
      damping: ANIMATION.spring.damping,
      stiffness: ANIMATION.spring.stiffness,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    setCurrentQuestion(null);
    setAnswerResult(null);
    if (lectureSegmentIdx < 2) {
      setLectureSegmentIdx(prev => prev + 1);
    } else if (currentChapterIdx < book.chapters.length - 1) {
      setCurrentChapterIdx(prev => prev + 1);
      setLectureSegmentIdx(0);
    }
  };

  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuestion || !answerText.trim()) return;
    const result = evaluateAnswer(currentQuestion, answerText, personaId);
    setAnswerResult(result);
    recordAnswer(result.isCorrect);

    if (result.isCorrect) {
      setStreak(prev => prev + 1);
      if (difficulty < 4) setDifficulty(prev => prev + 1);
    } else {
      setStreak(0);
      if (difficulty > 1) setDifficulty(prev => prev - 1);
    }
  }, [currentQuestion, answerText, personaId, difficulty]);

  return (
    <ScreenWrapper personaColor={colors.primary}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Solomon's Voice</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Chapter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {book.chapters.map((ch, idx) => (
            <Chip
              key={ch.id}
              label={`Ch.${ch.number}`}
              active={idx === currentChapterIdx}
              completedIcon={ch.isCompleted}
              onPress={() => {
                setCurrentChapterIdx(idx);
                setLectureSegmentIdx(0);
              }}
              style={styles.chip}
            />
          ))}
        </ScrollView>

        {/* Active Persona Banner */}
        <Card
          style={styles.personaBanner}
          highlighted
          highlightColor={colors.border}
          glowColor={colors.primary}
        >
          <View style={styles.personaRow}>
            <PersonaAvatar
              personaId={personaId}
              size={56}
              showGlow
              animated
            />
            <View style={styles.personaInfo}>
              <Text style={styles.personaName}>{persona.name}</Text>
              <Text style={[styles.personaCatch, { color: `${colors.primary}B0` }]}>
                "{persona.catchPhrases[0]}"
              </Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>
                  Difficulty: {'█'.repeat(difficulty)}{'░'.repeat(4 - difficulty)} {difficulty}/4
                </Text>
                <Text style={styles.metaText}>
                  Mood: {MOOD_EMOJI[mood]} {mood}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Lecture Content */}
        <ScrollView
          ref={scrollRef}
          style={styles.lectureScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lectureContent}
        >
          {/* Lecture Bubble */}
          <Animated.View style={{ transform: [{ translateY: bubbleSlide }] }}>
            <Card leftBorderColor={colors.primary} style={styles.lectureBubble}>
              <Text style={styles.lectureText}>{lectureText}</Text>

              {chapter.keyConcepts.length > 0 && lectureSegmentIdx === 0 && (
                <View style={styles.keyConceptBox}>
                  <Text style={styles.keyConceptTitle}>✦ Key Concept</Text>
                  <Text style={styles.keyConceptText}>{chapter.keyConcepts[0]}</Text>
                </View>
              )}
            </Card>
          </Animated.View>

          {/* Socratic Question */}
          {currentQuestion && !answerResult && (
            <Animated.View style={{ transform: [{ translateY: questionSlide }] }}>
              <Card
                style={styles.questionCard}
                highlighted
                highlightColor={COLORS.goldBorder}
              >
                <Text style={styles.questionStar}>✦</Text>
                <Text style={styles.questionText}>
                  "{currentQuestion.question}"
                </Text>
                <Text style={styles.questionType}>
                  Type: {currentQuestion.type}
                </Text>
                <Button
                  label="Tap to Answer"
                  variant="gold"
                  onPress={() => setShowAnswerModal(true)}
                  fullWidth
                  style={{ marginTop: SPACING.md }}
                />
              </Card>
            </Animated.View>
          )}

          {/* Answer Result (inline) */}
          {answerResult && (
            <Card
              leftBorderColor={answerResult.isCorrect ? COLORS.success : COLORS.warning}
              style={styles.resultCard}
            >
              <Text style={[
                styles.resultTitle,
                { color: answerResult.isCorrect ? COLORS.success : COLORS.warning },
              ]}>
                {answerResult.isCorrect ? '✓ ' : '○ '}{answerResult.feedback}
              </Text>
              <Text style={[styles.resultPersona, { color: colors.primary }]}>
                {persona.name} says:
              </Text>
              <Text style={styles.resultText}>{answerResult.personaResponse}</Text>
              <View style={styles.resultMeta}>
                <Text style={styles.resultScore}>
                  {'★'.repeat(Math.round(answerResult.score / 20))}
                  {'☆'.repeat(5 - Math.round(answerResult.score / 20))}
                  {' '}({answerResult.score}%)
                </Text>
                {streak > 1 && (
                  <Text style={styles.streakBadge}>
                    Streak: {streak} 🔥
                  </Text>
                )}
              </View>
            </Card>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Action Bar */}
        <View style={styles.bottomBar}>
          <Button
            label="📊 Diagram"
            variant="secondary"
            size="sm"
            onPress={() => {}}
          />
          <Button
            label="▶ Next"
            onPress={handleNext}
            size="sm"
          />
          <Pressable
            onPress={() => setIsRecording(!isRecording)}
            style={[
              styles.micBtn,
              isRecording && styles.micBtnActive,
            ]}
          >
            <Text style={styles.micIcon}>🎤</Text>
          </Pressable>
        </View>

        {/* Answer Modal */}
        <Modal
          visible={showAnswerModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowAnswerModal(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}
          >
            <Pressable
              style={styles.modalBackdrop}
              onPress={() => setShowAnswerModal(false)}
            />
            <View style={styles.modalSheet}>
              <View style={styles.dragHandle} />

              <Text style={styles.modalLabel}>
                ✦ {persona.name} asks:
              </Text>
              <Text style={styles.modalQuestion}>
                "{currentQuestion?.question}"
              </Text>
              <Text style={styles.modalQType}>
                Question type: {currentQuestion?.type}
              </Text>

              <OrnamentalDivider />

              <TextInput
                style={styles.answerInput}
                placeholder="Type your answer..."
                placeholderTextColor={COLORS.textMuted}
                multiline
                value={answerText}
                onChangeText={setAnswerText}
                autoFocus
              />

              <Text style={styles.orText}>— or —</Text>

              <Pressable
                onPress={() => setIsRecording(!isRecording)}
                style={[
                  styles.voiceBtn,
                  isRecording && { borderColor: COLORS.error },
                ]}
              >
                <Text style={styles.voiceBtnIcon}>🎤</Text>
              </Pressable>
              <Text style={styles.voiceHint}>
                {isRecording ? '● Recording... tap to stop' : 'Tap to speak'}
              </Text>

              <Button
                label="Submit Answer"
                onPress={() => {
                  setShowAnswerModal(false);
                  handleSubmitAnswer();
                }}
                fullWidth
                disabled={!answerText.trim()}
                style={{ marginTop: SPACING.lg }}
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </Animated.View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  backBtn: {
    ...TYPOGRAPHY.heading,
    color: COLORS.white,
    fontSize: 24,
    width: 32,
  },
  headerTitle: {
    ...TYPOGRAPHY.displaySm,
    color: COLORS.white,
  },
  chipRow: {
    gap: SPACING.xs,
    paddingBottom: SPACING.md,
  },
  chip: {
    marginRight: 0,
  },
  personaBanner: {
    marginBottom: SPACING.md,
  },
  personaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personaInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  personaName: {
    ...TYPOGRAPHY.heading,
    color: COLORS.white,
  },
  personaCatch: {
    ...TYPOGRAPHY.caption,
    fontStyle: 'italic',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  metaText: {
    ...TYPOGRAPHY.micro,
    color: COLORS.textMuted,
  },
  lectureScroll: {
    flex: 1,
  },
  lectureContent: {
    gap: SPACING.md,
  },
  lectureBubble: {},
  lectureText: {
    ...TYPOGRAPHY.body,
    lineHeight: 22,
  },
  keyConceptBox: {
    marginTop: SPACING.md,
    padding: SPACING.sm,
    borderRadius: RADIUS.soft,
    backgroundColor: 'rgba(107, 78, 230, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(107, 78, 230, 0.2)',
  },
  keyConceptTitle: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  keyConceptText: {
    ...TYPOGRAPHY.body,
  },
  questionCard: {
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
  },
  questionStar: {
    color: COLORS.gold,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  questionText: {
    ...TYPOGRAPHY.heading,
    color: COLORS.goldLight,
    textAlign: 'center',
    lineHeight: 30,
  },
  questionType: {
    ...TYPOGRAPHY.micro,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  resultCard: {
    marginTop: SPACING.sm,
  },
  resultTitle: {
    ...TYPOGRAPHY.bodyBold,
    marginBottom: SPACING.sm,
  },
  resultPersona: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.xs,
  },
  resultText: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.md,
  },
  resultMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultScore: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gold,
  },
  streakBadge: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gold,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.round,
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  micBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.surfaceLight,
  },
  micBtnActive: {
    borderColor: COLORS.error,
  },
  micIcon: { fontSize: 18 },
  // Modal styles
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  modalSheet: {
    backgroundColor: COLORS.backgroundCard,
    borderTopLeftRadius: RADIUS.round,
    borderTopRightRadius: RADIUS.round,
    padding: SPACING.lg,
    maxHeight: '80%',
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.surface,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  modalLabel: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.gold,
  },
  modalQuestion: {
    ...TYPOGRAPHY.heading,
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
  modalQType: {
    ...TYPOGRAPHY.micro,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  answerInput: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.soft,
    padding: SPACING.md,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  orText: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    marginVertical: SPACING.md,
  },
  voiceBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.surface,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.level2,
    borderWidth: 2,
    borderColor: COLORS.surfaceLight,
  },
  voiceBtnIcon: { fontSize: 28 },
  voiceHint: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});
