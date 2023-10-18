import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Fleet } from '@appjusto/types';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { FleetDetailParam } from './fleet-detail-param';
import { GainSimulator } from './gain-simulator';

interface Props extends ViewProps {
  fleet: Fleet;
  showDescription?: boolean;
}

export const FleetDetail = ({ fleet, showDescription = true, style, ...props }: Props) => {
  // UI
  const minimumFee = formatCurrency(fleet.minimumFee);
  const distanceThreshold = formatDistance(fleet.distanceThreshold);
  const additionalPerKmAfterThreshold = formatCurrency(fleet.additionalPerKmAfterThreshold);
  const maxDistance = formatDistance(fleet.maxDistance);
  const maxDistanceToOrigin = formatDistance(fleet.maxDistanceToOrigin);
  return (
    <View style={[{}, style]} {...props}>
      <View style={{ padding: paddings.lg }}>
        <FleetDetailParam
          title="Pagamento Mínimo"
          description={
            showDescription
              ? 'Valor que os entregadores dessa frota receberão ao percorrer a Distância Inicial Mínima.'
              : undefined
          }
          value={minimumFee}
        />
        <FleetDetailParam
          style={{ marginTop: showDescription ? paddings.lg : paddings.sm }}
          title="Distância Inicial Mínima"
          description={
            showDescription
              ? 'Distância para o Pagamento Mínimo. Abaixo dessa distância, os entregadores dessa frota receberão o Pagamento Mínimo. Acima dessa distância, os entregadores receberão um Valor Adicional por Km Rodado.'
              : undefined
          }
          value={distanceThreshold}
        />
        <FleetDetailParam
          style={{ marginTop: showDescription ? paddings.lg : paddings.sm }}
          title="Valor Adicional por Km Rodado"
          description={
            showDescription
              ? 'Valor adicional por Km que os entregadores dessa frota receberão ao percorrer uma distância acima da Distância Inicial Mínima.'
              : undefined
          }
          value={additionalPerKmAfterThreshold}
        />
        <FleetDetailParam
          style={{ marginTop: showDescription ? paddings.lg : paddings.sm }}
          title="Distância Máxima para Entrega"
          description={
            showDescription
              ? 'Distância máxima em Km que os entregadores dessa frota poderão percorrer para fazer uma entrega. Pedidos recebidos com distância máxima acima não serão exibidos.'
              : undefined
          }
          value={maxDistance}
        />
        <FleetDetailParam
          style={{ marginTop: showDescription ? paddings.lg : paddings.sm }}
          title="Distância Máxima até a Origem"
          description={
            showDescription
              ? 'Distância máxima em km da posição atual até a origem do pedido que essa frota poderá percorrer. Pedidos recebidos com origem acima não serão exibidos.'
              : undefined
          }
          value={maxDistanceToOrigin}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.neutral50,
          paddingVertical: paddings.xl,
          paddingHorizontal: paddings.lg,
        }}
      >
        <GainSimulator
          minimumFee={fleet.minimumFee}
          distanceThreshold={fleet.distanceThreshold}
          additionalPerKmAfterThreshold={fleet.additionalPerKmAfterThreshold}
        />
      </View>
    </View>
  );
};
