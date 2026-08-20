import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients, radii, shadows } from '../theme/tokens';
import { ChevronRightIcon } from './icons';

type Props = {
  label: string;
  onPress?: () => void;
  /** trailing chevron, as on the onboarding "Next" CTA */
  withChevron?: boolean;
  /** icon shown before the label, as on "Continue with phone number" */
  leading?: ReactNode;
  /** `cta` is the gradient pill; `navy` is the mock's `.btn.navy` */
  variant?: 'cta' | 'navy';
  /** Dims the pill and swallows presses — an inert-looking CTA reads as broken. */
  disabled?: boolean;
  style?: ViewStyle;
};

/** The mock's `.btn` — 54px pill, gradient by default. */
export function PrimaryButton({
  label,
  onPress,
  withChevron,
  leading,
  variant = 'cta',
  disabled = false,
  style,
}: Props) {
  const isNavy = variant === 'navy';

  const content = (
    <>
      {leading}
      <Text style={styles.label}>{label}</Text>
      {withChevron ? (
        <View style={styles.chevron}>
          <ChevronRightIcon size={19} color={colors.surface} />
        </View>
      ) : null}
    </>
  );

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        isNavy ? styles.navyShadow : styles.ctaShadow,
        style,
        disabled && styles.disabled,
        !disabled && pressed && styles.pressed,
      ]}
    >
      {isNavy ? (
        <View style={[styles.button, styles.navyButton]}>{content}</View>
      ) : (
        <LinearGradient
          colors={[...gradients.cta]}
          start={gradients.ctaStart}
          end={gradients.ctaEnd}
          style={styles.button}
        >
          {content}
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ctaShadow: {
    borderRadius: radii.pill,
    ...shadows.cta,
  },
  /** mock: 0 12px 30px rgba(8,42,94,.3) */
  navyShadow: {
    borderRadius: radii.pill,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 6,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  button: {
    height: 54,
    borderRadius: radii.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  navyButton: {
    backgroundColor: colors.navy,
  },
  label: {
    fontFamily: fonts.h600,
    fontSize: 15.5,
    color: colors.surface,
  },
  chevron: {
    justifyContent: 'center',
  },
});
