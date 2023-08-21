import { ImageRevenueProcess } from '@/common/components/profile/howitworks/revenue/image';
import { DefaultText } from '@/common/components/texts/DefaultText';
import paddings from '@/common/styles/paddings';
import { View } from 'react-native';

export default function RevenueProcess() {
  return (
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
  );
}
