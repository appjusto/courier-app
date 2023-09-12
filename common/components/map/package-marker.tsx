import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import { Package } from 'lucide-react-native';
import { View } from 'react-native';

export const PackageMarker = () => {
  return (
    <View
      style={{
        height: 30,
        width: 30,
        backgroundColor: colors.black,
        ...borders.default,
        borderColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Package size={20} color={colors.white} />
    </View>
  );
};
