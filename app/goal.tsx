import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients, radii } from '../src/theme/tokens';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { AuthHeader, TrustNote } from '../src/components/auth/AuthChrome';
import { tileGradients } from '../src/components/onboarding/FloatingCard';
import { AtomIcon, BookIcon, CapIcon, CheckIcon } from '../src/components/icons';

type Goal = {
  key: string;
  tile: readonly [string, string];
  /** number tiles (Class 11 / 12) render text instead of an icon */
  numeral?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  wide?: boolean;
};

const GOALS: Goal[] = [
  {
    key: 'jee',
    tile: tileGradients.blue,
    icon: <AtomIcon size={19} color={colors.surface} />,
    title: 'JEE Main + Adv',
    subtitle: 'Target: IIT, NIT & BITS',
  },
  {
    key: 'foundation',
    tile: tileGradients.violet,
    icon: <CapIcon size={19} color={colors.surface} />,
    title: 'Foundation',
    subtitle: 'Class 8 to 10',
  },
  {
    key: 'class11',
    tile: tileGradients.navy,
    numeral: '11',
    title: 'Class 11',
    subtitle: 'Full year · PCM / PCB',
  },
  {
    key: 'class12',
    tile: tileGradients.blue,
    numeral: '12',
    title: 'Class 12',
    subtitle: 'Full year · PCM / PCB',
  },
  {
    key: 'boards',
    tile: tileGradients.amber,
    icon: <BookIcon size={19} color={colors.surface} />,
    title: 'Board Exams',
    subtitle: 'CBSE, ICSE & State · revision and sample papers',
    wide: true,
  },
];

/** Mock 08 · Goal selection — personalises home, batches and tests. */
export default function GoalPicker() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('jee');

  const finish = () => {
    // TODO: enter the app shell (mock 01 of screens.html · Home).
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <AuthHeader
          progress={0.66}
          step="2 of 3"
          leading={
            <Image
              source={require('../assets/images/logo-seal.png')}
              style={styles.mark}
              resizeMode="contain"
            />
          }
        />

        <View style={styles.heading}>
          <Text style={styles.title}>
            What are you <Text style={styles.titleAccent}>preparing for?</Text>
          </Text>
          <Text style={styles.subtitle}>
            Pick one — we&apos;ll shape your home feed, batches and test series around it.
          </Text>
        </View>

        <View style={styles.grid}>
          {GOALS.map((goal) => {
            const on = goal.key === selected;
            return (
              <Pressable
                key={goal.key}
                onPress={() => setSelected(goal.key)}
                style={[
                  styles.goal,
                  goal.wide ? styles.goalWide : styles.goalHalf,
                  on && styles.goalOn,
                ]}
              >
                {on ? (
                  <View style={styles.tick}>
                    <CheckIcon size={12} color={colors.surface} />
                  </View>
                ) : null}

                <LinearGradient
                  colors={[...goal.tile]}
                  start={gradients.ctaStart}
                  end={gradients.ctaEnd}
                  style={styles.goalIcon}
                >
                  {goal.numeral ? (
                    <Text style={styles.goalNumeral}>{goal.numeral}</Text>
                  ) : (
                    goal.icon
                  )}
                </LinearGradient>

                <View style={goal.wide ? styles.goalWideCopy : undefined}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalSubtitle}>{goal.subtitle}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.trustWrap}>
          <TrustNote>
            Not sure yet? Start with any one — you can switch your goal anytime from{' '}
            <Text style={styles.trustStrong}>Profile › My goal</Text>.
          </TrustNote>
        </View>
      </ScrollView>

      <View style={[styles.foot, { paddingBottom: insets.bottom + 18 }]}>
        <PrimaryButton label="Continue" withChevron onPress={finish} />
        <Pressable onPress={finish}>
          <Text style={styles.later}>I&apos;ll decide later</Text>
        </Pressable>
      </View>
    </View>
  );
}

const GRID_GAP = 11;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: 24,
    paddingTop: 6,
    paddingBottom: 8,
  },
  mark: {
    width: 32,
    height: 32,
  },

  heading: {
    marginTop: 18,
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
    fontSize: 13,
    lineHeight: 21,
    color: colors.text2,
    marginTop: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
    marginTop: 22,
  },
  goal: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 13,
    gap: 9,
  },
  goalHalf: {
    // two columns sharing one gap; grow soaks up the few leftover px
    flexBasis: '48%',
    flexGrow: 1,
  },
  goalWide: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  goalWideCopy: {
    flex: 1,
    gap: 2,
  },
  goalOn: {
    borderColor: colors.primary,
    backgroundColor: colors.selectedTint,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 3,
  },
  tick: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  goalIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalNumeral: {
    fontFamily: fonts.h700,
    fontSize: 16,
    letterSpacing: -0.5,
    color: colors.surface,
  },
  goalTitle: {
    fontFamily: fonts.h600,
    fontSize: 14,
    letterSpacing: -0.2,
    color: colors.text1,
  },
  goalSubtitle: {
    fontFamily: fonts.b400,
    fontSize: 11.5,
    lineHeight: 16.1,
    color: colors.text2,
  },

  trustWrap: {
    marginTop: 18,
  },
  trustStrong: {
    fontFamily: fonts.h600,
    color: colors.text1,
  },

  foot: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
    backgroundColor: colors.surface,
  },
  later: {
    fontFamily: fonts.h600,
    fontSize: 13,
    color: colors.text2,
    textAlign: 'center',
  },
});
