import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Image } from 'expo-image';
import { ActivityIndicator, Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  size?: number;
  url?: string | null;
  loading?: boolean;
  onPress?: () => void;
}
export const RoundedImageBox = ({
  size = 160,
  url,
  loading,
  onPress,
  style,
  children,
  ...props
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          {
            width: size,
            height: size,
            ...borders.default,
            borderColor: colors.neutral200,
            backgroundColor: colors.neutral50,
            marginVertical: paddings.lg,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}
        {...props}
      >
        {url ? (
          <Image style={{ width: size, height: size }} contentFit="cover" source={{ uri: url }} />
        ) : null}
        {!url && !loading ? children : null}
        {!url && loading ? <ActivityIndicator size="small" /> : null}
      </View>
    </Pressable>
  );
};
