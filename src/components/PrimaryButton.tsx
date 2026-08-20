import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients, radii, shadows } from '../theme/tokens';
import { ChevronRightIcon } from './icons';

type Props = {
  label: string;
  onPress?: () => void;
  /** trailing chevron, as on the onboarding "Next" CTA */
  withChevron?: boolean;
  style?: ViewStyle;
};

/** The mock's `.btn` — 54px gradient pill with the CTA glow. */
export function PrimaryButton({ label, onPress, withChevron, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.shadow,
        style,
        pressed && styles.pressed,
      ]}
    >
      <LinearGradient
        colors={[...gradients.cta]}
        start={gradients.ctaStart}
        end={gradients.ctaEnd}
        style={styles.button}
      >
        <Text style={styles.label}>{label}</Text>
        {withChevron ? (
          <View style={styles.chevron}>
            <ChevronRightIcon size={19} color={colors.surface} />
          </View>
        ) : null}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: radii.pill,
    ...shadows.cta,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  button: {
    height: 54,
    borderRadius: radii.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
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
