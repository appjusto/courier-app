import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { shareFleet } from '@/api/fleets/shareFleet';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function CreateFleetFeedbackScreen() {
  // params
  const search = useLocalSearchParams<{ id: string; name: string }>();
  const { id, name } = search;
  // tracking
  useTrackScreenView('Frota criada');
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
        <Pressable onPress={() => shareFleet(id, name)}>
          {({ pressed }) => (
            <DefaultCard
              style={{ marginTop: paddings.md }}
              icon={<DefaultCardIcon iconName="chat" variant="darker" />}
              title="Compartilhar frota"
              subtitle="Convide seus colegas para participar dessa frota"
            />
          )}
        </Pressable>
        <LinkButton
          style={{ marginTop: paddings.xl, alignSelf: 'center' }}
          variant="ghost"
          onPress={() => router.back()}
        >
          Voltar
        </LinkButton>
      </View>
    </DefaultScrollView>
  );
}
