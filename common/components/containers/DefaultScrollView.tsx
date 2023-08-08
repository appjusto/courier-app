import { ScrollView } from 'react-native';
import { useThemeColor } from '../themes/useThemeColor';
import { DefaultViewProps } from '../views/types';

export function DefaultScrollView(props: DefaultViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <ScrollView
      style={[{ backgroundColor }, style]}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
      {...otherProps}
    />
  );
}
