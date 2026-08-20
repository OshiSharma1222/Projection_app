import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import { colors, fonts, gradients } from '../src/theme/tokens';

/** Mock 01 · Splash — brand lockup held ~1.2 s over the brand navy. */
const HOLD_MS = 1800;

export default function SplashScreen() {
  const router = useRouter();
  const lockup = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(lockup, {
      toValue: 1,
      duration: 620,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    Animated.timing(progress, {
      toValue: 1,
      duration: 1200,
      delay: 180,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }).start();

    const handoff = setTimeout(() => router.replace('/onboarding'), HOLD_MS);
    return () => clearTimeout(handoff);
  }, [lockup, progress, router]);

  const lockupStyle = {
    opacity: lockup,
    transform: [
      {
        scale: lockup.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }),
      },
    ],
  };

  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {/* radial glow behind the mark — matches the mock's
          radial-gradient(circle, rgba(0,145,234,.32), transparent 66%) */}
      <Svg width={420} height={420} style={styles.glow} pointerEvents="none">
        <Defs>
          <RadialGradient id="splashGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={colors.primary} stopOpacity={0.32} />
            <Stop offset="0.66" stopColor={colors.primary} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={210} cy={210} r={210} fill="url(#splashGlow)" />
      </Svg>

      {/* concentric brand rings */}
      <View style={[styles.ring, { width: 250, height: 250, borderRadius: 125 }]} />
      <View style={[styles.ring, { width: 350, height: 350, borderRadius: 175 }]} />
      <View style={[styles.ring, { width: 460, height: 460, borderRadius: 230 }]} />

      <Animated.View style={[styles.lockup, lockupStyle]}>
        <Image
          source={require('../assets/images/logo-seal.png')}
          style={styles.seal}
          resizeMode="contain"
        />
        <Text style={styles.wordmark}>Projection Academy</Text>
      </Animated.View>

      <View style={styles.loadTrack}>
        <Animated.View style={[styles.loadFillClip, { width: fillWidth }]}>
          <LinearGradient
            colors={[...gradients.cta]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>

      <Text style={styles.version}>v2.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  lockup: {
    // Height is the seal alone, so flex-centering puts the mark at the exact
    // centre of the screen; the wordmark hangs below it without shifting it up.
    alignItems: 'center',
  },
  seal: {
    width: 186,
    height: 186,
  },
  wordmark: {
    position: 'absolute',
    top: 186 + 18,
    width: 320,
    fontFamily: fonts.h500,
    fontSize: 29,
    letterSpacing: 0.4,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  loadTrack: {
    position: 'absolute',
    bottom: 96,
    width: 132,
    height: 3,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.16)',
    overflow: 'hidden',
  },
  loadFillClip: {
    height: '100%',
    borderRadius: 99,
    overflow: 'hidden',
  },
  version: {
    position: 'absolute',
    bottom: 62,
    fontFamily: fonts.b400,
    fontSize: 11,
    letterSpacing: 0.5,
    color: 'rgba(255,255,255,0.42)',
  },
});
