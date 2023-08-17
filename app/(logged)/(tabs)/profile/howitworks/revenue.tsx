import { ImageRevenueProcess } from '@/common/components/profile/howitworks/revenue/image';
import { DefaultText } from '@/common/components/texts/DefaultText';
import paddings from '@/common/styles/paddings';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';

export default function RevenueProcess() {
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Recebimento' }} />
      <View style={{ padding: paddings.lg }}>
        <DefaultText size="2xl">Funcionamento do recebimento</DefaultText>
        <DefaultText
          size="sm"
          color="neutral700"
          style={{
            marginTop: paddings.sm,
          }}
        >
          No AppJusto, você faz uma corrida e 24 horas depois você tem o dinheiro disponível para
          saque.
        </DefaultText>
        <ImageRevenueProcess style={{ marginTop: paddings.lg }} />
      </View>
    </ScrollView>
  );
}
