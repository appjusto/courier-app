import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedText } from '@/common/components/texts/RoundedText';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface Props extends ViewProps {
  title: string;
  description?: string;
  value: string;
}

export const FleetDetailParam = ({ title, description, value, style, ...props }: Props) => {
  // UI
  return (
    <View style={[{}, style]} {...props}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          style,
        ]}
        {...props}
      >
        <DefaultText
          style={{ ...lineHeight.md, flex: 1, flexWrap: 'wrap' }}
          size="md"
          color="black"
        >
          {title}
        </DefaultText>
        <RoundedText
          style={{
            backgroundColor: colors.neutral50,
            borderColor: colors.neutral300,
            borderWidth: 1,
            paddingVertical: paddings.sm,
          }}
          size="md"
        >
          {value}
        </RoundedText>
      </View>
      {description ? (
        <DefaultText style={{ marginTop: paddings.md, ...lineHeight.sm }} color="neutral800">
          {description}
        </DefaultText>
      ) : null}
    </View>
  );
};
