import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedText } from '@/common/components/texts/RoundedText';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface Props extends ViewProps {
  text: string;
  value: string;
  variant?: 'default' | 'home';
}

export const HomeFleetParam = ({ text, value, variant = 'default', style, ...props }: Props) => {
  // UI
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: paddings.md,
          borderBottomWidth: 1,
          borderColor: colors.neutral200,
        },
        style,
      ]}
      {...props}
    >
      <DefaultText style={{ ...lineHeight.xs, flex: 1, flexWrap: 'wrap' }} size="xs">
        {text}
      </DefaultText>
      <RoundedText
        size={variant === 'home' ? 'xxs' : 'xs'}
        style={{
          backgroundColor: colors.white,
          borderColor: colors.neutral900,
          borderWidth: 1,
          paddingVertical: paddings.sm,
        }}
      >
        {value}
      </RoundedText>
    </View>
  );
};
