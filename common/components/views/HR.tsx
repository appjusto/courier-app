import colors, { ColorName } from '@/common/styles/colors';
import { View, ViewProps } from 'react-native';
import { DefaultView } from '../containers/DefaultView';

interface Props extends ViewProps {
  color?: ColorName;
  size?: number;
}

export const HR = ({ color, size = 1, style, ...props }: Props) => {
  return (
    <DefaultView
      style={[
        {
          flexDirection: 'row',
        },
        style,
      ]}
      {...props}
    >
      <View
        style={{ flex: 1, height: size, backgroundColor: colors[color ?? 'neutral100'] }}
      ></View>
    </DefaultView>
  );
};
