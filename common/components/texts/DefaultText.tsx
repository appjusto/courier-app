import colors from '@/common/styles/colors';
import typography from '@/common/styles/typography';
import { Text } from 'react-native';
import { DefaultTextProps } from './types';

export function DefaultText({ style, color, size, ...props }: DefaultTextProps) {
  return (
    <Text
      style={[{ ...typography[size ?? 'sm'], color: color ? colors[color] : colors.black }, style]}
      {...props}
    />
  );
}
