import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { GainSimulator } from '@/common/screens/profile/fleets/gain-simulator';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { ImageFleetsProcess } from './image';

export default function FleetProcess() {
  // context
  const profile = useContextProfile();
  const situation = profile?.situation;
  const router = useRouter();
  // UI
  return (
    <View style={{ padding: paddings.lg, backgroundColor: colors.neutral50 }}>
      <DefaultText style={{ ...lineHeight.lg }} size="lg">
        Funcionamento das frotas
      </DefaultText>
      <DefaultText
        size="md"
        style={{
          marginTop: paddings.md,
          ...lineHeight.md,
        }}
      >
        No AppJusto, o valor da corrida é definido pela frota que você está. Após aprovação do seu
        cadastro, você estará automaticamente na frota padrão AppJusto mas você pode entrar ou criar
        outra frota a qualquer momento.
      </DefaultText>
      <ImageFleetsProcess style={{ marginTop: paddings.xl }} />
      {situation === 'approved' ? (
        <View style={{ marginVertical: paddings.lg }}>
          <DefaultText
            size="md"
            style={{
              ...lineHeight.md,
            }}
          >
            Você pode também se juntar à uma frota já criada.
          </DefaultText>
          <DefaultButton
            style={{ marginTop: paddings.lg }}
            title="Ver frotas"
            onPress={() => router.push('/profile/fleets/')}
          />
        </View>
      ) : null}
      <DefaultText
        size="lg"
        style={{
          marginTop: paddings.lg,
        }}
      >
        Ganhos
      </DefaultText>
      <DefaultText
        size="md"
        style={{
          marginTop: paddings.md,
          ...lineHeight.md,
        }}
      >
        Na frota AppJusto padrão cobramos o valor mínimo de R$10,00 por entrega, e todo o valor é
        repassado para você sem taxas ou comissão.
      </DefaultText>
      <DefaultText
        size="md"
        style={{
          marginTop: paddings.md,
          ...lineHeight.md,
        }}
      >
        Nos pedidos de entrega de comida, o AppJusto cobra uma comissão, apenas, dos restaurantes. E
        em pedidos de entrega administrativa, cobra-se, dos clientes, uma taxa fixa de R$ 5,00 + o
        valor da entrega.
      </DefaultText>
      <View style={{ marginTop: paddings.lg }}>
        <GainSimulator
          minimumFee={1000}
          distanceThreshold={5000}
          additionalPerKmAfterThreshold={200}
        />
      </View>
    </View>
  );
}
