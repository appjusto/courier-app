import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveActiveFleet } from '@/api/fleets/useObserveActiveFleet';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { FleetCard } from '@/common/screens/profile/fleets/fleet-card';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function FleetsScreen() {
  // context
  const router = useRouter();
  // state
  const fleet = useObserveActiveFleet();
  // tracking
  useTrackScreenView('Sua frota', { fleetId: fleet?.id }, Boolean(fleet));
  // UI
  const title = 'Sua frota';
  if (!fleet) return <Loading title={title} />;
  return (
    <DefaultScrollView style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title }} />
      <DefaultText size="lg">Sua frota atual</DefaultText>
      <FleetCard style={{ marginTop: paddings.xl }} fleet={fleet} />
      <View style={{ flex: 1 }} />
      <DefaultButton
        style={{ marginTop: paddings.lg }}
        title="Ver todas as frotas disponíveis"
        onPress={() => router.push('/fleets/search')}
      />
      <LinkButton
        style={{ marginVertical: paddings.lg, alignSelf: 'center' }}
        variant="ghost"
        size="md"
        onPress={() => router.push('/fleets/create')}
      >
        Criar nova frota
      </LinkButton>
    </DefaultScrollView>
  );
}
