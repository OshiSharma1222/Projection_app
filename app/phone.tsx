import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radii } from '../src/theme/tokens';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Keypad } from '../src/components/auth/Keypad';
import { AuthHeader, LegalNote, TrustNote } from '../src/components/auth/AuthChrome';

const MAX_DIGITS = 10;

/** Mock 06 · Phone number — country picker plus the live numeric keypad. */
export default function PhoneNumber() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [digits, setDigits] = useState('');

  const complete = digits.length === MAX_DIGITS;

  const formatted = digits.length > 5 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <View style={styles.body}>
        <AuthHeader onBack={() => router.back()} progress={0.33} step="1 of 3" />

        <View style={styles.heading}>
          <Text style={styles.title}>
            What&apos;s your <Text style={styles.titleAccent}>number?</Text>
          </Text>
          <Text style={styles.subtitle}>
            We&apos;ll text you a 6-digit code to verify it&apos;s really you. No password to
            remember.
          </Text>
        </View>

        <View style={styles.inputRow}>
          <Pressable style={styles.countryCode}>
            <Text style={styles.countryTag}>IND</Text>
            <Text style={styles.countryDial}>+91</Text>
            <Text style={styles.countryCaret}>▼</Text>
          </Pressable>

          <View style={styles.numberField}>
            <Text style={digits ? styles.number : styles.numberPlaceholder}>
              {formatted || '98765 43210'}
            </Text>
            <View style={styles.caret} />
          </View>
        </View>

        <View style={styles.trustWrap}>
          <TrustNote>
            Your number is only used to sign you in and send class alerts. We never share it.
          </TrustNote>
        </View>

        <View style={styles.spacer} />

        <PrimaryButton
          label="Send OTP"
          withChevron
          style={styles.cta}
          disabled={!complete}
          onPress={() => router.push({ pathname: '/otp', params: { phone: digits } })}
        />
        <LegalNote style={styles.legal} />
      </View>

      <Keypad
        onPressDigit={(d) => setDigits((v) => (v.length < MAX_DIGITS ? v + d : v))}
        onBackspace={() => setDigits((v) => v.slice(0, -1))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  heading: {
    marginTop: 26,
  },
  title: {
    fontFamily: fonts.h600,
    fontSize: 24,
    lineHeight: 31,
    letterSpacing: -0.6,
    color: colors.text1,
  },
  titleAccent: {
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fonts.b400,
    fontSize: 13.5,
    lineHeight: 21.9,
    color: colors.text2,
    marginTop: 12,
  },

  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 26,
  },
  countryCode: {
    height: 58,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radii.input,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 13,
  },
  countryTag: {
    fontFamily: fonts.h700,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.primary,
    backgroundColor: colors.primaryTint,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  countryDial: {
    fontFamily: fonts.h600,
    fontSize: 15,
    color: colors.text1,
  },
  countryCaret: {
    fontSize: 10,
    color: colors.text3,
  },
  numberField: {
    flex: 1,
    height: 58,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radii.input,
    backgroundColor: colors.selectedTint,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  number: {
    flex: 1,
    fontFamily: fonts.h600,
    fontSize: 17,
    letterSpacing: 0.6,
    color: colors.text1,
  },
  numberPlaceholder: {
    flex: 1,
    fontFamily: fonts.h600,
    fontSize: 17,
    letterSpacing: 0.6,
    color: colors.text3,
  },
  caret: {
    width: 2,
    height: 24,
    borderRadius: 2,
    backgroundColor: colors.primary,
    opacity: 0.9,
  },

  trustWrap: {
    marginTop: 16,
  },
  spacer: {
    flex: 1,
    minHeight: 16,
  },
  cta: {
    marginBottom: 14,
  },
  legal: {
    marginBottom: 12,
  },
});
