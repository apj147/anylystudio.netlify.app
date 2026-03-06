import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Animated,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// ═══════════════════════════════════════════════════════════════
// CHOKHMAH - Wisdom Learning App (Expo Snack Edition)
// ═══════════════════════════════════════════════════════════════

// ─── Theme Constants ───────────────────────────────────────────
const COLORS = {
  primary: '#6B4EE6',
  primaryLight: '#8B6FFF',
  gold: '#FFD700',
  goldLight: '#FFE44D',
  background: '#0D0D12',
  backgroundCard: '#1A1A24',
  surface: '#252535',
  text: '#FFFFFF',
  textSecondary: '#B0B0C0',
  textMuted: '#6B6B80',
  success: '#4CAF50',
  error: '#EF5350',
};

const PERSONA_COLORS = {
  solomon: { primary: '#6B4EE6', glow: 'rgba(107,78,230,0.3)' },
  athena: { primary: '#607D8B', glow: 'rgba(96,125,139,0.3)' },
  marcus: { primary: '#FF7043', glow: 'rgba(255,112,67,0.3)' },
  hypatia: { primary: '#AB47BC', glow: 'rgba(171,71,188,0.3)' },
  albert: { primary: '#42A5F5', glow: 'rgba(66,165,245,0.3)' },
  maya: { primary: '#66BB6A', glow: 'rgba(102,187,106,0.3)' },
  leonardo: { primary: '#FFA726', glow: 'rgba(255,167,38,0.3)' },
  confucius: { primary: '#8D6E63', glow: 'rgba(141,110,99,0.3)' },
  ada: { primary: '#26C6DA', glow: 'rgba(38,198,218,0.3)' },
  rumi: { primary: '#EC407A', glow: 'rgba(236,64,122,0.3)' },
};

// ─── Data ──────────────────────────────────────────────────────
const PERSONAS = [
  { id: 'solomon', name: 'Solomon', title: 'The Mentor', emoji: '👑', catchPhrase: 'Every question is a seed of wisdom...' },
  { id: 'athena', name: 'Athena', title: 'The Professor', emoji: '🦉', catchPhrase: 'The evidence clearly shows...' },
  { id: 'marcus', name: 'Marcus', title: 'The Storyteller', emoji: '🔥', catchPhrase: 'Picture this scene...' },
  { id: 'hypatia', name: 'Hypatia', title: 'The Philosopher', emoji: '📐', catchPhrase: 'But what does this truly mean?' },
  { id: 'albert', name: 'Albert', title: 'The Curious', emoji: '💡', catchPhrase: "Isn't that absolutely fascinating?!" },
  { id: 'maya', name: 'Maya', title: 'The Mindful', emoji: '🌿', catchPhrase: 'Take a breath. Let this settle in.' },
  { id: 'leonardo', name: 'Leonardo', title: 'The Creative', emoji: '🎨', catchPhrase: 'Every idea is a brushstroke...' },
  { id: 'confucius', name: 'Confucius', title: 'The Sage', emoji: '🎋', catchPhrase: 'The wise person learns from all things.' },
  { id: 'ada', name: 'Ada', title: 'The Analytical', emoji: '⚡', catchPhrase: 'I see a pattern emerging here...' },
  { id: 'rumi', name: 'Rumi', title: 'The Poetic', emoji: '🌹', catchPhrase: 'Let this truth sing through you.' },
];

const CHAPTERS = [
  { id: 1, title: 'The Experiment', content: 'James Nestor begins his exploration of breathing by participating in a Stanford University study. For ten days, he breathes only through his mouth while researchers measure the physiological effects. The results are devastating: blood pressure spikes, stress hormones surge, snoring intensifies, and cognitive performance drops.' },
  { id: 2, title: 'Lost Art', content: 'Ancient civilizations across the globe — from Chinese Taoists to Hindu yogis to Greek physicians — all understood breathing as a foundational health practice. The word "spirit" in Latin (spiritus), Greek (pneuma), Hebrew (ruach), and Sanskrit (prana) all translate to "breath."' },
  { id: 3, title: 'A Nose Job', content: 'The nose is a sophisticated organ that has evolved over millions of years. It filters, humidifies, and warms air before it reaches the lungs. Nasal breathing produces nitric oxide — a molecule that increases oxygen absorption by 18% and kills bacteria and viruses.' },
];

const QUESTIONS = [
  { type: 'Comprehension', text: 'Why is nasal breathing considered superior to mouth breathing?' },
  { type: 'Application', text: 'How could you apply this breathing knowledge in your daily life?' },
  { type: 'Perspective', text: 'Why do you think ancient humans understood breathing better than we do?' },
  { type: 'Analysis', text: 'What evidence supports the claim about nitric oxide production?' },
];

const WISDOM_QUOTES = [
  { text: 'The beginning of wisdom is this: Get wisdom.', source: 'Proverbs 4:7' },
  { text: 'Wisdom is more precious than rubies.', source: 'Proverbs 8:11' },
  { text: 'The wise store up knowledge.', source: 'Proverbs 10:14' },
];

// ─── Components ────────────────────────────────────────────────

function Card({ children, style, highlighted, glowColor }) {
  return (
    <View style={[
      styles.card,
      highlighted && { borderWidth: 1, borderColor: 'rgba(255,215,0,0.25)' },
      glowColor && { shadowColor: glowColor, shadowOpacity: 0.4, shadowRadius: 12 },
      style,
    ]}>
      {children}
    </View>
  );
}

function PersonaAvatar({ persona, size = 48, selected }) {
  const colors = PERSONA_COLORS[persona.id];
  return (
    <View style={[
      styles.avatar,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}20`,
      },
      selected && { shadowColor: colors.primary, shadowOpacity: 0.5, shadowRadius: 10 },
    ]}>
      <Text style={{ fontSize: size * 0.45 }}>{persona.emoji}</Text>
    </View>
  );
}

function ProgressBar({ progress, color }) {
  return (
    <View style={styles.progressTrack}>
      <LinearGradient
        colors={color || [COLORS.primary, COLORS.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressFill, { width: `${progress}%` }]}
      />
    </View>
  );
}

function OrnamentalDivider() {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerSymbol}>✦</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

// ─── Screens ───────────────────────────────────────────────────

function HomeScreen({ onNavigate, streak, selectedPersona }) {
  const quote = WISDOM_QUOTES[Math.floor(Math.random() * WISDOM_QUOTES.length)];
  const flameScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flameScale, { toValue: 1.2, duration: 800, useNativeDriver: true }),
        Animated.timing(flameScale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good evening, Seeker</Text>
        <View style={styles.streakRow}>
          <Text style={styles.streakText}>✦ Day {streak} Streak</Text>
          <Animated.Text style={[styles.flame, { transform: [{ scale: flameScale }] }]}>🔥</Animated.Text>
        </View>
      </View>

      {/* Daily Wisdom */}
      <Card highlighted>
        <Text style={styles.quoteText}>❝ {quote.text} ❞</Text>
        <Text style={styles.quoteSource}>— {quote.source}</Text>
        <OrnamentalDivider />
      </Card>

      {/* Continue Learning */}
      <Text style={styles.sectionTitle}>Continue Learning</Text>
      <Card>
        <View style={styles.bookRow}>
          <LinearGradient colors={[COLORS.primary, COLORS.primaryLight]} style={styles.bookCover}>
            <Text style={{ fontSize: 28 }}>📖</Text>
          </LinearGradient>
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>Breath</Text>
            <Text style={styles.bookAuthor}>James Nestor</Text>
            <Text style={styles.bookMeta}>Ch.1 of 3</Text>
          </View>
        </View>
        <ProgressBar progress={33} />
        <Text style={styles.progressPercent}>33%</Text>
        <Pressable
          style={styles.primaryButton}
          onPress={() => onNavigate('solomons')}
        >
          <Text style={styles.primaryButtonText}>▶  Continue with Solomon</Text>
        </Pressable>
      </Card>

      {/* Quick Start Personas */}
      <Text style={styles.sectionTitle}>Quick Start</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.personaScroll}>
        {PERSONAS.slice(0, 5).map((persona) => (
          <Pressable
            key={persona.id}
            style={[
              styles.personaCard,
              selectedPersona === persona.id && { borderColor: PERSONA_COLORS[persona.id].primary },
            ]}
            onPress={() => onNavigate('solomons', persona.id)}
          >
            <PersonaAvatar persona={persona} size={40} selected={selectedPersona === persona.id} />
            <Text style={styles.personaName}>{persona.name}</Text>
            <Text style={[styles.personaTitle, { color: PERSONA_COLORS[persona.id].primary }]}>
              {persona.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>42</Text>
          <Text style={styles.statLabel}>mins today</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>89%</Text>
          <Text style={styles.statLabel}>retention</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>3.2</Text>
          <Text style={styles.statLabel}>hrs total</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function SolomonsVoiceScreen({ onBack, personaId }) {
  const persona = PERSONAS.find(p => p.id === personaId) || PERSONAS[0];
  const colors = PERSONA_COLORS[persona.id];
  const [chapterIdx, setChapterIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);

  const chapter = CHAPTERS[chapterIdx];
  const question = QUESTIONS[chapterIdx % QUESTIONS.length];

  const handleSubmit = () => {
    const score = Math.min(100, 60 + answer.split(' ').length * 3);
    const isCorrect = score >= 70;
    setResult({
      score,
      isCorrect,
      feedback: isCorrect ? 'Strong understanding!' : "Let's explore this more.",
    });
    if (isCorrect) setStreak(s => s + 1);
    else setStreak(0);
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.svHeader}>
        <Pressable onPress={onBack}>
          <Text style={styles.backBtn}>←</Text>
        </Pressable>
        <Text style={styles.svTitle}>Solomon's Voice</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Chapter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        {CHAPTERS.map((ch, idx) => (
          <Pressable
            key={ch.id}
            style={[styles.chip, idx === chapterIdx && styles.chipActive]}
            onPress={() => { setChapterIdx(idx); setResult(null); }}
          >
            <Text style={[styles.chipText, idx === chapterIdx && styles.chipTextActive]}>
              Ch.{ch.id}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Persona Banner */}
      <Card style={[styles.personaBanner, { borderColor: colors.primary + '40' }]}>
        <View style={styles.personaBannerRow}>
          <PersonaAvatar persona={persona} size={56} selected />
          <View style={styles.personaBannerInfo}>
            <Text style={styles.personaBannerName}>{persona.name}</Text>
            <Text style={[styles.personaBannerCatch, { color: colors.primary }]}>
              "{persona.catchPhrase}"
            </Text>
          </View>
        </View>
      </Card>

      {/* Content */}
      <ScrollView style={styles.lectureScroll} contentContainerStyle={{ padding: 16 }}>
        <Card style={{ borderLeftWidth: 3, borderLeftColor: colors.primary }}>
          <Text style={styles.lectureText}>{chapter.content}</Text>
        </Card>

        {/* Question */}
        <Card highlighted style={{ marginTop: 16 }}>
          <Text style={styles.questionStar}>✦</Text>
          <Text style={styles.questionText}>"{question.text}"</Text>
          <Text style={styles.questionType}>Type: {question.type}</Text>
          {!result ? (
            <Pressable style={styles.goldButton} onPress={() => setShowModal(true)}>
              <Text style={styles.goldButtonText}>Tap to Answer</Text>
            </Pressable>
          ) : (
            <View style={[styles.resultBox, { borderLeftColor: result.isCorrect ? COLORS.success : COLORS.error }]}>
              <Text style={[styles.resultTitle, { color: result.isCorrect ? COLORS.success : COLORS.error }]}>
                {result.isCorrect ? '✓' : '○'} {result.feedback}
              </Text>
              <Text style={styles.resultScore}>
                {'★'.repeat(Math.round(result.score / 20))}{'☆'.repeat(5 - Math.round(result.score / 20))} ({result.score}%)
              </Text>
              {streak > 1 && <Text style={styles.streakBadge}>Streak: {streak} 🔥</Text>}
            </View>
          )}
        </Card>
      </ScrollView>

      {/* Answer Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.dragHandle} />
            <Text style={styles.modalLabel}>✦ {persona.name} asks:</Text>
            <Text style={styles.modalQuestion}>"{question.text}"</Text>
            <OrnamentalDivider />
            <TextInput
              style={styles.answerInput}
              placeholder="Type your answer..."
              placeholderTextColor={COLORS.textMuted}
              multiline
              value={answer}
              onChangeText={setAnswer}
            />
            <Pressable
              style={[styles.primaryButton, !answer.trim() && { opacity: 0.5 }]}
              onPress={() => { setShowModal(false); handleSubmit(); }}
              disabled={!answer.trim()}
            >
              <Text style={styles.primaryButtonText}>Submit Answer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function ExploreScreen({ onSelect, selectedPersona }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Text style={styles.pageTitle}>Explore Personas</Text>
      <Text style={styles.pageSubtitle}>"Each voice carries its own wisdom"</Text>
      <OrnamentalDivider />

      {PERSONAS.map((persona) => {
        const colors = PERSONA_COLORS[persona.id];
        const isSelected = selectedPersona === persona.id;
        return (
          <Pressable key={persona.id} onPress={() => onSelect(persona.id)}>
            <Card
              style={[styles.exploreCard, isSelected && { borderColor: colors.primary }]}
              glowColor={isSelected ? colors.primary : null}
            >
              <View style={styles.exploreRow}>
                <PersonaAvatar persona={persona} size={56} selected={isSelected} />
                <View style={styles.exploreInfo}>
                  <Text style={styles.exploreName}>{persona.name}</Text>
                  <Text style={[styles.exploreTitle, { color: colors.primary }]}>{persona.title}</Text>
                </View>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[styles.exploreCatch, { color: colors.primary + 'B0' }]}>
                "{persona.catchPhrase}"
              </Text>
            </Card>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function ProgressScreen({ streak }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Text style={styles.pageTitle}>Progress</Text>
      <Text style={styles.pageSubtitle}>Your wisdom journey</Text>

      {/* Streak Card */}
      <Card highlighted>
        <Text style={styles.streakCardTitle}>🔥 {streak}-Day Streak!</Text>
        <View style={styles.streakDays}>
          {days.map((d, i) => (
            <View key={i} style={styles.streakDay}>
              <Text style={styles.streakDayLabel}>{d}</Text>
              <View style={[styles.streakDot, i < streak && styles.streakDotActive]}>
                {i < streak && <Text style={styles.streakDotSymbol}>✦</Text>}
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statBoxLarge}>
          <Text style={styles.statValueLarge}>89%</Text>
          <Text style={styles.statLabel}>Retention Rate</Text>
        </View>
        <View style={styles.statBoxLarge}>
          <Text style={styles.statValueLarge}>42</Text>
          <Text style={styles.statLabel}>Questions</Text>
        </View>
      </View>

      {/* Achievements */}
      <Text style={styles.sectionTitle}>Achievements</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {['🏆', '📚', '🔥', '🎭', '⭐'].map((icon, i) => (
          <View key={i} style={[styles.achieveBadge, i > 2 && styles.achieveLocked]}>
            <Text style={styles.achieveIcon}>{icon}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

// ─── Main App ──────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedPersona, setSelectedPersona] = useState('solomon');
  const [streak] = useState(7);

  const renderScreen = () => {
    switch (screen) {
      case 'solomons':
        return <SolomonsVoiceScreen onBack={() => setScreen('home')} personaId={selectedPersona} />;
      case 'explore':
        return <ExploreScreen onSelect={setSelectedPersona} selectedPersona={selectedPersona} />;
      case 'progress':
        return <ProgressScreen streak={streak} />;
      default:
        return (
          <HomeScreen
            onNavigate={(s, p) => { if (p) setSelectedPersona(p); setScreen(s); }}
            streak={streak}
            selectedPersona={selectedPersona}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(107,78,230,0.08)', 'transparent']}
        style={styles.constellationOverlay}
      />
      <StatusBar style="light" />
      {renderScreen()}

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {[
          { key: 'home', icon: '🏠', label: 'Home' },
          { key: 'explore', icon: '🧭', label: 'Explore' },
          { key: 'progress', icon: '📊', label: 'Progress' },
        ].map((tab) => (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => setScreen(tab.key)}
          >
            <Text style={[styles.tabIcon, screen === tab.key && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, screen === tab.key && styles.tabLabelActive]}>
              {tab.label}
            </Text>
            {screen === tab.key && <View style={styles.tabIndicator} />}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  constellationOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: '35%' },
  screen: { flex: 1 },
  screenContent: { padding: 16, paddingTop: 48, paddingBottom: 100 },

  // Cards
  card: {
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },

  // Header
  header: { marginBottom: 16 },
  greeting: { fontSize: 24, fontWeight: '600', color: COLORS.text },
  streakRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  streakText: { fontSize: 12, color: COLORS.gold },
  flame: { fontSize: 16, marginLeft: 4 },

  // Quote
  quoteText: { fontSize: 16, fontStyle: 'italic', color: COLORS.goldLight, textAlign: 'center', lineHeight: 24 },
  quoteSource: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center', marginTop: 8 },

  // Divider
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,215,0,0.2)' },
  dividerSymbol: { marginHorizontal: 8, color: COLORS.gold, fontSize: 12 },

  // Section
  sectionTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 12, marginTop: 8 },

  // Book Card
  bookRow: { flexDirection: 'row', marginBottom: 12 },
  bookCover: { width: 56, height: 80, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  bookInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  bookTitle: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  bookAuthor: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  bookMeta: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },

  // Progress Bar
  progressTrack: { height: 4, backgroundColor: COLORS.surface, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: 4, borderRadius: 2 },
  progressPercent: { fontSize: 10, color: COLORS.textMuted, textAlign: 'right', marginTop: 4, marginBottom: 12 },

  // Buttons
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: { color: COLORS.text, fontWeight: '600', fontSize: 14 },
  goldButton: {
    backgroundColor: COLORS.gold,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  goldButtonText: { color: COLORS.background, fontWeight: '600', fontSize: 14 },

  // Personas
  personaScroll: { marginBottom: 16 },
  personaCard: {
    width: 80,
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: COLORS.backgroundCard,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  personaName: { fontSize: 10, color: COLORS.text, marginTop: 4, textAlign: 'center' },
  personaTitle: { fontSize: 9, textAlign: 'center' },
  avatar: { borderWidth: 2, alignItems: 'center', justifyContent: 'center' },

  // Stats
  statsRow: { flexDirection: 'row', gap: 8 },
  statBox: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, padding: 12, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '600', color: COLORS.gold },
  statLabel: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },

  // Solomon's Voice
  svHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingTop: 48 },
  svTitle: { fontSize: 20, fontWeight: '600', color: COLORS.text },
  backBtn: { fontSize: 24, color: COLORS.text },
  chipScroll: { paddingHorizontal: 16, marginBottom: 12 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.surface, marginRight: 8 },
  chipActive: { backgroundColor: COLORS.primary },
  chipText: { fontSize: 12, color: COLORS.textMuted },
  chipTextActive: { color: COLORS.text },
  personaBanner: { marginHorizontal: 16, borderWidth: 1 },
  personaBannerRow: { flexDirection: 'row', alignItems: 'center' },
  personaBannerInfo: { flex: 1, marginLeft: 12 },
  personaBannerName: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  personaBannerCatch: { fontSize: 12, fontStyle: 'italic', marginTop: 2 },
  lectureScroll: { flex: 1 },
  lectureText: { fontSize: 14, color: COLORS.text, lineHeight: 22 },
  questionStar: { color: COLORS.gold, fontSize: 18, textAlign: 'center' },
  questionText: { fontSize: 18, fontWeight: '600', color: COLORS.goldLight, textAlign: 'center', marginTop: 8, lineHeight: 26 },
  questionType: { fontSize: 10, color: COLORS.textMuted, textAlign: 'center', marginTop: 8 },
  resultBox: { marginTop: 12, padding: 12, borderRadius: 8, backgroundColor: COLORS.surface, borderLeftWidth: 3 },
  resultTitle: { fontWeight: '600', marginBottom: 4 },
  resultScore: { fontSize: 12, color: COLORS.gold },
  streakBadge: { fontSize: 12, color: COLORS.gold, marginTop: 4 },

  // Modal
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalSheet: { backgroundColor: COLORS.backgroundCard, borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 },
  dragHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.surface, alignSelf: 'center', marginBottom: 16 },
  modalLabel: { fontSize: 14, fontWeight: '600', color: COLORS.gold },
  modalQuestion: { fontSize: 18, fontWeight: '600', color: COLORS.text, marginTop: 8, lineHeight: 26 },
  answerInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    color: COLORS.text,
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 16,
  },

  // Explore
  pageTitle: { fontSize: 28, fontWeight: '700', color: COLORS.text },
  pageSubtitle: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4, fontStyle: 'italic' },
  exploreCard: { borderWidth: 1, borderColor: COLORS.surface },
  exploreRow: { flexDirection: 'row', alignItems: 'center' },
  exploreInfo: { flex: 1, marginLeft: 12 },
  exploreName: { fontSize: 18, fontWeight: '600', color: COLORS.text },
  exploreTitle: { fontSize: 12 },
  exploreCatch: { fontSize: 12, fontStyle: 'italic', marginTop: 8 },
  checkmark: { fontSize: 20, color: COLORS.success },

  // Progress Screen
  streakCardTitle: { fontSize: 22, fontWeight: '600', color: COLORS.gold, textAlign: 'center', marginBottom: 16 },
  streakDays: { flexDirection: 'row', justifyContent: 'space-around' },
  streakDay: { alignItems: 'center' },
  streakDayLabel: { fontSize: 12, color: COLORS.textMuted, marginBottom: 4 },
  streakDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center' },
  streakDotActive: { backgroundColor: COLORS.gold },
  streakDotSymbol: { color: COLORS.background, fontSize: 12 },
  statsGrid: { flexDirection: 'row', gap: 8, marginTop: 16 },
  statBoxLarge: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, padding: 16, alignItems: 'center' },
  statValueLarge: { fontSize: 28, fontWeight: '600', color: COLORS.gold },
  achieveBadge: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: COLORS.backgroundCard,
    borderWidth: 2, borderColor: COLORS.gold,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 8,
  },
  achieveLocked: { opacity: 0.4, borderColor: COLORS.surface },
  achieveIcon: { fontSize: 24 },

  // Tab Bar
  tabBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundCard,
    borderTopWidth: 1, borderTopColor: COLORS.surface,
    paddingBottom: 20, paddingTop: 8,
  },
  tab: { flex: 1, alignItems: 'center' },
  tabIcon: { fontSize: 20, opacity: 0.5 },
  tabIconActive: { opacity: 1 },
  tabLabel: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  tabLabelActive: { color: COLORS.primary },
  tabIndicator: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.primary, marginTop: 4 },
});
