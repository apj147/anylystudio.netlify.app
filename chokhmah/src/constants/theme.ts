/**
 * Chokhmah Design System
 * "Calm ancient wisdom + gentle nostalgia"
 *
 * Typography: EB Garamond (serif headings) + Inter (sans body)
 * Texture: Parchment overlay + constellation patterns
 * Persona: Each lecturer has a unique color sub-palette
 */

// ─── Core Palette ────────────────────────────────────────────
export const COLORS = {
  // Brand primaries
  primary: '#6B4EE6',
  primaryLight: '#8B6FFF',
  primaryDark: '#4A2EC0',
  secondary: '#26A69A',
  secondaryLight: '#4DB6AC',
  secondaryDark: '#00897B',

  // Gold system (wisdom accents)
  gold: '#FFD700',
  goldLight: '#FFE44D',
  goldDark: '#C9A959',
  goldMuted: 'rgba(255, 215, 0, 0.15)',
  goldBorder: 'rgba(255, 215, 0, 0.25)',

  // Backgrounds
  background: '#0D0D12',
  backgroundCard: '#1A1A24',
  surface: '#252535',
  surfaceLight: '#2E2E40',

  // Text hierarchy
  text: '#FFFFFF',
  textPrimary: '#F5F5F5',
  textSecondary: '#B0B0C0',
  textMuted: '#6B6B80',
  textInverse: '#0D0D12',

  // Semantic
  success: '#4CAF50',
  successLight: '#66BB6A',
  warning: '#FF9800',
  warningLight: '#FFB74D',
  error: '#EF5350',
  errorLight: '#EF9A9A',
  info: '#42A5F5',

  // Utility
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.6)',
  divider: 'rgba(255, 255, 255, 0.08)',
  white: '#FFFFFF',
  black: '#000000',
} as const;

// ─── Persona Color Sub-Palettes ──────────────────────────────
export const PERSONA_COLORS = {
  solomon: {
    primary: '#6B4EE6',
    glow: 'rgba(107, 78, 230, 0.4)',
    border: 'rgba(107, 78, 230, 0.2)',
    surface: 'rgba(107, 78, 230, 0.08)',
    accent: '#8B6FFF',
  },
  athena: {
    primary: '#607D8B',
    glow: 'rgba(96, 125, 139, 0.4)',
    border: 'rgba(96, 125, 139, 0.2)',
    surface: 'rgba(96, 125, 139, 0.08)',
    accent: '#90A4AE',
  },
  marcus: {
    primary: '#FF7043',
    glow: 'rgba(255, 112, 67, 0.4)',
    border: 'rgba(255, 112, 67, 0.2)',
    surface: 'rgba(255, 112, 67, 0.08)',
    accent: '#FF8A65',
  },
  hypatia: {
    primary: '#AB47BC',
    glow: 'rgba(171, 71, 188, 0.4)',
    border: 'rgba(171, 71, 188, 0.2)',
    surface: 'rgba(171, 71, 188, 0.08)',
    accent: '#CE93D8',
  },
  albert: {
    primary: '#42A5F5',
    glow: 'rgba(66, 165, 245, 0.4)',
    border: 'rgba(66, 165, 245, 0.2)',
    surface: 'rgba(66, 165, 245, 0.08)',
    accent: '#90CAF9',
  },
  maya: {
    primary: '#66BB6A',
    glow: 'rgba(102, 187, 106, 0.4)',
    border: 'rgba(102, 187, 106, 0.2)',
    surface: 'rgba(102, 187, 106, 0.08)',
    accent: '#A5D6A7',
  },
  leonardo: {
    primary: '#FFA726',
    glow: 'rgba(255, 167, 38, 0.4)',
    border: 'rgba(255, 167, 38, 0.2)',
    surface: 'rgba(255, 167, 38, 0.08)',
    accent: '#FFB74D',
  },
  confucius: {
    primary: '#8D6E63',
    glow: 'rgba(141, 110, 99, 0.4)',
    border: 'rgba(141, 110, 99, 0.2)',
    surface: 'rgba(141, 110, 99, 0.08)',
    accent: '#BCAAA4',
  },
  ada: {
    primary: '#26C6DA',
    glow: 'rgba(38, 198, 218, 0.4)',
    border: 'rgba(38, 198, 218, 0.2)',
    surface: 'rgba(38, 198, 218, 0.08)',
    accent: '#80DEEA',
  },
  rumi: {
    primary: '#EC407A',
    glow: 'rgba(236, 64, 122, 0.4)',
    border: 'rgba(236, 64, 122, 0.2)',
    surface: 'rgba(236, 64, 122, 0.08)',
    accent: '#F48FB1',
  },
} as const;

export type PersonaId = keyof typeof PERSONA_COLORS;

// ─── Spacing (8pt Grid) ─────────────────────────────────────
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// ─── Border Radius ──────────────────────────────────────────
export const RADIUS = {
  soft: 12,
  round: 16,
  pill: 24,
  circle: 9999,
} as const;

// ─── Elevation / Shadows ────────────────────────────────────
export const SHADOWS = {
  level1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  level2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  level3: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  }),
} as const;

// ─── Typography ─────────────────────────────────────────────
export const FONTS = {
  serifBold: 'EBGaramond_700Bold',
  serifSemiBold: 'EBGaramond_600SemiBold',
  serifRegular: 'EBGaramond_400Regular',
  serifItalic: 'EBGaramond_400Regular_Italic',
  sansRegular: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemiBold: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
} as const;

export const TYPOGRAPHY = {
  displayLg: {
    fontFamily: FONTS.serifBold,
    fontSize: 34,
    lineHeight: 42,
    color: COLORS.text,
  },
  displaySm: {
    fontFamily: FONTS.serifSemiBold,
    fontSize: 28,
    lineHeight: 36,
    color: COLORS.text,
  },
  heading: {
    fontFamily: FONTS.serifSemiBold,
    fontSize: 22,
    lineHeight: 28,
    color: COLORS.text,
  },
  subheading: {
    fontFamily: FONTS.sansSemiBold,
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.text,
  },
  body: {
    fontFamily: FONTS.sansRegular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
  bodyBold: {
    fontFamily: FONTS.sansSemiBold,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
  caption: {
    fontFamily: FONTS.sansRegular,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.textMuted,
  },
  micro: {
    fontFamily: FONTS.sansMedium,
    fontSize: 10,
    lineHeight: 14,
    color: COLORS.textMuted,
  },
} as const;

// ─── Gradients ──────────────────────────────────────────────
export const GRADIENTS = {
  primary: [COLORS.primary, COLORS.primaryLight] as const,
  primaryDark: [COLORS.primaryDark, COLORS.primary] as const,
  gold: [COLORS.goldDark, COLORS.gold] as const,
  surface: [COLORS.background, COLORS.backgroundCard] as const,
  header: ['rgba(13,13,18,0.95)', 'rgba(13,13,18,0)'] as const,
  persona: (color: string) => [`${color}15`, 'transparent'] as [string, string],
} as const;

// ─── Texture Config ─────────────────────────────────────────
export const TEXTURE = {
  parchment: {
    opacity: 0.05,
    fullScreen: true,
  },
  constellation: {
    opacity: 0.04,
    coveragePercent: 35,
  },
  personaGlow: {
    maxOpacity: 0.4,
    radius: 20,
  },
} as const;

// ─── Animation Durations ────────────────────────────────────
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  typewriter: 15,
  stagger: 100,
  spring: {
    damping: 20,
    stiffness: 200,
  },
} as const;

// ─── Layout Constants ───────────────────────────────────────
export const LAYOUT = {
  screenPaddingH: SPACING.md,
  sectionGap: SPACING.lg,
  cardGap: SPACING.sm,
  cardPadding: SPACING.md,
  tabBarHeight: 80,
  headerHeight: 56,
  avatarSm: 48,
  avatarLg: 64,
  avatarXl: 80,
  progressBarHeight: 4,
  progressBarHeightLg: 6,
  chipHeight: 32,
  buttonHeight: 48,
  iconSm: 20,
  iconMd: 24,
  iconLg: 32,
} as const;
