import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { View } from 'react-native';
import { DefaultText } from '../../../components/texts/DefaultText';

type Props = {
  minimumFee: number;
  distanceThreshold: number;
  additionalPerKmAfterThreshold: number;
};

const kmInterval = 2;

export const GainSimulator = ({
  minimumFee,
  distanceThreshold,
  additionalPerKmAfterThreshold,
}: Props) => {
  // const
  // UI
  return (
    <View style={{ padding: paddings.lg, backgroundColor: colors.white, borderRadius: 8 }}>
      <DefaultText size="md" color="black">
        Simulação de ganhos
      </DefaultText>
      <DefaultText
        size="sm"
        color="neutral800"
        style={{ ...lineHeight.xs, marginTop: paddings.sm }}
      >
        Veja uma simulação dos ganhos por corrida nessa frota com os valores definidos acima.
      </DefaultText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: paddings.lg,
        }}
      >
        <DefaultText size="xs" color="black">
          Distância percorrida por entrega
        </DefaultText>
        <DefaultText size="xs" color="black">
          Ganhos
        </DefaultText>
      </View>

      {new Array(6).fill('').map((_, i) => (
        <View
          key={`${i}`}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <DefaultText size="xs" color="neutral800">
            {`${i === 0 ? 'Até ' : ''}${formatDistance(distanceThreshold + i * kmInterval * 1000)}`}
          </DefaultText>
          <DefaultText size="xs" color="neutral800">
            {formatCurrency(minimumFee + i * kmInterval * additionalPerKmAfterThreshold)}
          </DefaultText>
        </View>
      ))}
    </View>
  );
};
