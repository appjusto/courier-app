import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Fleet, WithId } from '@appjusto/types';

import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { OnlyIconButton } from '@/common/components/buttons/icon/OnlyIconButton';
import { RoundedText } from '@/common/components/texts/RoundedText';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { router } from 'expo-router';
import { Share2 } from 'lucide-react-native';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { copyFleetLinkToClipboard } from '../../home/fleet/copyFleetLinkToClipboard';

interface Props extends ViewProps {
  fleet: WithId<Fleet>;
}

export const FleetCard = ({ fleet, style, ...props }: Props) => {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const showToast = useShowToast();
  // handlers
  const joinFleet = () => {
    trackEvent('Entrou na frota', { fleetId: fleet.id });
    api
      .fleets()
      .joinFleet(fleet.id)
      .then(() => {
        showToast(`Você agora faz parte da frota ${fleet.name}!`, 'success');
      });
  };
  const leaveFleet = () => {
    trackEvent('Saiu da frota', { fleetId: fleet.id });
    api
      .fleets()
      .leaveFleet(fleet.id)
      .then(() => {});
  };
  const copyToClipboard = () => {
    copyFleetLinkToClipboard(fleet.id).then(() => {
      showToast('Link da frota copiado!', 'success');
    });
  };
  // UI
  const canJoin = !profile?.fleetsIds?.includes(fleet.id);
  const canLeave = !canJoin && profile?.fleetsIds?.length && profile?.fleetsIds.length > 1;
  const usingFleet = profile?.fleetsIds.includes(fleet.id);
  const minimumFee = formatCurrency(fleet.minimumFee);
  const distanceThreshold = formatDistance(fleet.distanceThreshold);
  const additionalPerKmAfterThreshold = formatCurrency(fleet.additionalPerKmAfterThreshold);
  return (
    <View
      style={[{ padding: paddings.lg, ...borders.default, borderColor: colors.neutral200 }, style]}
      {...props}
    >
      <View>
        {/* header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* title */}
          <View>
            <DefaultText size="md">{fleet.name}</DefaultText>
            <DefaultText
              size="xs"
              color="success500"
              style={{ marginTop: paddings.xs }}
            >{`${fleet.participantsOnline} participantes online`}</DefaultText>
          </View>
          {/* share button */}
          <OnlyIconButton
            icon={<Share2 size={16} color={colors.neutral900} />}
            variant="circle"
            onPress={copyToClipboard}
          />
        </View>
        {usingFleet ? (
          <RoundedText
            style={{ marginTop: paddings.sm, backgroundColor: colors.primary100 }}
            size="xs"
            color="primary900"
          >
            Você faz parte desta frota!
          </RoundedText>
        ) : null}
        {/* description */}
        <DefaultText size="xs" style={{ marginTop: paddings.lg }}>
          {fleet.description}
        </DefaultText>
      </View>
      {/* details */}
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: paddings.lg }}
      >
        <View>
          <DefaultText size="xs" color="neutral700">
            Mínimo
          </DefaultText>
          <DefaultText size="md" color="black">
            {minimumFee}
          </DefaultText>
        </View>
        <View>
          <DefaultText size="xs" color="neutral700">
            Até
          </DefaultText>
          <DefaultText size="md" color="black">
            {distanceThreshold}
          </DefaultText>
        </View>
        <View>
          <DefaultText size="xs" color="neutral700">
            Adicional / KM
          </DefaultText>
          <DefaultText size="md" color="black">
            {additionalPerKmAfterThreshold}
          </DefaultText>
        </View>
      </View>
      {/* controls */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: paddings.lg,
          alignItems: 'center',
        }}
      >
        <DefaultButton
          style={{ flex: 1 }}
          title="Ver detalhes"
          variant="outline"
          onPress={() =>
            router.push({ pathname: '/(logged)/fleets/[id]', params: { id: fleet.id } })
          }
        />
        {canJoin ? (
          <DefaultButton
            style={{ flex: 1, marginLeft: paddings.lg }}
            title="Entrar na frota"
            onPress={joinFleet}
          />
        ) : null}
        {canLeave ? (
          <DefaultButton
            style={{ flex: 1, marginLeft: paddings.lg }}
            title="Sair da frota"
            onPress={leaveFleet}
          />
        ) : null}
      </View>
    </View>
  );
};
