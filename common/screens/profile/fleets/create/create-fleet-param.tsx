import { OnlyIconButton } from '@/common/components/buttons/icon/OnlyIconButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { Minus, Plus } from 'lucide-react-native';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface Props extends ViewProps {
  title: string;
  description: string;
  value: string;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const CreateFleetParam = ({
  onIncrease,
  onDecrease,
  title,
  description,
  value,
  style,
  ...props
}: Props) => {
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
        <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '55%' }}>
          <DefaultText
            style={{ ...lineHeight.md, flexWrap: 'wrap' }}
            size="md"
            color="black"
            numberOfLines={2}
          >
            {title}
          </DefaultText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <OnlyIconButton icon={<Minus color="black" />} onPress={onDecrease} />
          <DefaultText style={{ marginHorizontal: paddings.sm }} size="md" color="black">
            {value}
          </DefaultText>
          <OnlyIconButton icon={<Plus color="black" />} onPress={onIncrease} />
        </View>
      </View>
      <DefaultText style={{ marginTop: paddings.md, ...lineHeight.sm }} color="neutral800">
        {description}
      </DefaultText>
    </View>
  );
};
