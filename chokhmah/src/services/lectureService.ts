import { PERSONAS } from './personas';
import { PersonaId } from '../constants/theme';
import {
  SocraticQuestion,
  QuestionType,
  AnswerResult,
  BookChapter,
} from '../types';

const QUESTION_TEMPLATES: Record<QuestionType, string[]> = {
  recall: [
    'What is the main finding discussed in this section?',
    'Can you name the key concept introduced here?',
    'What did the author observe about {topic}?',
  ],
  comprehension: [
    'In your own words, explain why {topic} matters.',
    'How would you summarize the connection between {concept1} and {concept2}?',
    'What is the underlying principle behind {topic}?',
  ],
  application: [
    'How could you apply {topic} in your daily life?',
    'Give an example of how {concept} works in practice.',
    'When might {technique} be most useful?',
  ],
  analysis: [
    'What evidence supports the claim about {topic}?',
    'How does {concept1} differ from {concept2}?',
    'What assumptions underlie the argument about {topic}?',
  ],
  synthesis: [
    'How does {topic} connect to what we learned in a previous chapter?',
    'Can you combine {concept1} and {concept2} into a new insight?',
    'What broader pattern do you see emerging?',
  ],
  evaluation: [
    'Do you agree with the author\'s conclusion about {topic}? Why or why not?',
    'What are the strengths and weaknesses of the {concept} approach?',
    'How convincing is the evidence presented for {topic}?',
  ],
  perspective: [
    'Why do you think ancient humans approached {topic} differently?',
    'How might someone from a different culture view {concept}?',
    'What would change if we applied {topic} universally?',
  ],
  analogy: [
    '{topic} is like what everyday experience?',
    'What metaphor best captures the essence of {concept}?',
    'How is {concept1} similar to {concept2} in an unexpected way?',
  ],
  prediction: [
    'What do you think the long-term implications of {topic} are?',
    'How might {concept} evolve in the next decade?',
    'If everyone adopted {technique}, what would change?',
  ],
  reflection: [
    'What surprised you most about {topic}?',
    'How has this changed your thinking about {concept}?',
    'What personal experience relates to what you just learned?',
  ],
};

const DIFFICULTY_TO_TYPES: Record<number, QuestionType[]> = {
  1: ['recall', 'comprehension'],
  2: ['comprehension', 'application', 'reflection'],
  3: ['application', 'analysis', 'perspective'],
  4: ['analysis', 'synthesis', 'evaluation', 'prediction'],
};

export function generateQuestion(
  chapter: BookChapter,
  difficulty: number,
  _personaId: PersonaId
): SocraticQuestion {
  const clampedDiff = Math.min(4, Math.max(1, difficulty));
  const availableTypes = DIFFICULTY_TO_TYPES[clampedDiff];
  const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
  const templates = QUESTION_TEMPLATES[type];
  const template = templates[Math.floor(Math.random() * templates.length)];

  const concepts = chapter.keyConcepts;
  const question = template
    .replace('{topic}', concepts[0] || chapter.title)
    .replace('{concept}', concepts[0] || 'this idea')
    .replace('{concept1}', concepts[0] || 'the first concept')
    .replace('{concept2}', concepts[1] || 'the second concept')
    .replace('{technique}', concepts[2] || 'this technique');

  return {
    id: `q-${chapter.id}-${Date.now()}`,
    type,
    question,
    chapterId: chapter.id,
    difficulty: clampedDiff,
  };
}

export function evaluateAnswer(
  _question: SocraticQuestion,
  answer: string,
  personaId: PersonaId
): AnswerResult {
  const persona = PERSONAS[personaId];
  const wordCount = answer.trim().split(/\s+/).length;

  // Simple scoring: based on answer length and effort
  let score: number;
  if (wordCount < 3) score = 20;
  else if (wordCount < 10) score = 50;
  else if (wordCount < 25) score = 70;
  else if (wordCount < 50) score = 85;
  else score = 95;

  // Add some variance
  score = Math.min(100, score + Math.floor(Math.random() * 15));

  const isCorrect = score >= 60;
  const catchPhrase = persona.catchPhrases[Math.floor(Math.random() * persona.catchPhrases.length)];

  let feedback: string;
  if (score >= 85) feedback = 'Strong understanding!';
  else if (score >= 60) feedback = 'Good effort — you\'re on the right track.';
  else feedback = 'Let\'s revisit this concept together.';

  const personaResponse = isCorrect
    ? `${catchPhrase} Your insight shows real depth of thought. ${feedback}`
    : `${catchPhrase} Don't be discouraged — ${feedback} Let me help guide you deeper.`;

  return {
    questionId: _question.id,
    answer,
    score,
    feedback,
    personaResponse,
    isCorrect,
  };
}

export function generateLectureSegment(
  chapter: BookChapter,
  personaId: PersonaId,
  _segmentIndex: number
): string {
  const persona = PERSONAS[personaId];
  const content = chapter.content;

  // Split content into ~3 segments
  const sentences = content.split('. ');
  const segmentSize = Math.ceil(sentences.length / 3);
  const start = _segmentIndex * segmentSize;
  const segment = sentences.slice(start, start + segmentSize).join('. ');

  if (!segment) return content;

  // Add persona flavor
  const intros: Record<string, string> = {
    mentor: 'Let me share something important with you: ',
    professor: 'The research demonstrates the following: ',
    storyteller: 'Picture this — ',
    philosopher: 'Consider the deeper implications: ',
    curious: 'Oh, this is the fascinating part! ',
    mindful: 'Take a moment to absorb this: ',
    creative: 'Imagine painting this idea on a canvas: ',
    sage: 'Ancient wisdom aligns with what follows: ',
    analytical: 'Breaking this down systematically: ',
    poetic: 'Like a river of knowledge, this flows: ',
  };

  const intro = intros[persona.style] || '';
  return `${intro}${segment}${segment.endsWith('.') ? '' : '.'}`;
}
