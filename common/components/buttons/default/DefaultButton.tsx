import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { ActivityIndicator, Pressable, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';

type DefaultButtonProps = ViewProps & {
  title: string;
  variant?: 'primary' | 'destructive' | 'outline';
  buttonStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
  size?: 'lg' | 'md' | 'sm';
  onPress: () => void;
};

export const DefaultButton = ({
  title,
  variant = 'primary',
  style,
  buttonStyle,
  disabled,
  loading,
  leftView,
  rightView,
  size = 'md',
  ...props
}: DefaultButtonProps) => {
  const backgroundColor = (pressed: boolean) => {
    if (disabled) return colors.neutral100;
    if (loading) return colors.neutral700;
    if (variant === 'primary') return pressed ? colors.neutral900 : colors.black;
    if (variant === 'destructive') return pressed ? colors.error900 : colors.error500;
    if (variant === 'outline') return pressed ? colors.neutral100 : colors.white;
    return colors.black;
  };
  const borderColor = (pressed: boolean) => {
    if (variant === 'outline') return colors.neutral800;
    return backgroundColor(pressed);
  };
  const textColor = () => {
    if (disabled) return colors.neutral700;
    if (variant === 'outline') return colors.black;
    return colors.white;
  };
  const height = size === 'sm' ? 38 : size === 'md' ? 42 : 50;
  const textStyle = size === 'sm' ? typography.sm : typography.md;
  return (
    <View style={[style]}>
      <Pressable disabled={disabled} {...props}>
        {({ pressed }) => (
          <View
            style={[
              {
                ...borders.default,
                padding: paddings.sm,
                backgroundColor: backgroundColor(pressed),
                borderColor: borderColor(pressed),
                alignItems: 'center',
                justifyContent: 'center',
                height,
              },
              buttonStyle,
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {loading ? (
                <ActivityIndicator size="small" color={textColor()} style={{ flex: 1 }} />
              ) : (
                <>
                  {leftView}
                  <DefaultText style={{ ...textStyle, color: textColor() }}>{title}</DefaultText>
                  {rightView}
                </>
              )}
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
};
