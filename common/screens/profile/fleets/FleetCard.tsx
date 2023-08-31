import { DefaultText } from '@/common/components/texts/DefaultText';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Fleet, WithId } from '@appjusto/types';

import { Pressable, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { shareFleet } from '../../../../api/fleets/shareFleet';
import { DefaultCardIcon } from '../../../components/views/cards/icon';
import { FleetCardParam } from './FleetCardParam';

interface Props extends ViewProps {
  fleet: WithId<Fleet>;
}

export const FleetCard = ({ fleet, style, ...props }: Props) => {
  // UI
  const minimumFee = formatCurrency(fleet.minimumFee);
  const distanceThreshold = formatDistance(fleet.distanceThreshold);
  const additionalPerKmAfterThreshold = formatCurrency(fleet.additionalPerKmAfterThreshold);
  const maxDistance = formatDistance(fleet.maxDistance);
  const maxDistanceToOrigin = formatDistance(fleet.maxDistanceToOrigin);
  return (
    <View
      style={[{ padding: paddings.lg, ...borders.default, borderColor: colors.neutral200 }, style]}
      {...props}
    >
      <DefaultText size="md">{`Frota ${fleet.name}`}</DefaultText>
      <DefaultText
        size="xs"
        color="success500"
        style={{ marginTop: paddings.xs }}
      >{`${fleet.participantsOnline} participantes online`}</DefaultText>
      <DefaultText size="xs" style={{ marginTop: paddings.lg }}>
        {fleet.description}
      </DefaultText>
      <FleetCardParam text="Pagamento mínimo" value={minimumFee} />
      <FleetCardParam text="Distância inicial mínima" value={distanceThreshold} />
      <FleetCardParam text="Valor adicional por km rodado" value={additionalPerKmAfterThreshold} />
      <FleetCardParam text="Distância máxima para entrega" value={maxDistance} />
      <FleetCardParam
        style={{ borderBottomWidth: 0 }}
        text="Distância máxima até a coleta"
        value={maxDistanceToOrigin}
      />
      <Pressable onPress={() => shareFleet(fleet)}>
        {({ pressed }) => (
          <DefaultCard
            style={{ marginTop: paddings.md }}
            icon={<DefaultCardIcon iconName="chat" />}
            title="Compartilhar frota"
            subtitle="Convide seus amigos para participar dessa frota"
          />
        )}
      </Pressable>
    </View>
  );
};
