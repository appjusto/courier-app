import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import { User2 } from 'lucide-react-native';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const DestinationMarker = ({ style, ...props }: Props) => {
  return (
    <View
      style={[
        {
          height: 30,
          width: 30,
          backgroundColor: colors.primary500,
          ...borders.default,
          borderColor: colors.primary500,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      {...props}
    >
      <User2 size={20} color={colors.black} />
    </View>
  );
};
