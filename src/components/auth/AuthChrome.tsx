import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients, radii } from '../../theme/tokens';
import { BackIcon, ShieldIcon } from '../icons';

/** The mock's `.auth-top` — back button, step progress bar, step counter. */
export function AuthHeader({
  onBack,
  progress,
  step,
  leading,
}: {
  onBack?: () => void;
  /** 0–1 fill of the step bar. */
  progress: number;
  step: string;
  /** Replaces the back button (screen 08 shows the brand mark instead). */
  leading?: ReactNode;
}) {
  return (
    <View style={styles.authTop}>
      {leading ?? (
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <BackIcon size={17} color={colors.text1} />
        </Pressable>
      )}
      <View style={styles.stepBar}>
        <LinearGradient
          colors={[...gradients.cta]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.stepFill, { width: `${progress * 100}%` }]}
        />
      </View>
      <Text style={styles.stepText}>{step}</Text>
    </View>
  );
}

/** The mock's `.trust` — grey reassurance strip with a green shield. */
export function TrustNote({ children }: { children: ReactNode }) {
  return (
    <View style={styles.trust}>
      <ShieldIcon size={16} color={colors.ok} />
      <Text style={styles.trustText}>{children}</Text>
    </View>
  );
}

/** The mock's `.legal` — centred fine print with linked terms. */
export function LegalNote({ style }: { style?: object }) {
  return (
    <Text style={[styles.legal, style]}>
      By continuing you agree to our <Text style={styles.legalLink}>Terms of Use</Text> and{' '}
      <Text style={styles.legalLink}>Privacy Policy</Text>.
    </Text>
  );
}

const styles = StyleSheet.create({
  authTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: 6,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  stepBar: {
    flex: 1,
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.line,
    overflow: 'hidden',
  },
  stepFill: {
    height: '100%',
    borderRadius: radii.pill,
  },
  stepText: {
    fontFamily: fonts.h600,
    fontSize: 11.5,
    color: colors.text2,
  },

  trust: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 13,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  trustText: {
    flex: 1,
    fontFamily: fonts.b400,
    fontSize: 11.5,
    lineHeight: 16.7,
    color: colors.text2,
  },

  legal: {
    fontFamily: fonts.b400,
    fontSize: 11.5,
    lineHeight: 18.4,
    color: colors.text3,
    textAlign: 'center',
  },
  legalLink: {
    fontFamily: fonts.b600,
    color: colors.primary,
  },
});
