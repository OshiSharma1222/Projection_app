import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { colors } from '../theme/tokens';

type IconProps = {
  size?: number;
  color?: string;
};

/** Icons traced from the <symbol> defs in the redesign mockups. */

export function PlayIcon({ size = 20, color = colors.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M8 5.5v13l11-6.5z" fill={color} />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 19, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m9.5 5 7 7-7 7"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CheckIcon({ size = 17, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m5 12.5 4.5 4.5L19 7"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DocIcon({ size = 17, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 3.5h7l5 5v12H6z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 3.5v5h5M9 13h6M9 16.5h4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ShieldIcon({ size = 17, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3 4.5 6v6c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m9 12 2 2 4-4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function FlameIcon({ size = 17, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M13 2.5c.5 3-1.5 4.4-3 6-1.7 1.8-3 3.4-3 6a7 7 0 0 0 14 0c0-3.4-2-5.4-3.6-7.4-.4 1.2-1.2 2-2.2 2.3.6-2.3.2-4.7-2.2-6.9"
        fill={color}
      />
    </Svg>
  );
}

export function ChartIcon({ size = 17, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 19.5h16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 19.5v-6M12 19.5V7M17 19.5v-9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TrophyIcon({ size = 17, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 5.5H5A2.5 2.5 0 0 0 7.5 9M16.5 5.5H19A2.5 2.5 0 0 1 16.5 9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 13.5V17M8.5 20h7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CapIcon({ size = 17, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.5 8.5 12 4l9.5 4.5L12 13z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.5 10.6V16c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-5.4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.5 8.5V15"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PhoneIcon({ size = 19, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={6}
        y={2.5}
        width={12}
        height={19}
        rx={3}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 18.5h3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BookIcon({ size = 19, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.5 5.5A2 2 0 0 1 5.5 3.5H11v17H5.5a2 2 0 0 0-2 1.5z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.5 5.5a2 2 0 0 0-2-2H13v17h5.5a2 2 0 0 1 2 1.5z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BackIcon({ size = 17, color = colors.text1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m14.5 5-7 7 7 7"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DeleteIcon({ size = 22, color = colors.text1 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7z"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m12 9.5 5 5M17 9.5l-5 5"
        stroke={color}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function EditIcon({ size = 12, color = colors.primary }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 20h4l10-10-4-4L4 16z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m14.5 5.5 4 4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AtomIcon({ size = 19, color = colors.surface }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={2.2} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Ellipse cx={12} cy={12} rx={10} ry={4.4} stroke={color} strokeWidth={2} />
      <Ellipse
        cx={12}
        cy={12}
        rx={10}
        ry={4.4}
        stroke={color}
        strokeWidth={2}
        transform="rotate(60 12 12)"
      />
      <Ellipse
        cx={12}
        cy={12}
        rx={10}
        ry={4.4}
        stroke={color}
        strokeWidth={2}
        transform="rotate(120 12 12)"
      />
    </Svg>
  );
}

/** Google's four-colour mark — fixed brand colours, so no `color` prop. */
export function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill="#4285F4"
        d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6"
      />
      <Path
        fill="#34A853"
        d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9a7 7 0 0 1-10.4-3.6H1.7v3a11.5 11.5 0 0 0 10.3 6.3"
      />
      <Path fill="#FBBC05" d="M5.5 14.2a6.9 6.9 0 0 1 0-4.4v-3H1.7a11.5 11.5 0 0 0 0 10.4z" />
      <Path
        fill="#EA4335"
        d="M12 5.4c1.7 0 3.3.6 4.5 1.8l3.3-3.3A11.4 11.4 0 0 0 1.7 6.8l3.8 3a6.9 6.9 0 0 1 6.5-4.4"
      />
    </Svg>
  );
}
