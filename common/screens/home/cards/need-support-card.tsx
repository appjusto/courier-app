import { DefaultCard } from '@/common/components/views/cards/default-card';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  onPress: () => void;
}

export const NeedSupportCard = ({ onPress, style, ...props }: Props) => {
  return (
    <View style={[{}, style]} {...props}>
      <Pressable onPress={onPress}>
        <DefaultCard
          icon={<DefaultCardIcon iconName="alert" variant="warning" />}
          title="Preciso de ajuda"
          subtitle="Fale com nosso time ou faça uma denúncia"
        />
      </Pressable>
    </View>
  );
};
