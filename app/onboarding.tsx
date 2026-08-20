import { useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ImageStyle,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radii, shadows } from '../src/theme/tokens';
import { Stage } from '../src/components/onboarding/Stage';
import { SlideFooter } from '../src/components/onboarding/SlideFooter';
import { LessonArt, LectureArt, RankArt } from '../src/components/onboarding/arts';

/**
 * Mocks 02–04 · the three value slides, as one horizontally paged flow.
 * Swipe or tap the CTA to advance; the last slide's CTA leaves onboarding.
 */

type Slide = {
  key: string;
  art: () => React.JSX.Element;
  watermarkStyle: ImageStyle;
  title: string;
  titleAccent: string;
  subtitle: string;
  cta: string;
};

const SLIDES: Slide[] = [
  {
    key: 'faculty',
    art: LessonArt,
    watermarkStyle: { top: 40, left: -58 },
    title: 'Learn from India’s ',
    titleAccent: 'best faculty',
    subtitle:
      'Structured courses for JEE, Class 11-12 and Boards — taught by educators who have trained top rankers.',
    cta: 'Next',
  },
  {
    key: 'lectures',
    art: LectureArt,
    watermarkStyle: { top: 56, right: -64 },
    title: 'Lectures & notes, ',
    titleAccent: 'anywhere',
    subtitle:
      'HD video lectures streamed from YouTube inside the app, with protected view-only notes for every chapter — nothing to download, nothing to lose.',
    cta: 'Next',
  },
  {
    key: 'analytics',
    art: RankArt,
    watermarkStyle: { bottom: 10, left: -56 },
    title: 'Know exactly where ',
    titleAccent: 'you stand',
    subtitle:
      'Mock tests, All-India ranks and topic-level analytics that tell you what to revise next — not just what you got wrong.',
    cta: 'Get started',
  },
];

export default function ValueSlides() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const scroller = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    scroller.current?.scrollTo({ x: next * width, animated: true });
    setIndex(next);
  };

  const finish = () => router.push('/signin');

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== index) setIndex(next);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView
        ref={scroller}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        style={styles.pager}
      >
        {SLIDES.map((slide, i) => {
          const Art = slide.art;
          return (
            <View key={slide.key} style={[styles.page, { width }]}>
              <Stage watermarkStyle={slide.watermarkStyle} idPrefix={slide.key}>
                <Art />
              </Stage>
              <SlideFooter
                title={slide.title}
                titleAccent={slide.titleAccent}
                subtitle={slide.subtitle}
                slideCount={SLIDES.length}
                activeIndex={i}
                ctaLabel={slide.cta}
                onPressCta={() => (i === SLIDES.length - 1 ? finish() : goTo(i + 1))}
                paddingBottom={insets.bottom + 20}
              />
            </View>
          );
        })}
      </ScrollView>

      {/* Skip floats above the pager so it stays put while slides move. */}
      <Pressable style={[styles.skip, { top: insets.top + 8 }]} onPress={finish}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  pager: {
    flex: 1,
  },
  // Width is applied inline from the live window width; the horizontal
  // content container stretches each page to full height.
  page: {},
  skip: {
    position: 'absolute',
    right: 22,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: radii.pill,
    paddingVertical: 7,
    paddingHorizontal: 15,
    ...shadows.card,
  },
  skipText: {
    fontFamily: fonts.h600,
    fontSize: 13.5,
    color: colors.text2,
  },
});
