import colors, { ColorName } from '@/common/styles/colors';
import typography, { boldFontFamily } from '@/common/styles/typography';
import { Text } from 'react-native';

export type DefaultTextProps = Text['props'] & {
  size?: keyof typeof typography;
  color?: ColorName;
  bold?: boolean;
};

export function DefaultText({ style, color, size, bold, ...props }: DefaultTextProps) {
  return (
    <Text
      style={[
        { ...typography[size ?? 'sm'], color: color ? colors[color] : colors.neutral900 },
        bold ? { fontFamily: boldFontFamily, fontWeight: 'bold' } : {},
        style,
      ]}
      {...props}
    />
  );
}
