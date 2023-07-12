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
  ...props
}: DefaultButtonProps) => {
  const backgroundColor = (() => {
    return colors.primary;
  })();
  const borderColor = (() => {
    return colors.primary;
  })();
  return (
    <Pressable {...props}>
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
