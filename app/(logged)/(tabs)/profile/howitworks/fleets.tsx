import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import GainSimulator from '@/common/components/fleets/GainSimulator';
import { DefaultText } from '@/common/components/texts/DefaultText';
import paddings from '@/common/styles/paddings';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';

export default function FleetProcess() {
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Frotas' }} />
      <View style={{ padding: paddings.lg }}>
        <DefaultText size="2xl">Funcionamento das frotas</DefaultText>
        <DefaultText
          size="sm"
          color="neutral700"
          style={{
            marginTop: paddings.sm,
          }}
        >
          No AppJusto, o valor da corrida é definido pela frota que você está. Após aprovação do seu
          cadastro, você estará automaticamente na frota padrão AppJusto mas você pode entrar ou
          criar outra frota a qualquer momento.
        </DefaultText>
        <DefaultText
          size="sm"
          color="neutral700"
          style={{
            marginTop: paddings.lg,
          }}
        >
          Você pode também se juntar à uma frota já criada.
        </DefaultText>
        <DefaultButton style={{ marginTop: paddings.lg }} title="Ver frotas" onPress={() => null} />
        <DefaultText
          size="2xl"
          style={{
            marginTop: paddings['2xl'],
          }}
        >
          Ganhos
        </DefaultText>
        <DefaultText
          size="sm"
          color="neutral700"
          style={{
            marginTop: paddings.lg,
          }}
        >
          Na frota AppJusto o valor mínimo da entrega é de R$10,00. Todo o valor é repassado para
          você sem taxas ou comissão.
        </DefaultText>
        <DefaultText
          size="sm"
          color="neutral700"
          style={{
            marginTop: paddings.lg,
          }}
        >
          Nos pedidos de entrega de comida, o AppJusto cobra comissão apenas dos restaurantes. Nos
          pedidos de entrega administrativa cobramos uma taxa fixa de R$ 5,00 dos consumidores. O
          valor da entrega vai todo para você.
        </DefaultText>
        <View style={{ marginTop: paddings.lg }}>
          <GainSimulator
            minimumFee={1000}
            distanceThreshold={5000}
            additionalPerKmAfterThreshold={200}
          />
        </View>
      </View>
    </ScrollView>
  );
}
