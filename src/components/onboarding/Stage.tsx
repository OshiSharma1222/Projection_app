import type { ReactNode } from 'react';
import { Image, StyleSheet, View, type ImageStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors } from '../../theme/tokens';

type Props = {
  children: ReactNode;
  /** Per-slide placement of the oversized brand watermark. */
  watermarkStyle: ImageStyle;
  /** Unique per slide — SVG gradient ids are global within a document. */
  idPrefix: string;
};

/**
 * The mock's `.stage` — the tinted illustration area shared by all three value
 * slides: a 165deg wash, two soft brand blobs, and a faint seal watermark.
 *
 * The mock centres a 290px-wide `.art` box and hangs floating cards off both
 * edges with negative offsets. Android clips children that overflow their
 * parent, so the art box here is full-bleed and each slide's offsets are
 * pre-resolved against the 390px frame (the art box spans x=50 to x=340).
 */
export function Stage({ children, watermarkStyle, idPrefix }: Props) {
  return (
    <LinearGradient
      colors={['#EAF4FD', colors.bg]}
      locations={[0, 0.62]}
      start={{ x: 0.13, y: 0 }}
      end={{ x: 0.87, y: 1 }}
      style={styles.stage}
    >
      <Svg width={330} height={330} style={styles.blobTop} pointerEvents="none">
        <Defs>
          <RadialGradient id={`${idPrefix}BlobTop`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={colors.primary} stopOpacity={0.14} />
            <Stop offset="0.68" stopColor={colors.primary} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={165} cy={165} r={165} fill={`url(#${idPrefix}BlobTop)`} />
      </Svg>

      <Svg width={210} height={210} style={styles.blobBottom} pointerEvents="none">
        <Defs>
          <RadialGradient id={`${idPrefix}BlobBottom`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={colors.navy} stopOpacity={0.1} />
            <Stop offset="0.68" stopColor={colors.navy} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={105} cy={105} r={105} fill={`url(#${idPrefix}BlobBottom)`} />
      </Svg>

      <Image
        source={require('../../../assets/images/logo-seal.png')}
        style={[styles.watermark, watermarkStyle]}
        resizeMode="contain"
      />

      <View style={styles.art}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  stage: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blobTop: {
    position: 'absolute',
    top: -70,
    right: -90,
  },
  blobBottom: {
    position: 'absolute',
    bottom: -40,
    left: -70,
  },
  watermark: {
    position: 'absolute',
    width: 250,
    height: 250,
    opacity: 0.07,
  },
  art: {
    width: '100%',
    height: 330,
  },
});
