import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersonaId } from '../constants/theme';
import {
  Book,
  UserProgress,
  LearningSession,
  UserMood,
  Achievement,
} from '../types';

interface AppState {
  // Books
  books: Book[];
  currentBookId: string | null;
  currentChapterId: string | null;

  // Persona
  selectedPersonaId: PersonaId;

  // Session
  activeSession: LearningSession | null;
  sessionHistory: LearningSession[];

  // Progress
  progress: UserProgress;

  // UI
  isFirstLaunch: boolean;
  dailyQuoteIndex: number;

  // Actions
  setCurrentBook: (bookId: string) => void;
  setCurrentChapter: (chapterId: string) => void;
  selectPersona: (id: PersonaId) => void;
  startSession: (session: LearningSession) => void;
  endSession: () => void;
  updateDifficulty: (difficulty: number) => void;
  updateMood: (mood: UserMood) => void;
  recordAnswer: (correct: boolean) => void;
  markChapterCompleted: (bookId: string, chapterId: string) => void;
  incrementStreak: () => void;
  addMinutesLearned: (minutes: number) => void;
  unlockAchievement: (achievementId: string) => void;
  setFirstLaunchComplete: () => void;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_answer', title: 'First Step', description: 'Answer your first question', icon: '🏆', isUnlocked: false },
  { id: 'five_chapters', title: 'Scholar', description: 'Complete 5 chapters', icon: '📚', isUnlocked: false },
  { id: 'seven_streak', title: 'Devoted', description: 'Maintain a 7-day streak', icon: '🔥', isUnlocked: false },
  { id: 'all_personas', title: 'Renaissance', description: 'Learn with all 10 personas', icon: '🎭', isUnlocked: false },
  { id: 'perfect_score', title: 'Mastery', description: 'Get 100% on a chapter review', icon: '⭐', isUnlocked: false },
  { id: 'one_hour', title: 'Deep Thinker', description: 'Study for 1 hour in a day', icon: '🧠', isUnlocked: false },
  { id: 'high_retention', title: 'Iron Memory', description: 'Reach 90% retention rate', icon: '💎', isUnlocked: false },
  { id: 'ten_chapters', title: 'Wise One', description: 'Complete 10 chapters', icon: '🦉', isUnlocked: false },
];

const DEFAULT_PROGRESS: UserProgress = {
  currentStreak: 0,
  bestStreak: 0,
  totalMinutesLearned: 0,
  totalQuestionsAnswered: 0,
  retentionRate: 0,
  level: 1,
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  achievements: DEFAULT_ACHIEVEMENTS,
  personaMastery: {
    solomon: 0, athena: 0, marcus: 0, hypatia: 0, albert: 0,
    maya: 0, leonardo: 0, confucius: 0, ada: 0, rumi: 0,
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      books: [],
      currentBookId: null,
      currentChapterId: null,
      selectedPersonaId: 'solomon',
      activeSession: null,
      sessionHistory: [],
      progress: DEFAULT_PROGRESS,
      isFirstLaunch: true,
      dailyQuoteIndex: 0,

      setCurrentBook: (bookId) => set({ currentBookId: bookId }),
      setCurrentChapter: (chapterId) => set({ currentChapterId: chapterId }),
      selectPersona: (id) => set({ selectedPersonaId: id }),

      startSession: (session) => set({ activeSession: session }),

      endSession: () => {
        const { activeSession, sessionHistory } = get();
        if (activeSession) {
          const ended = { ...activeSession, endedAt: Date.now() };
          set({
            activeSession: null,
            sessionHistory: [...sessionHistory, ended],
          });
        }
      },

      updateDifficulty: (difficulty) => {
        const { activeSession } = get();
        if (activeSession) {
          set({ activeSession: { ...activeSession, difficulty } });
        }
      },

      updateMood: (mood) => {
        const { activeSession } = get();
        if (activeSession) {
          set({ activeSession: { ...activeSession, mood } });
        }
      },

      recordAnswer: (correct) => {
        const { activeSession, progress } = get();
        if (activeSession) {
          const updated = {
            ...activeSession,
            questionsAnswered: activeSession.questionsAnswered + 1,
            correctAnswers: activeSession.correctAnswers + (correct ? 1 : 0),
          };
          const totalCorrect = progress.totalQuestionsAnswered > 0
            ? (progress.retentionRate / 100) * progress.totalQuestionsAnswered + (correct ? 1 : 0)
            : correct ? 1 : 0;
          const totalQ = progress.totalQuestionsAnswered + 1;

          set({
            activeSession: updated,
            progress: {
              ...progress,
              totalQuestionsAnswered: totalQ,
              retentionRate: Math.round((totalCorrect / totalQ) * 1000) / 10,
            },
          });
        }
      },

      markChapterCompleted: (bookId, chapterId) => {
        const { books } = get();
        set({
          books: books.map(b =>
            b.id === bookId
              ? {
                  ...b,
                  chapters: b.chapters.map(c =>
                    c.id === chapterId ? { ...c, isCompleted: true } : c
                  ),
                }
              : b
          ),
        });
      },

      incrementStreak: () => {
        const { progress } = get();
        const newStreak = progress.currentStreak + 1;
        set({
          progress: {
            ...progress,
            currentStreak: newStreak,
            bestStreak: Math.max(newStreak, progress.bestStreak),
          },
        });
      },

      addMinutesLearned: (minutes) => {
        const { progress } = get();
        const dayOfWeek = new Date().getDay();
        const newWeekly = [...progress.weeklyActivity];
        newWeekly[dayOfWeek] += minutes;
        set({
          progress: {
            ...progress,
            totalMinutesLearned: progress.totalMinutesLearned + minutes,
            weeklyActivity: newWeekly,
          },
        });
      },

      unlockAchievement: (achievementId) => {
        const { progress } = get();
        set({
          progress: {
            ...progress,
            achievements: progress.achievements.map(a =>
              a.id === achievementId
                ? { ...a, isUnlocked: true, unlockedAt: Date.now() }
                : a
            ),
          },
        });
      },

      setFirstLaunchComplete: () => set({ isFirstLaunch: false }),
    }),
    {
      name: 'chokhmah-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        books: state.books,
        currentBookId: state.currentBookId,
        selectedPersonaId: state.selectedPersonaId,
        sessionHistory: state.sessionHistory,
        progress: state.progress,
        isFirstLaunch: state.isFirstLaunch,
        dailyQuoteIndex: state.dailyQuoteIndex,
      }),
    }
  )
);
