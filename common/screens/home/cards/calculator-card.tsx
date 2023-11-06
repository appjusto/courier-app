import { DefaultCard } from '@/common/components/views/cards/default-card';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { router } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const CalculatorCard = ({ style, ...props }: Props) => {
  return (
    <View style={[{}, style]} {...props}>
      <Pressable onPress={() => router.push('/calculator/')}>
        <DefaultCard
          icon={<DefaultCardIcon iconName="file" />}
          title="Calculadora de ganhos"
          subtitle="Calcule seus ganhos por corrida e por hora"
        />
      </Pressable>
    </View>
  );
};
