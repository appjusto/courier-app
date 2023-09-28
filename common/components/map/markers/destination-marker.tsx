import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import { User2 } from 'lucide-react-native';
import { View } from 'react-native';

export const DestinationMarker = () => {
  return (
    <View
      style={{
        height: 30,
        width: 30,
        backgroundColor: colors.primary500,
        ...borders.default,
        borderColor: colors.primary500,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <User2 size={20} color={colors.black} />
    </View>
  );
};
