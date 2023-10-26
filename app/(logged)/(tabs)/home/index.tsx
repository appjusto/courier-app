import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useApprovedEntriesSummary } from '@/api/ledger/useApprovedEntriesSummary';
import {
  useContextLocationDisclosureStatus,
  useContextSetLocationDisclosureShown,
} from '@/api/location/context/LocationContext';
import { useTodaysOrdersSummary } from '@/api/orders/useTodaysOrdersSummary';
import { useContextAvailabilityModal } from '@/api/preferences/context/PreferencesContext';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { ActivitySummary } from '@/common/screens/home/activity/activity-summary';
import { AvailabilityModal } from '@/common/screens/home/availability-modal';
import { ActiveRequestsCards } from '@/common/screens/home/cards/active-requests-cards';
import { OngoingOrdersCards } from '@/common/screens/home/cards/ongoing-orders-cards';
import { HomeFleet } from '@/common/screens/home/fleet/home-fleet';
import { HomeHeader } from '@/common/screens/home/header/home-header';
import { LocationDisclosureModal } from '@/common/screens/home/location-disclosure-modal/location-disclosure-modal';
import { SupportModal } from '@/common/screens/home/support-modal';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { CourierMode } from '@appjusto/types';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

export default function HomeScreen() {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const router = useRouter();
  // tracking
  useTrackScreenView('Início');
  // state
  const entriesSummary = useApprovedEntriesSummary();
  const ordersSummary = useTodaysOrdersSummary();
  const { availabilityModalShown, setAvailabilityModalShown } = useContextAvailabilityModal();
  const locationDisclosureStatus = useContextLocationDisclosureStatus();
  const setLocationDisclosureShown = useContextSetLocationDisclosureShown();
  const [supportModalShown, setSupportModalShown] = useState(false);
  // handlers
  const updateMode = (mode: CourierMode) => {
    setAvailabilityModalShown(false);
    if (profile?.mode !== mode) {
      api.profile().updateProfile({ mode }).then(null);
    }
  };
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <LocationDisclosureModal
        visible={locationDisclosureStatus === 'not-shown'}
        onDismiss={() => {
          setLocationDisclosureShown();
          api.profile().updateProfile({ status: 'available' }).catch(console.error);
        }}
      />
      <AvailabilityModal
        visible={availabilityModalShown && locationDisclosureStatus === 'shown'}
        onConfirm={updateMode}
        onDismiss={() => setAvailabilityModalShown(false)}
      />
      <SupportModal visible={supportModalShown} onDismiss={() => setSupportModalShown(false)} />
      <DefaultView style={screens.headless}>
        <HomeHeader />
        <View style={{ padding: paddings.lg }}>
          <HomeFleet />
          <ActivitySummary
            entriesSummary={entriesSummary}
            ordersSummary={ordersSummary}
            title="Corridas nas últimas 24h"
            style={{ marginTop: paddings.lg }}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingVertical: paddings.sm,
            paddingHorizontal: paddings.lg,
            backgroundColor: colors.neutral50,
          }}
        >
          <OngoingOrdersCards />
          <ActiveRequestsCards />
          <Pressable onPress={() => router.push('/(logged)/howitworks')}>
            <DefaultCard
              icon={<DefaultCardIcon iconName="file" />}
              title="Como funciona o AppJusto"
              subtitle="Conheça as vantagens e entenda os benefícios que temos para você"
            />
          </Pressable>
          <Pressable onPress={() => router.push('/calculator/')}>
            <DefaultCard
              style={{ marginTop: paddings.sm }}
              icon={<DefaultCardIcon iconName="file" />}
              title="Calculadora de ganhos"
              subtitle="Calcule seus ganhos por corrida e por hora"
            />
          </Pressable>
          <Pressable onPress={() => setSupportModalShown(true)}>
            <DefaultCard
              style={{ marginTop: paddings.sm }}
              icon={<DefaultCardIcon iconName="alert" variant="warning" />}
              title="Preciso de ajuda"
              subtitle="Fale com nosso time ou faça uma denúncia"
            />
          </Pressable>
        </View>
      </DefaultView>
    </DefaultScrollView>
  );
}
