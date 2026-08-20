import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients } from '../../theme/tokens';

type Props = {
  style: ViewStyle;
  gradient: readonly [string, string];
  icon: ReactNode;
  title: string;
  subtitle: string;
};

/** The mock's `.fc` — white pill card with a gradient icon tile. */
export function FloatingCard({ style, gradient, icon, title, subtitle }: Props) {
  return (
    <View style={[styles.fc, style]}>
      <LinearGradient
        colors={[...gradient]}
        start={gradients.ctaStart}
        end={gradients.ctaEnd}
        style={styles.icon}
      >
        {icon}
      </LinearGradient>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

/** Icon-tile gradients from the mock's .g-* classes. */
export const tileGradients = {
  violet: ['#7C3AED', '#C084FC'],
  amber: ['#F59E0B', '#FBBF24'],
  green: ['#10B981', '#34D399'],
  blue: [colors.primary, colors.cyan],
  navy: [colors.navy, colors.navy2],
} as const;

const styles = StyleSheet.create({
  fc: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 11,
    paddingHorizontal: 13,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 6,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.h600,
    fontSize: 12.5,
    letterSpacing: -0.1,
    color: colors.text1,
  },
  subtitle: {
    fontFamily: fonts.b400,
    fontSize: 10.5,
    color: colors.text2,
  },
});
