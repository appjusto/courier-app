import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import { Pressable, StyleProp, View, ViewProps, ViewStyle } from 'react-native';

type OnlyIconProps = ViewProps & {
  icon: React.ReactNode;
  variant?: 'default' | 'circle';
  disabled?: boolean;
  iconStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
};

export const OnlyIconButton = ({
  icon,
  onPress,
  variant,
  disabled,
  style,
  iconStyle,
  ...props
}: OnlyIconProps) => {
  const size = variant === 'default' ? 32 : 44;
  return (
    <View style={[style]}>
      <Pressable onPress={onPress} {...props}>
        {({ pressed }) => (
          <View
            style={[
              {
                width: size,
                height: size,
                ...borders.default,
                borderColor: colors.neutral200,
                borderRadius: variant === 'circle' ? size / 2 : size / 6,
                backgroundColor: pressed ? colors.neutral100 : colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              },
              iconStyle,
            ]}
          >
            {icon}
          </View>
        )}
      </Pressable>
    </View>
  );
};
