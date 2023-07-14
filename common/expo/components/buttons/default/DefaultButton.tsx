import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { Pressable, View } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';
import { DefaultButtonProps } from './types';

export const DefaultButton = ({
  title,
  variant = 'primary',
  style,
  disabled,
  ...props
}: DefaultButtonProps) => {
  const backgroundColor = (() => {
    if (disabled) return colors.gray500;
    return colors.primary;
  })();
  const borderColor = (() => {
    if (disabled) return colors.gray500;
    return colors.primary;
  })();
  return (
    <Pressable disabled={disabled} {...props}>
      {({ pressed }) => (
        <View
          style={[
            {
              ...borders.default,
              padding: paddings.lg,
              backgroundColor,
              borderColor,
              opacity: pressed ? 0.8 : 1,
              alignItems: 'center',
            },
            // style,
          ]}
        >
          <DefaultText style={{ ...typography.md }}>{title}</DefaultText>
        </View>
      )}
    </Pressable>
  );
};
