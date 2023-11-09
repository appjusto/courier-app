import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { ShareFleetCard } from '@/common/screens/home/fleet/share-fleet-card';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function CreateFleetFeedbackScreen() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // params
  const search = useLocalSearchParams<{ id: string; name: string }>();
  const { id, name } = search;
  // tracking
  useTrackScreenView('Frota criada');
  // handlers
  const joinFleet = () => {
    trackEvent('Entrou na frota', { fleetId: id });
    api
      .fleets()
      .joinFleet(id)
      .then(() => {
        showToast(`Você agora faz parte da frota ${name}!`, 'success');
        router.back();
      });
  };
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Frota criada' }} />
      <FeedbackHeader
        title="Sua frota foi criada com sucesso!"
        text={[
          'Compartilhe sua frota com seus colegas de trabalho pois as frotas só aparecerem como opção para o cliente quando houver pelo menos 5 pessoas disponíveis para realizar a entrega.',
        ]}
        variant="success"
      />
      <View style={{ flex: 1, padding: paddings.lg }}>
        <View style={{ flex: 1 }} />
        <ShareFleetCard fleetId={id} fleetName={name} />
        <DefaultButton
          style={{ marginTop: paddings.lg }}
          title="Entrar na frota"
          onPress={joinFleet}
        />
        <LinkButton
          style={{ marginTop: paddings.lg, alignSelf: 'center' }}
          size="md"
          variant="ghost"
          onPress={() => router.back()}
        >
          Voltar
        </LinkButton>
      </View>
    </DefaultScrollView>
  );
}
