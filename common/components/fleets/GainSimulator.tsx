import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { View } from 'react-native';
import { DefaultText } from '../texts/DefaultText';

type Props = {
  minimumFee: number;
  distanceThreshold: number;
  additionalPerKmAfterThreshold: number;
};

const kmInterval = 2;

export default function GainSimulator({
  minimumFee,
  distanceThreshold,
  additionalPerKmAfterThreshold,
}: Props) {
  // const
  // UI
  return (
    <View style={{ ...screens.default }}>
      <View style={{ padding: paddings.lg }}>
        <DefaultText size="sm" style={{ marginBottom: 4 }}>
          Simulação de ganhos
        </DefaultText>
        <DefaultText size="xs" color="gray700" style={{ marginTop: paddings.xs }}>
          Veja uma simulação aproximada dos ganhos por corrida nessa frota com os valores definidos
          acima.
        </DefaultText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: paddings.lg,
          }}
        >
          <DefaultText size="sm">Distância percorrida por entrega</DefaultText>
          <DefaultText size="sm" bold>
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
            <DefaultText size="sm" color="gray700">
              {`${i === 0 ? 'Até ' : ''}${formatDistance(
                distanceThreshold + i * kmInterval * 1000
              )}`}
            </DefaultText>
            <DefaultText size="sm">
              {formatCurrency(minimumFee + i * kmInterval * additionalPerKmAfterThreshold)}
            </DefaultText>
          </View>
        ))}
      </View>
    </View>
  );
}
