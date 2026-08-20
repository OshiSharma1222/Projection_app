import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radii } from '../src/theme/tokens';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Keypad } from '../src/components/auth/Keypad';
import { AuthHeader, TrustNote } from '../src/components/auth/AuthChrome';
import { EditIcon } from '../src/components/icons';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 24;

/**
 * Stand-in code until a real SMS backend exists. Anything else shows the
 * mock's `.otp.err` state rather than silently doing nothing.
 */
const DEV_OTP = '123456';

/** Mock 07 · OTP verification — resend timer and a call fallback. */
export default function OtpVerify() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const tick = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(tick);
  }, [secondsLeft]);

  const complete = code.length === OTP_LENGTH;
  const mmss = `00:${String(secondsLeft).padStart(2, '0')}`;

  const displayPhone =
    phone && phone.length === 10 ? `+91 ${phone.slice(0, 5)} ${phone.slice(5)}` : '+91 98765 43210';

  const enter = (d: string) => {
    setError(false);
    setCode((v) => (v.length < OTP_LENGTH ? v + d : v));
  };

  const erase = () => {
    setError(false);
    setCode((v) => v.slice(0, -1));
  };

  const verify = () => {
    if (code === DEV_OTP) router.push('/goal');
    else setError(true);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <View style={styles.body}>
        <AuthHeader onBack={() => router.back()} progress={0.33} step="1 of 3" />

        <View style={styles.heading}>
          <Text style={styles.title}>
            Enter the <Text style={styles.titleAccent}>6-digit code</Text>
          </Text>
          <Text style={styles.subtitle}>
            Sent to <Text style={styles.subtitleStrong}>{displayPhone}</Text>
          </Text>
          <Pressable style={styles.change} onPress={() => router.back()}>
            <EditIcon size={12} color={colors.primary} />
            <Text style={styles.changeText}>Change</Text>
          </Pressable>
        </View>

        <View style={styles.otpRow}>
          {Array.from({ length: OTP_LENGTH }).map((_, i) => {
            const filled = i < code.length;
            const isCursor = i === code.length;
            return (
              <View
                key={i}
                style={[
                  styles.otpBox,
                  filled && styles.otpBoxFilled,
                  isCursor && !error && styles.otpBoxCursor,
                  error && styles.otpBoxError,
                ]}
              >
                {filled ? (
                  <Text style={styles.otpDigit}>{code[i]}</Text>
                ) : isCursor ? (
                  <View style={styles.otpCaret} />
                ) : null}
              </View>
            );
          })}
        </View>

        {error ? (
          <Text style={styles.errorText}>
            That code doesn&apos;t match. Use {DEV_OTP} while the SMS backend is stubbed.
          </Text>
        ) : null}

        <View style={styles.resend}>
          <Text style={styles.resendLabel}>Didn&apos;t get it?</Text>
          {secondsLeft > 0 ? (
            <Text style={styles.resendTimer}>Resend in {mmss}</Text>
          ) : (
            <Pressable onPress={() => setSecondsLeft(RESEND_SECONDS)}>
              <Text style={styles.resendLink}>Resend code</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.trustWrap}>
          <TrustNote>
            We auto-read the SMS on Android, so this usually fills itself in.
          </TrustNote>
        </View>

        <View style={styles.spacer} />

        <PrimaryButton
          label="Verify & continue"
          withChevron
          style={styles.cta}
          disabled={!complete}
          onPress={verify}
        />

        <View style={styles.resendBottom}>
          <Text style={styles.resendLabel}>Having trouble?</Text>
          <Pressable>
            <Text style={styles.resendLink}>Get a call instead</Text>
          </Pressable>
        </View>
      </View>

      <Keypad onPressDigit={enter} onBackspace={erase} />
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
  subtitleStrong: {
    fontFamily: fonts.h600,
    color: colors.text1,
  },
  change: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  changeText: {
    fontFamily: fonts.b600,
    fontSize: 13.5,
    color: colors.primary,
  },

  otpRow: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 26,
  },
  otpBox: {
    flex: 1,
    height: 60,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radii.input,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.selectedTint,
  },
  /** mock: .otp.err i */
  otpBoxError: {
    borderColor: colors.errorBorder,
    backgroundColor: colors.errorSurface,
  },
  errorText: {
    fontFamily: fonts.b500,
    fontSize: 12,
    lineHeight: 17,
    color: colors.error,
    marginTop: 12,
  },
  otpBoxCursor: {
    borderColor: colors.primary,
    // stands in for the mock's 3.5px focus ring
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 3,
  },
  otpDigit: {
    fontFamily: fonts.h600,
    fontSize: 22,
    color: colors.text1,
  },
  otpCaret: {
    width: 2,
    height: 25,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },

  resend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
  },
  resendBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 12,
  },
  resendLabel: {
    fontFamily: fonts.b400,
    fontSize: 12.5,
    color: colors.text2,
  },
  resendTimer: {
    fontFamily: fonts.h600,
    fontSize: 12.5,
    color: colors.text3,
  },
  resendLink: {
    fontFamily: fonts.h600,
    fontSize: 12.5,
    color: colors.primary,
  },

  trustWrap: {
    marginTop: 20,
  },
  spacer: {
    flex: 1,
    minHeight: 16,
  },
  cta: {
    marginBottom: 14,
  },
});
