import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients, radii } from '../../theme/tokens';
import { PrimaryButton } from '../PrimaryButton';

type Props = {
  /** Leading plain part of the headline. */
  title: string;
  /** Trailing part rendered in the primary colour, as the mock's `<em>`. */
  titleAccent: string;
  subtitle: string;
  slideCount: number;
  activeIndex: number;
  ctaLabel: string;
  onPressCta: () => void;
  paddingBottom: number;
};

/** The mock's `.ob-foot` — headline, body copy, progress dots and the CTA. */
export function SlideFooter({
  title,
  titleAccent,
  subtitle,
  slideCount,
  activeIndex,
  ctaLabel,
  onPressCta,
  paddingBottom,
}: Props) {
  return (
    <View style={[styles.foot, { paddingBottom }]}>
      <View>
        <Text style={styles.title}>
          {title}
          <Text style={styles.titleAccent}>{titleAccent}</Text>
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.dots}>
        {Array.from({ length: slideCount }).map((_, i) =>
          i === activeIndex ? (
            <LinearGradient
              key={i}
              colors={[...gradients.cta]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.dot, styles.dotActive]}
            />
          ) : (
            <View key={i} style={styles.dot} />
          )
        )}
      </View>

      <PrimaryButton label={ctaLabel} withChevron onPress={onPressCta} />
    </View>
  );
}

const styles = StyleSheet.create({
  foot: {
    paddingHorizontal: 26,
    paddingTop: 4,
    gap: 24,
  },
  title: {
    fontFamily: fonts.h600,
    fontSize: 26,
    lineHeight: 33,
    letterSpacing: -0.6,
    color: colors.text1,
  },
  titleAccent: {
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fonts.b400,
    fontSize: 14.5,
    lineHeight: 23.5,
    color: colors.text2,
    marginTop: 12,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radii.pill,
    backgroundColor: colors.dotIdle,
  },
  dotActive: {
    width: 26,
  },
});
