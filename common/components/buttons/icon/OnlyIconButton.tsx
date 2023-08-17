import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import { Pressable, View } from 'react-native';

interface Props {
  variant?: 'default' | 'circle';
  icon: React.ReactNode;
  onPress: () => void;
}

export const OnlyIconButton = ({ icon, onPress, variant }: Props) => {
  const size = variant === 'default' ? 32 : 44;
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            ...borders.default,
            borderColor: colors.neutral200,
            backgroundColor: pressed ? colors.neutral100 : colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </View>
      )}
    </Pressable>
  );
};
