# Chokhmah — Wisdom Learning App

## Overview
Chokhmah (Hebrew: חכמה, "wisdom") is a React Native Expo mobile app that transforms book learning through AI-powered adaptive lectures. Named after King Solomon's wisdom, it's 100% free with all features unlocked.

## Tech Stack
- **Framework**: React Native + Expo SDK 54
- **Language**: TypeScript (strict)
- **Navigation**: React Navigation 7 (bottom tabs + native stack)
- **State**: Zustand with AsyncStorage persistence
- **Fonts**: EB Garamond (serif headings) + Inter (sans body) via expo-font
- **Animations**: React Native Animated API + expo-haptics
- **Styling**: Custom design token system (theme.ts)

## Architecture
```
chokhmah/
├── App.tsx                      # Entry point, font loading, navigation setup
├── src/
│   ├── constants/theme.ts       # Full design token system (colors, spacing, typography, shadows, personas)
│   ├── types/index.ts           # All TypeScript interfaces and types
│   ├── store/useAppStore.ts     # Zustand store with persistence
│   ├── services/
│   │   ├── personas.ts          # 10 AI lecturer persona definitions
│   │   ├── bookData.ts          # Pre-extracted Breath book + daily wisdom quotes
│   │   └── lectureService.ts    # Question generation, answer evaluation, lecture segments
│   ├── components/ui/           # Reusable design system components
│   │   ├── ScreenWrapper.tsx    # Base screen with parchment/constellation textures
│   │   ├── Card.tsx             # Flexible card with glow, highlight, border support
│   │   ├── Button.tsx           # Gradient primary/gold, outline secondary, ghost variants
│   │   ├── Chip.tsx             # Filter/selection chips with active gradient
│   │   ├── ProgressBar.tsx      # Animated progress bar with gradient fill
│   │   ├── PersonaAvatar.tsx    # Emoji avatar with persona glow + float animation
│   │   ├── OrnamentalDivider.tsx# Gold ornamental line divider with symbol
│   │   └── StatBox.tsx          # Stat display with count-up animation
│   ├── screens/
│   │   ├── HomeScreen.tsx       # Dashboard: greeting, quote, continue reading, quick-start personas
│   │   ├── SolomonsVoiceScreen.tsx # Flagship: adaptive lectures, Socratic questions, answer modal
│   │   ├── LibraryScreen.tsx    # Book browser with featured hero card, grid layout
│   │   ├── BookDetailScreen.tsx # Book deep-dive: chapters, concepts, notes tabs
│   │   ├── ReaderScreen.tsx     # Chapter reader with font size, highlights, progress
│   │   ├── ProgressScreen.tsx   # Analytics: streaks, stats, chart, achievements, persona mastery
│   │   ├── ExploreScreen.tsx    # All 10 personas with trait bars and catchphrases
│   │   └── ProfileScreen.tsx    # Settings and user summary
│   └── navigation/
│       └── AppNavigator.tsx     # Stack + tab navigation configuration
```

## 10 AI Lecturer Personas
| Persona   | Style      | Color     | Trait Focus              |
|-----------|-----------|-----------|--------------------------|
| Solomon   | Mentor    | #6B4EE6   | Warmth + Patience        |
| Athena    | Professor | #607D8B   | Authority + Structure    |
| Marcus    | Storyteller| #FF7043  | Humor + Narrative        |
| Hypatia   | Philosopher| #AB47BC  | Questioning + Depth      |
| Albert    | Curious   | #42A5F5   | Wonder + Enthusiasm      |
| Maya      | Mindful   | #66BB6A   | Patience + Embodiment    |
| Leonardo  | Creative  | #FFA726   | Cross-domain Thinking    |
| Confucius | Sage      | #8D6E63   | Ancient Wisdom + Virtue  |
| Ada       | Analytical| #26C6DA   | Patterns + Logic         |
| Rumi      | Poetic    | #EC407A   | Soul + Beauty            |

## Commands
```bash
npx expo start          # Start dev server
npx tsc --noEmit        # Type check
npx expo install <pkg>  # Install Expo-compatible dependency
```

## Design Philosophy
- Dark theme with parchment texture overlay (5% opacity) + constellation patterns (4% opacity, top 35%)
- 8pt spacing grid: xs(4), sm(8), md(16), lg(24), xl(32), xxl(48)
- Gold (#FFD700) for wisdom accents, ornamental dividers, streak indicators
- Each persona has a unique color sub-palette (primary, glow, border, surface, accent)
- Serif headings (EB Garamond) for ancient wisdom feel, sans body (Inter) for readability
- Level 1/2/3 shadow system with persona-specific colored glow (Level 3)
