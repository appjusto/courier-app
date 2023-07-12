import { View } from 'react-native';
import { useThemeColor } from '../themes/useThemeColor';
import { ViewProps } from './types';

export function DefaultView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
