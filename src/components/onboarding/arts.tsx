import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients, radii } from '../../theme/tokens';
import { FloatingCard, tileGradients } from './FloatingCard';
import {
  CapIcon,
  ChartIcon,
  CheckIcon,
  DocIcon,
  FlameIcon,
  PlayIcon,
  ShieldIcon,
  TrophyIcon,
} from '../icons';

/**
 * The three value-slide illustrations. Offsets are absolute within the
 * full-bleed art box; see Stage.tsx for why they are pre-resolved.
 */

/* ============ 02 · faculty & course quality ============ */

export function LessonArt() {
  return (
    <>
      <View style={styles.lessonCard}>
        <LinearGradient
          colors={[colors.navy, colors.navy2]}
          start={gradients.ctaStart}
          end={gradients.ctaEnd}
          style={styles.lessonHeader}
        >
          <View style={styles.chapterBadge}>
            <Text style={styles.chapterBadgeText}>CHAPTER 04</Text>
          </View>
          <View style={styles.playCircle}>
            <PlayIcon size={20} color={colors.primary} />
          </View>
        </LinearGradient>

        <View style={styles.lessonBody}>
          <Text style={styles.lessonTitle}>Rotational Motion</Text>
          <Text style={styles.lessonMeta}>Dr. A. Verma · 42 min</Text>
          <ProgressBar fill="64%" />
        </View>
      </View>

      <FloatingCard
        style={{ right: 44, top: 14 }}
        gradient={tileGradients.violet}
        icon={<CapIcon size={17} color={colors.surface} />}
        title="Top faculties"
        subtitle="Handpicked educators"
      />
      <FloatingCard
        style={{ right: 48, bottom: 56 }}
        gradient={tileGradients.amber}
        icon={<DocIcon size={17} color={colors.surface} />}
        title="Notes + DPPs"
        subtitle="Every lecture"
      />
      <FloatingCard
        style={{ left: 50, bottom: 10, paddingVertical: 10, paddingHorizontal: 14 }}
        gradient={tileGradients.green}
        icon={<CheckIcon size={17} color={colors.surface} />}
        title="500+ students"
        subtitle="Learning right now"
      />
    </>
  );
}

/* ============ 03 · YouTube lectures + secure notes ============ */

export function LectureArt() {
  return (
    <>
      <View style={styles.lectureCard}>
        <LinearGradient
          colors={['#1B2230', '#0E1116']}
          start={{ x: 0.15, y: 0 }}
          end={{ x: 0.85, y: 1 }}
          style={styles.player}
        >
          {/* YouTube chip */}
          <View style={styles.ytChip}>
            <View style={styles.ytBadge}>
              <View style={styles.ytTriangle} />
            </View>
            <Text style={styles.ytText}>YouTube</Text>
          </View>

          {/* quality chip */}
          <View style={styles.qualityChip}>
            <Text style={styles.qualityText}>720p</Text>
          </View>

          <View style={styles.ytPlay}>
            <PlayIcon size={18} color={colors.surface} />
          </View>

          {/* scrubber */}
          <View style={styles.scrubWrap}>
            <View style={styles.scrubTrack}>
              <View style={styles.scrubFill} />
              <View style={styles.scrubKnob} />
            </View>
            <View style={styles.scrubTimes}>
              <Text style={styles.scrubTime}>27:44</Text>
              <Text style={styles.scrubTime}>58:10</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.lectureBody}>
          <View style={styles.flex1}>
            <Text style={styles.lectureTitle}>Rotational Motion · L12</Text>
            <Text style={styles.lectureMeta}>Chetan Sir · plays only in-app</Text>
          </View>
          <View style={styles.notesCircle}>
            <DocIcon size={16} color={colors.primary} />
          </View>
        </View>
      </View>

      <FloatingCard
        style={{ right: 40, top: 4 }}
        gradient={tileGradients.navy}
        icon={<ShieldIcon size={17} color={colors.surface} />}
        title="Protected notes"
        subtitle="View-only PDFs"
      />
      <FloatingCard
        style={{ left: 56, bottom: 26 }}
        gradient={tileGradients.green}
        icon={<CheckIcon size={17} color={colors.surface} />}
        title="Progress synced"
        subtitle="Resume on any device"
      />
    </>
  );
}

/* ============ 04 · tests, rank & analytics ============ */

/** YouTube's brand red — not a product colour, so it stays out of tokens. */
const YOUTUBE_RED = '#FF0000';

const CHART_BARS = [
  { height: '38%', color: '#E3EEF8' },
  { height: '54%', color: '#CFE6F7' },
  { height: '46%', color: '#E3EEF8' },
  { height: '72%', color: '#9FD2F1' },
  { height: '88%', color: null },
  { height: '100%', color: null },
] as const;

const CHART_MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function RankArt() {
  return (
    <>
      <View style={styles.rankCard}>
        <View style={styles.rankHead}>
          <View>
            <Text style={styles.rankLabel}>All-India Rank</Text>
            <Text style={styles.rankValue}>#1,284</Text>
          </View>
          <View style={styles.rankDelta}>
            <Text style={styles.rankDeltaText}>▲ 312</Text>
          </View>
        </View>

        <View style={styles.chart}>
          {CHART_BARS.map((bar, i) =>
            bar.color ? (
              <View
                key={i}
                style={[styles.chartBar, { height: bar.height, backgroundColor: bar.color }]}
              />
            ) : (
              <LinearGradient
                key={i}
                colors={[colors.cyan, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.chartBar, { height: bar.height }]}
              />
            )
          )}
        </View>

        <View style={styles.chartLabels}>
          {CHART_MONTHS.map((m) => (
            <Text key={m} style={styles.chartLabel}>
              {m}
            </Text>
          ))}
        </View>

        <View style={styles.rankDivider}>
          <View style={styles.accuracyRow}>
            <Text style={styles.accuracyLabel}>Physics accuracy</Text>
            <Text style={styles.accuracyValue}>82%</Text>
          </View>
          <ProgressBar fill="82%" marginTop={0} />
        </View>
      </View>

      <FloatingCard
        style={{ right: 42, top: 0 }}
        gradient={tileGradients.amber}
        icon={<FlameIcon size={17} color={colors.surface} />}
        title="18-day streak"
        subtitle="Keep it alive"
      />
      <FloatingCard
        style={{ right: 46, bottom: 52 }}
        gradient={tileGradients.blue}
        icon={<ChartIcon size={17} color={colors.surface} />}
        title="Weak topic found"
        subtitle="Thermodynamics"
      />
      <FloatingCard
        style={{ left: 48, bottom: 8 }}
        gradient={tileGradients.green}
        icon={<TrophyIcon size={17} color={colors.surface} />}
        title="Top 5% this week"
        subtitle="In your batch"
      />
    </>
  );
}

/* ============ shared bits ============ */

/** The mock's `.bar` — track plus gradient fill. */
function ProgressBar({ fill, marginTop = 11 }: { fill: `${number}%`; marginTop?: number }) {
  return (
    <View style={[styles.bar, { marginTop }]}>
      <LinearGradient
        colors={[...gradients.cta]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.barFill, { width: fill }]}
      />
    </View>
  );
}

const cardShadow = {
  shadowColor: colors.shadow,
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.14,
  shadowRadius: 42,
  elevation: 8,
} as const;

const styles = StyleSheet.create({
  flex1: { flex: 1 },

  bar: {
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.line,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: radii.pill,
  },

  /* ---------- 02 lesson card ---------- */
  lessonCard: {
    position: 'absolute',
    left: 76,
    top: 44,
    width: 214,
    backgroundColor: colors.surface,
    borderRadius: 22,
    overflow: 'hidden',
    ...cardShadow,
  },
  lessonHeader: {
    height: 118,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterBadge: {
    position: 'absolute',
    left: 12,
    top: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radii.pill,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  chapterBadgeText: {
    fontFamily: fonts.h700,
    fontSize: 9.5,
    letterSpacing: 0.4,
    color: colors.surface,
  },
  playCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 4,
  },
  lessonBody: {
    padding: 13,
  },
  lessonTitle: {
    fontFamily: fonts.h600,
    fontSize: 13.5,
    letterSpacing: -0.2,
    color: colors.text1,
  },
  lessonMeta: {
    fontFamily: fonts.b400,
    fontSize: 11,
    color: colors.text2,
    marginTop: 3,
  },

  /* ---------- 03 lecture card ---------- */
  lectureCard: {
    position: 'absolute',
    left: 64,
    top: 30,
    width: 232,
    backgroundColor: colors.surface,
    borderRadius: 22,
    overflow: 'hidden',
    ...cardShadow,
  },
  player: {
    height: 126,
  },
  ytChip: {
    position: 'absolute',
    left: 10,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ytBadge: {
    width: 16,
    height: 11,
    borderRadius: 3,
    backgroundColor: YOUTUBE_RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ytTriangle: {
    marginLeft: 1,
    borderLeftWidth: 4.5,
    borderLeftColor: colors.surface,
    borderTopWidth: 3,
    borderTopColor: 'transparent',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  ytText: {
    fontFamily: fonts.h700,
    fontSize: 9.5,
    color: colors.surface,
  },
  qualityChip: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qualityText: {
    fontFamily: fonts.h700,
    fontSize: 9.5,
    color: colors.surface,
  },
  ytPlay: {
    position: 'absolute',
    left: '50%',
    top: '46%',
    marginLeft: -25,
    marginTop: -18,
    width: 50,
    height: 36,
    borderRadius: 10,
    backgroundColor: YOUTUBE_RED,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 4,
  },
  scrubWrap: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 9,
  },
  scrubTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
  },
  scrubFill: {
    height: '100%',
    width: '42%',
    borderRadius: 2,
    backgroundColor: YOUTUBE_RED,
  },
  scrubKnob: {
    position: 'absolute',
    left: '42%',
    marginLeft: -4.5,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: YOUTUBE_RED,
  },
  scrubTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  scrubTime: {
    fontFamily: fonts.b600,
    fontSize: 9,
    color: 'rgba(255,255,255,0.85)',
  },
  lectureBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 12,
    paddingHorizontal: 13,
  },
  lectureTitle: {
    fontFamily: fonts.h600,
    fontSize: 13,
    letterSpacing: -0.2,
    color: colors.text1,
  },
  lectureMeta: {
    fontFamily: fonts.b400,
    fontSize: 10.5,
    color: colors.text2,
    marginTop: 2,
  },
  notesCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- 04 rank card ---------- */
  rankCard: {
    position: 'absolute',
    left: 72,
    top: 30,
    width: 222,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 16,
    ...cardShadow,
  },
  rankHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rankLabel: {
    fontFamily: fonts.b500,
    fontSize: 10.5,
    color: colors.text2,
  },
  rankValue: {
    fontFamily: fonts.h600,
    fontSize: 25,
    lineHeight: 30,
    letterSpacing: -1,
    color: colors.text1,
  },
  rankDelta: {
    backgroundColor: '#DCFCE7',
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rankDeltaText: {
    fontFamily: fonts.h700,
    fontSize: 10.5,
    color: '#15803D',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    height: 72,
    marginTop: 16,
  },
  chartBar: {
    flex: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  chartLabel: {
    fontFamily: fonts.b500,
    fontSize: 9.5,
    color: colors.text3,
  },
  rankDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    marginTop: 13,
    paddingTop: 12,
  },
  accuracyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  accuracyLabel: {
    fontFamily: fonts.b400,
    fontSize: 11,
    color: colors.text2,
  },
  accuracyValue: {
    fontFamily: fonts.h600,
    fontSize: 11,
    color: colors.text1,
  },
});
