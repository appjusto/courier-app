import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useShowDisplayOverApps } from '@/api/couriers/useShowDisplayOverApps';
import {
  useContextSetLocationDisclosureShown,
  useContextShouldShowLocationDisclosure,
} from '@/api/location/context/LocationContext';
import { useObserveOrdersOfLast24h } from '@/api/orders/useObserveOrdersOfLast24h';
import { useOrdersSummary } from '@/api/orders/useOrdersSummary';
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
import { DisplayOverAppsModal } from '@/common/screens/home/display-over-apps-modal';
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
import { Linking, Pressable, View } from 'react-native';

export default function HomeScreen() {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const router = useRouter();
  // tracking
  useTrackScreenView('Início');
  // state
  // const entriesSummary = useApprovedEntriesSummary();
  const orders = useObserveOrdersOfLast24h();
  const ordersSummary = useOrdersSummary(orders);
  const { availabilityModalShown, setAvailabilityModalShown } = useContextAvailabilityModal();
  const shouldShowLocationDisclosure = useContextShouldShowLocationDisclosure();
  const setLocationDisclosureShown = useContextSetLocationDisclosureShown();
  const [supportModalShown, setSupportModalShown] = useState(false);
  const { shouldShowdisplayOverApps, setDisplayOverAppsShown } = useShowDisplayOverApps(
    shouldShowLocationDisclosure
  );
  // handlers
  const updateMode = (mode: CourierMode) => {
    setAvailabilityModalShown(false);
    if (profile?.mode !== mode) {
      api.profile().updateProfile({ mode }).then(null);
    }
  };
  // UI
  return (
    <View style={{ ...screens.default }}>
      <LocationDisclosureModal
        visible={shouldShowLocationDisclosure}
        onDismiss={() => {
          setLocationDisclosureShown();
          api.profile().updateProfile({ status: 'available' }).catch(console.error);
        }}
      />
      <AvailabilityModal
        visible={availabilityModalShown && !shouldShowLocationDisclosure}
        onConfirm={updateMode}
        onDismiss={() => setAvailabilityModalShown(false)}
      />
      <SupportModal visible={supportModalShown} onDismiss={() => setSupportModalShown(false)} />
      <DisplayOverAppsModal
        visible={Boolean(shouldShowdisplayOverApps) && !shouldShowLocationDisclosure}
        onOpenSettings={() => {
          setDisplayOverAppsShown();
          Linking.openSettings().catch((error) => {
            console.error(error);
          });
        }}
        onDismiss={() => setDisplayOverAppsShown()}
      />
      <DefaultView style={screens.headless}>
        <HomeHeader />
        <DefaultScrollView>
          <View style={{ padding: paddings.lg }}>
            <HomeFleet />
            <ActivitySummary
              // entriesSummary={entriesSummary}
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
        </DefaultScrollView>
      </DefaultView>
    </View>
  );
}
