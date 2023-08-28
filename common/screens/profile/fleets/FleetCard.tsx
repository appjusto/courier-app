import { DefaultText } from '@/common/components/texts/DefaultText';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Fleet, WithId } from '@appjusto/types';
import crashlytics from '@react-native-firebase/crashlytics';
import { Pressable, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { DefaultCardIcon } from '../../../components/views/cards/icon';
import { FleetCardParam } from './FleetCardParam';
import { shareFleet } from './shareFleet';

interface Props extends ViewProps {
  fleet: WithId<Fleet>;
}

export const FleetCard = ({ fleet, style, ...props }: Props) => {
  // handlers
  const handleShareFleet = () => {
    shareFleet(fleet).catch((error: unknown) => {
      if (error instanceof Error) crashlytics().recordError(error);
    });
  };
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
      <FleetCardParam
        text="Pagamento mínimo"
        value={minimumFee}
        style={{ marginTop: paddings.lg }}
      />
      <FleetCardParam
        text="Distância inicial mínima"
        value={distanceThreshold}
        style={{ marginTop: paddings.lg }}
      />
      <FleetCardParam
        text="Valor adicional por km rodado"
        value={additionalPerKmAfterThreshold}
        style={{ marginTop: paddings.lg }}
      />
      <FleetCardParam
        text="Distância máxima para entrega"
        value={maxDistance}
        style={{ marginTop: paddings.lg }}
      />
      <FleetCardParam
        text="Distância máxima até a coleta"
        value={maxDistanceToOrigin}
        style={{ marginTop: paddings.lg, borderBottomWidth: 0 }}
      />
      <Pressable onPress={handleShareFleet}>
        {({ pressed }) => (
          <DefaultCard
            style={{ marginTop: paddings.lg }}
            icon={<DefaultCardIcon iconName="chat" />}
            title="Compartilhar frota"
            subtitle="Convide seus amigos para participar dessa frota"
          />
        )}
      </Pressable>
    </View>
  );
};
