import { ScrollView, ScrollViewProps } from 'react-native';
import { useThemeColor } from '../themes/useThemeColor';
import { DefaultViewProps } from '../views/types';

type Props = DefaultViewProps & ScrollViewProps;

export function DefaultScrollView({
  contentContainerStyle,
  style,
  lightColor,
  darkColor,
  ...props
}: Props) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <ScrollView
      style={[{ backgroundColor }, style]}
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      scrollIndicatorInsets={{ right: 1 }}
      {...props}
    />
  );
}
