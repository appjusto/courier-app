import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import GainSimulator from '@/common/screens/profile/fleets/GainSimulator';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

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
          ...lineHeight.md,
          marginTop: paddings.sm,
        }}
      >
        No AppJusto, o valor da corrida é definido pela frota que você está. Após aprovação do seu
        cadastro, você estará automaticamente na frota padrão AppJusto mas você pode entrar ou criar
        outra frota a qualquer momento.
      </DefaultText>
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
          ...lineHeight.md,
          marginTop: paddings.lg,
        }}
      >
        Na frota AppJusto o valor mínimo da entrega é de R$10,00. Todo o valor é repassado para você
        sem taxas ou comissão.
      </DefaultText>
      <DefaultText
        size="md"
        style={{
          ...lineHeight.md,
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
  );
}
