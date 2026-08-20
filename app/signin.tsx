import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors, fonts, radii, shadows } from '../src/theme/tokens';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { LegalNote } from '../src/components/auth/AuthChrome';
import {
  BookIcon,
  ChevronRightIcon,
  GoogleIcon,
  PhoneIcon,
} from '../src/components/icons';

/** Mock 05 · Sign in — phone-first, Google secondary, guest path. */
export default function SignIn() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* ---------- navy hero ---------- */}
      <View style={[styles.hero, { paddingTop: insets.top }]}>
        <Svg width={380} height={380} style={styles.heroGlow} pointerEvents="none">
          <Defs>
            <RadialGradient id="signinGlow" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor={colors.primary} stopOpacity={0.34} />
              <Stop offset="0.66" stopColor={colors.primary} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={190} cy={190} r={190} fill="url(#signinGlow)" />
        </Svg>

        <Image
          source={require('../assets/images/logo-seal.png')}
          style={styles.seal}
          resizeMode="contain"
        />
        <Text style={styles.wordmark}>Projection Academy</Text>
      </View>

      {/* ---------- white sheet ---------- */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 22 }]}>
        <Text style={styles.title}>Let&apos;s get you started</Text>
        <Text style={styles.subtitle}>
          Create an account or sign in to pick up where you left off.
        </Text>

        <View style={styles.actions}>
          <PrimaryButton
            label="Continue with phone number"
            variant="navy"
            leading={<PhoneIcon size={19} color={colors.surface} />}
            onPress={() => router.push('/phone')}
          />

          <Pressable style={({ pressed }) => [styles.oauth, pressed && styles.pressed]}>
            <GoogleIcon size={20} />
            <Text style={styles.oauthLabel}>Continue with Google</Text>
          </Pressable>
        </View>

        <View style={styles.separator}>
          <View style={styles.rule} />
          <Text style={styles.separatorText}>or</Text>
          <View style={styles.rule} />
        </View>

        <Pressable style={({ pressed }) => [styles.guest, pressed && styles.pressed]}>
          <View style={styles.guestIcon}>
            <BookIcon size={19} color={colors.primary} />
          </View>
          <View style={styles.guestCopy}>
            <Text style={styles.guestTitle}>Explore without an account</Text>
            <Text style={styles.guestSubtitle}>Browse free lectures &amp; demo classes</Text>
          </View>
          <ChevronRightIcon size={17} color={colors.text3} />
        </Pressable>

        <View style={styles.spacer} />
        <LegalNote />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  /* ---------- hero ---------- */
  hero: {
    height: 330,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 26,
    paddingBottom: 44,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -140,
  },
  seal: {
    width: 112,
    height: 112,
  },
  wordmark: {
    fontFamily: fonts.h500,
    fontSize: 21,
    letterSpacing: 0.4,
    color: colors.surface,
    textAlign: 'center',
  },

  /* ---------- sheet ---------- */
  sheet: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    marginTop: -30,
    paddingHorizontal: 26,
    paddingTop: 32,
  },
  title: {
    fontFamily: fonts.h600,
    fontSize: 22,
    letterSpacing: -0.5,
    color: colors.text1,
  },
  subtitle: {
    fontFamily: fonts.b400,
    fontSize: 13.5,
    lineHeight: 21.6,
    color: colors.text2,
    marginTop: 7,
  },
  actions: {
    gap: 11,
    marginTop: 26,
  },
  oauth: {
    height: 54,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
  },
  oauthLabel: {
    fontFamily: fonts.h600,
    fontSize: 14.5,
    color: colors.text1,
  },
  pressed: {
    opacity: 0.7,
  },

  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginVertical: 22,
  },
  rule: {
    flex: 1,
    height: 1,
    backgroundColor: colors.line,
  },
  separatorText: {
    fontFamily: fonts.b500,
    fontSize: 12,
    color: colors.text3,
  },

  guest: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  guestIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestCopy: {
    flex: 1,
  },
  guestTitle: {
    fontFamily: fonts.h600,
    fontSize: 13.5,
    letterSpacing: -0.2,
    color: colors.text1,
  },
  guestSubtitle: {
    fontFamily: fonts.b400,
    fontSize: 11.5,
    color: colors.text2,
    marginTop: 2,
  },

  spacer: {
    flex: 1,
    minHeight: 24,
  },
});
