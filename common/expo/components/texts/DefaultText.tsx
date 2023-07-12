import typography from '@/common/constants/typography';
import { Text } from 'react-native';
import { useThemeColor } from '../themes/useThemeColor';
import { TextProps } from './types';

export function DefaultText({
  style,
  lightColor,
  darkColor,
  size,
  ...props
}: TextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text style={[{ ...typography[size ?? 'sm'], color }, style]} {...props} />
  );
}
