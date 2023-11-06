import { DefaultCard } from '@/common/components/views/cards/default-card';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { router } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const HowItWorksCard = ({ style, ...props }: Props) => {
  return (
    <View style={[{}, style]} {...props}>
      <Pressable onPress={() => router.push('/(logged)/howitworks')}>
        <DefaultCard
          icon={<DefaultCardIcon iconName="file" />}
          title="Como funciona o AppJusto"
          subtitle="Conheça as vantagens e entenda os benefícios que temos para você"
        />
      </Pressable>
    </View>
  );
};
