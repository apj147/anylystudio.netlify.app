import { PersonaId } from '../constants/theme';

// ─── Lecture System Types ────────────────────────────────────
export type LectureStyle =
  | 'mentor' | 'professor' | 'storyteller' | 'philosopher'
  | 'curious' | 'mindful' | 'creative' | 'sage'
  | 'analytical' | 'poetic';

export interface PersonaCharacteristics {
  warmth: number;
  authority: number;
  humor: number;
  patience: number;
  encouragement: number;
}

export interface LecturerPersona {
  id: PersonaId;
  name: string;
  title: string;
  style: LectureStyle;
  voiceId: string;
  characteristics: PersonaCharacteristics;
  catchPhrases: string[];
  introTemplate: string;
  description: string;
}

// ─── Book Types ──────────────────────────────────────────────
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  chapters: BookChapter[];
  totalChapters: number;
  isFeatured?: boolean;
  isImported?: boolean;
}

export interface BookChapter {
  id: string;
  number: number;
  title: string;
  content: string;
  keyConcepts: string[];
  isCompleted: boolean;
  timeSpentMinutes: number;
}

// ─── Learning Types ──────────────────────────────────────────
export type QuestionType =
  | 'recall' | 'comprehension' | 'application' | 'analysis'
  | 'synthesis' | 'evaluation' | 'perspective' | 'analogy'
  | 'prediction' | 'reflection';

export interface SocraticQuestion {
  id: string;
  type: QuestionType;
  question: string;
  chapterId: string;
  difficulty: number;
}

export interface AnswerResult {
  questionId: string;
  answer: string;
  score: number;
  feedback: string;
  personaResponse: string;
  isCorrect: boolean;
}

export interface LearningSession {
  id: string;
  bookId: string;
  chapterId: string;
  personaId: PersonaId;
  startedAt: number;
  endedAt?: number;
  questionsAnswered: number;
  correctAnswers: number;
  difficulty: number;
  mood: UserMood;
}

export type UserMood = 'engaged' | 'confused' | 'bored' | 'excited' | 'struggling';

// ─── Progress Types ──────────────────────────────────────────
export interface UserProgress {
  currentStreak: number;
  bestStreak: number;
  totalMinutesLearned: number;
  totalQuestionsAnswered: number;
  retentionRate: number;
  level: number;
  weeklyActivity: number[]; // minutes per day, 7 entries
  achievements: Achievement[];
  personaMastery: Record<PersonaId, number>; // 0-100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: number;
}

// ─── Navigation Types ────────────────────────────────────────
export type RootTabParamList = {
  Home: undefined;
  Library: undefined;
  Explore: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  SolomonsVoice: { bookId: string; chapterId?: string; personaId?: PersonaId };
  BookDetail: { bookId: string };
  Reader: { bookId: string; chapterId: string };
};

// ─── Diagram Types ───────────────────────────────────────────
export type DiagramType =
  | 'breathing_cycle' | 'concept_map' | 'timeline'
  | 'comparison' | 'process_flow' | 'statistics' | 'anatomy';

export interface Diagram {
  id: string;
  type: DiagramType;
  title: string;
  chapterId: string;
}
