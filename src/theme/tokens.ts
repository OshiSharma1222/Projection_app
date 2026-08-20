/**
 * Design tokens lifted from the Projection Academy redesign mockups
 * (projection_redesign/onboarding.html + screens.html :root variables).
 * Keep these in sync with the mocks — every screen reads from here.
 */

export const colors = {
  navy: '#082A5E',
  navy2: '#0B3C7D',
  navyDark: '#05203F',

  primary: '#0091EA',
  primaryDark: '#0277BD',
  primaryTint: '#E1F5FE',
  cyan: '#00C6FB',

  bg: '#F4F6FA',
  surface: '#FFFFFF',

  text1: '#16191D',
  text2: '#6B7280',
  text3: '#9AA3AF',

  ok: '#22C55E',
  warn: '#F59E0B',
  error: '#EF4444',

  line: '#EDF0F5',
  placeholder: '#F9FAFC',
} as const;

/** CTA gradient — linear-gradient(135deg, #0091EA, #00C6FB) */
export const gradients = {
  cta: [colors.primary, colors.cyan] as const,
  ctaStart: { x: 0, y: 0 },
  ctaEnd: { x: 1, y: 1 },
};

export const radii = {
  card: 20,
  sheet: 30,
  pill: 999,
  input: 15,
  chip: 12,
} as const;

export const spacing = {
  screenX: 26,
  gutter: 20,
} as const;

export const fonts = {
  /** headings — Poppins */
  h400: 'Poppins_400Regular',
  h500: 'Poppins_500Medium',
  h600: 'Poppins_600SemiBold',
  h700: 'Poppins_700Bold',
  /** body — Inter */
  b400: 'Inter_400Regular',
  b500: 'Inter_500Medium',
  b600: 'Inter_600SemiBold',
} as const;

export const shadows = {
  /** --sh: 0 8px 24px rgba(16,24,40,.06) */
  card: {
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 3,
  },
  /** --sh2: 0 12px 32px rgba(0,145,234,.24) */
  cta: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 32,
    elevation: 6,
  },
} as const;
