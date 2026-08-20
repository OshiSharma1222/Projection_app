import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../theme/tokens';
import { DeleteIcon } from '../icons';

type Props = {
  onPressDigit: (digit: string) => void;
  onBackspace: () => void;
};

const ROWS = [
  [{ digit: '1' }, { digit: '2', letters: 'ABC' }, { digit: '3', letters: 'DEF' }],
  [{ digit: '4', letters: 'GHI' }, { digit: '5', letters: 'JKL' }, { digit: '6', letters: 'MNO' }],
  [{ digit: '7', letters: 'PQRS' }, { digit: '8', letters: 'TUV' }, { digit: '9', letters: 'WXYZ' }],
  [{ blank: true }, { digit: '0' }, { action: 'delete' }],
] as const;

/**
 * The mock's `.kpwrap` — the iOS-style numeric pad drawn into screens 06 and
 * 07. It is a real control here rather than a picture, so the phone and OTP
 * fields actually fill in.
 */
export function Keypad({ onPressDigit, onBackspace }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(26, insets.bottom + 8) }]}>
      {ROWS.map((row, r) => (
        <View key={r} style={styles.row}>
          {row.map((key, i) => {
            if ('blank' in key) return <View key={i} style={styles.blank} />;

            if ('action' in key) {
              return (
                <Pressable
                  key={i}
                  onPress={onBackspace}
                  style={({ pressed }) => [styles.key, styles.keyAction, pressed && styles.pressed]}
                >
                  <DeleteIcon size={22} color={colors.text1} />
                </Pressable>
              );
            }

            return (
              <Pressable
                key={i}
                onPress={() => onPressDigit(key.digit)}
                style={({ pressed }) => [styles.key, pressed && styles.pressed]}
              >
                <Text style={styles.digit}>{key.digit}</Text>
                {'letters' in key ? <Text style={styles.letters}>{key.letters}</Text> : null}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const GAP = 7;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.keypadBg,
    paddingTop: 9,
    paddingHorizontal: 6,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
    marginBottom: GAP,
  },
  key: {
    flex: 1,
    height: 46,
    backgroundColor: colors.surface,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 1,
    elevation: 1,
  },
  blank: {
    flex: 1,
    height: 46,
  },
  keyAction: {
    backgroundColor: colors.keypadAction,
    shadowOpacity: 0,
    elevation: 0,
  },
  pressed: {
    opacity: 0.55,
  },
  digit: {
    fontFamily: fonts.h500,
    fontSize: 22,
    color: colors.text1,
  },
  letters: {
    fontFamily: fonts.b600,
    fontSize: 8.5,
    letterSpacing: 1.4,
    color: colors.text2,
    marginTop: -2,
  },
});
