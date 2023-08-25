import colors from '@/common/styles/colors';
import typography, { semiboldFontFamily } from '@/common/styles/typography';
import { Text } from 'react-native';
import { DefaultTextProps } from './types';

export function DefaultText({ style, color, size, bold, ...props }: DefaultTextProps) {
  return (
    <Text
      style={[
        { ...typography[size ?? 'sm'], color: color ? colors[color] : colors.neutral900 },
        bold ? { fontFamily: semiboldFontFamily, fontWeight: 'bold' } : {},
        style,
      ]}
      {...props}
    />
  );
}
