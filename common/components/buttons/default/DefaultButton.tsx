import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { Pressable, View, ViewProps } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';

type DefaultButtonProps = ViewProps & {
  title: string;
  variant?: 'primary' | 'destructive' | 'outline';
  disabled?: boolean;
  onPress: () => void;
};

export const DefaultButton = ({
  title,
  variant = 'primary',
  style,
  disabled,
  ...props
}: DefaultButtonProps) => {
  const backgroundColor = (pressed: boolean) => {
    if (disabled) return colors.neutral100;
    if (variant === 'primary') return pressed ? colors.neutral900 : colors.black;
    if (variant === 'destructive') return pressed ? colors.error900 : colors.error500;
    return colors.black;
  };
  const borderColor = (pressed: boolean) => {
    if (variant === 'outline') return colors.neutral800;
    return backgroundColor(pressed);
  };
  const textColor = () => {
    if (disabled) return colors.neutral700;
    if (variant === 'primary') return colors.white;
    return colors.white;
  };
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
              },
            ]}
          >
            <DefaultText style={{ ...typography.md, color: textColor() }}>{title}</DefaultText>
          </View>
        )}
      </Pressable>
    </View>
  );
};
