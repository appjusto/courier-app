import { DefaultText } from '@/common/components/texts/DefaultText';
import { ImageRevenueProcess } from '@/common/screens/profile/howitworks/revenue/image';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { View } from 'react-native';

export const RevenueProcess = () => {
  return (
    <View style={{ padding: paddings.lg, backgroundColor: colors.neutral50 }}>
      <DefaultText style={{ ...lineHeight.lg }} size="lg">
        Funcionamento do recebimento
      </DefaultText>
      <DefaultText
        size="md"
        style={{
          marginTop: paddings.md,
          ...lineHeight.md,
        }}
      >
        No AppJusto, você faz uma corrida e 24 horas depois você tem o dinheiro disponível para
        saque.
      </DefaultText>
      <ImageRevenueProcess style={{ marginTop: paddings.lg }} />
    </View>
  );
};
