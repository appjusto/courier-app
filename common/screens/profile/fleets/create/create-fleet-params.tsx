import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { ViewProps } from 'react-native';
import { CreateFleetParam } from './create-fleet-param';

interface Props extends ViewProps {
  distanceThreshold: number;
  minimumFee: number;
  additionalPerKmAfterThreshold: number;
  maxDistance: number;
  maxDistanceToOrigin: number;
  setDistanceThreshold: (value: number) => void;
  setMinimumFee: (value: number) => void;
  setAdditionalPerKmAfterThreshold: (value: number) => void;
  setMaxDistance: (value: number) => void;
  setMaxDistanceToOrigin: (value: number) => void;
  onSave: () => void;
}

const REVENUE_DELTA = 50;
const DISTANCE_DELTA = 500;

export const CreateFleetParams = ({
  minimumFee,
  distanceThreshold,
  additionalPerKmAfterThreshold,
  maxDistance,
  maxDistanceToOrigin,
  setMinimumFee,
  setDistanceThreshold,
  setAdditionalPerKmAfterThreshold,
  setMaxDistance,
  setMaxDistanceToOrigin,
  onSave,
  style,
  ...props
}: Props) => {
  // UI
  return (
    <DefaultScrollView style={[{ padding: paddings.lg }, style]} {...props}>
      <DefaultText style={{ ...lineHeight.lg }} size="lg">
        Preencha os detalhes da sua frota
      </DefaultText>
      <CreateFleetParam
        style={{ marginTop: paddings.lg }}
        title="Pagamento Mínimo"
        description="Valor que os entregadores dessa frota receberão ao percorrer a Distância Inicial Mínima a partir do ponto de coleta."
        value={formatCurrency(minimumFee)}
        onDecrease={() =>
          setMinimumFee(minimumFee > REVENUE_DELTA ? minimumFee - REVENUE_DELTA : minimumFee)
        }
        onIncrease={() => setMinimumFee(minimumFee + REVENUE_DELTA)}
      />
      <CreateFleetParam
        style={{ marginTop: paddings.lg }}
        title="Distância inicial mínima"
        description="Até essa distância, os entregadores dessa frota receberão o Pagamento Mínimo. Acima dessa distância, os entregadores receberão um Valor Adicional por Km Rodado. A distância é medida a partir do ponto de coleta."
        value={formatDistance(distanceThreshold)}
        onDecrease={() =>
          setDistanceThreshold(
            distanceThreshold > DISTANCE_DELTA
              ? distanceThreshold - DISTANCE_DELTA
              : distanceThreshold
          )
        }
        onIncrease={() => setDistanceThreshold(distanceThreshold + DISTANCE_DELTA)}
      />
      <CreateFleetParam
        style={{ marginTop: paddings.lg }}
        title="Valor Adicional por Km"
        description="Valor adicional por Km que os entregadores dessa frota receberão ao percorrer uma distância acima da Distância Inicial Mínima."
        value={formatCurrency(additionalPerKmAfterThreshold)}
        onDecrease={() =>
          setAdditionalPerKmAfterThreshold(
            additionalPerKmAfterThreshold > REVENUE_DELTA
              ? additionalPerKmAfterThreshold - REVENUE_DELTA
              : additionalPerKmAfterThreshold
          )
        }
        onIncrease={() =>
          setAdditionalPerKmAfterThreshold(additionalPerKmAfterThreshold + REVENUE_DELTA)
        }
      />
      <CreateFleetParam
        style={{ marginTop: paddings.lg }}
        title="Distância Máxima para Entrega"
        description="Distância máxima em Km que os entregadores dessa frota poderão percorrer para fazer uma entrega. Pedidos recebidos com distância máxima acima não serão exibidos."
        value={formatDistance(maxDistance)}
        onDecrease={() =>
          setMaxDistance(maxDistance > DISTANCE_DELTA ? maxDistance - DISTANCE_DELTA : maxDistance)
        }
        onIncrease={() => setMaxDistance(maxDistance + DISTANCE_DELTA)}
      />
      <CreateFleetParam
        style={{ marginTop: paddings.lg }}
        title="Distância Máxima até a Origem"
        description="Distância máxima em km da posição atual até a origem do pedido que essa frota poderá percorrer. Pedidos recebidos com origem acima não serão exibidos."
        value={formatDistance(maxDistanceToOrigin)}
        onDecrease={() =>
          setMaxDistanceToOrigin(
            maxDistanceToOrigin > DISTANCE_DELTA
              ? maxDistanceToOrigin - DISTANCE_DELTA
              : maxDistanceToOrigin
          )
        }
        onIncrease={() => setMaxDistanceToOrigin(maxDistanceToOrigin + DISTANCE_DELTA)}
      />
      <DefaultButton
        style={{ marginVertical: paddings['2xl'] }}
        title="Salvar e avançar"
        onPress={onSave}
      />
    </DefaultScrollView>
  );
};
