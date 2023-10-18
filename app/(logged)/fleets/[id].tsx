import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { shareFleet } from '@/api/fleets/shareFleet';
import { useObserveFleet } from '@/api/fleets/useObserveFleet';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedText } from '@/common/components/texts/RoundedText';
import { Loading } from '@/common/components/views/Loading';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { FleetDetail } from '@/common/screens/profile/fleets/fleet-detail';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Share2 } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export default function FleetDetailScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const showToast = useShowToast();
  // state
  const fleet = useObserveFleet(params.id);
  // tracking
  useTrackScreenView('Frota', { fleetName: fleet?.name }, Boolean(fleet));
  // handlers
  const joinFleet = () => {
    if (!fleet) return;
    trackEvent('Entrou na frota', { fleetId: fleet.id });
    api
      .fleets()
      .joinFleet(fleet.id)
      .then(() => {
        showToast(`Você agora faz parte da frota ${fleet.name}!`, 'success');
        router.back();
      });
  };
  // UI
  if (!fleet) return <Loading />;
  const usingFleet = profile?.fleetsIds.includes(fleet.id);

  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen
        options={{
          title: `Frota ${fleet.name}`,
          headerRight: (props) => (
            <Pressable onPress={() => shareFleet(fleet.id, fleet.name)}>
              {() => <Share2 size={16} color={colors.neutral900} />}
            </Pressable>
          ),
        }}
      />
      <View style={{ padding: paddings.lg }}>
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
          {usingFleet ? (
            <RoundedText
              style={{ backgroundColor: colors.primary100 }}
              size="xs"
              color="primary900"
            >
              Você faz parte desta frota!
            </RoundedText>
          ) : null}
        </View>

        {/* description */}
        <DefaultText size="xs" style={{ marginTop: paddings.lg }}>
          {fleet.description}
        </DefaultText>
      </View>
      <FleetDetail fleet={fleet} />

      {!usingFleet ? (
        <View style={{ padding: paddings.lg, backgroundColor: colors.white }}>
          <DefaultButton title="Participar dessa frota" onPress={joinFleet} />
        </View>
      ) : null}
    </DefaultScrollView>
  );
}
