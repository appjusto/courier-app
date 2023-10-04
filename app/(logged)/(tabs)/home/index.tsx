import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import {
  useContextLocationDisclosureStatus,
  useContextSetLocationDisclosureShown,
} from '@/api/location/context/LocationContext';
import { shareAppJusto } from '@/api/platform/shareAppJusto';
import { useContextAvailabilityModal } from '@/api/preferences/context/PreferencesContext';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { CenteredModal } from '@/common/components/modals/centered/centered-modal';
import { DefaultText } from '@/common/components/texts/DefaultText';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { HomeActivity } from '@/common/screens/home/activity/home-activity';
import { AvailabilityModal } from '@/common/screens/home/availability-modal';
import { ActiveRequestsCards } from '@/common/screens/home/cards/active-requests-cards';
import { OngoingOrdersCards } from '@/common/screens/home/cards/ongoing-orders-cards';
import { HomeFleet } from '@/common/screens/home/fleet/home-fleet';
import { HomeHeader } from '@/common/screens/home/header/home-header';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { CourierMode } from '@appjusto/types';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function HomeScreen() {
  // context
  const api = useContextApi();
  const router = useRouter();
  // tracking
  useTrackScreenView('Início');
  // state
  const { availabilityModalShown, setAvailabilityModalShown } = useContextAvailabilityModal();
  const locationDisclosureStatus = useContextLocationDisclosureStatus();
  const setLocationDisclosureShown = useContextSetLocationDisclosureShown();
  // handlers
  const updateMode = (mode: CourierMode) => {
    setAvailabilityModalShown(false);
    api.profile().updateProfile({ mode }).then(null);
  };
  console.log(availabilityModalShown);
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <CenteredModal
        visible={locationDisclosureStatus === 'not-shown'}
        onDismiss={setLocationDisclosureShown}
      >
        <DefaultText>
          Você precisa permitir que o AppJusto saiba sua localização o tempo todo para que possamos
          enviar corridas próximas à você e acompanhar as entregas. Nós só coletamos e utilizamos
          sua localização caso você esteja disponível para aceitar corridas.
        </DefaultText>
      </CenteredModal>
      <AvailabilityModal
        visible={availabilityModalShown && locationDisclosureStatus === 'shown'}
        onConfirm={updateMode}
        onDismiss={() => setAvailabilityModalShown(false)}
      />
      <DefaultView style={screens.headless}>
        <HomeHeader />
        <View style={{ padding: paddings.lg }}>
          <HomeFleet />
          <HomeActivity style={{ marginTop: paddings.lg }} />
        </View>
        <View style={{ flex: 1, padding: paddings.lg, backgroundColor: colors.neutral50 }}>
          <OngoingOrdersCards />
          <ActiveRequestsCards />
          <Pressable onPress={() => router.push('/(logged)/howitworks')}>
            <DefaultCard
              icon={<DefaultCardIcon iconName="file" />}
              title="Como funciona o AppJusto"
              subtitle="Conheça as vantagens e entenda os benefícios que temos para você"
            />
          </Pressable>
          <Pressable style={{ marginTop: paddings.lg }} onPress={() => shareAppJusto()}>
            <DefaultCard
              icon={<DefaultCardIcon iconName="chat" />}
              title="Divulgue o AppJusto"
              subtitle="Compartilhe esse movimento por uma economia mais justa"
            />
          </Pressable>
          <Pressable style={{ marginTop: paddings.lg }} onPress={() => null}>
            <DefaultCard
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
