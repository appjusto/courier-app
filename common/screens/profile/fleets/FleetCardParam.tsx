import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedText } from '@/common/components/texts/RoundedText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface Props extends ViewProps {
  text: string;
  value: string;
}

export const FleetCardParam = ({ text, value, style, ...props }: Props) => {
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
      <DefaultText size="xs">{text}</DefaultText>
      <RoundedText size="xs">{value}</RoundedText>
    </View>
  );
};
