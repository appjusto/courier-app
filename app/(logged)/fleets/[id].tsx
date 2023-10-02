import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveFleet } from '@/api/fleets/useObserveFleet';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { Loading } from '@/common/components/views/Loading';
import { FleetCard } from '@/common/screens/profile/fleets/FleetCard';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function FleetDetailScreen() {
  // context
  const params = useLocalSearchParams<{ id: string }>();
  const fleet = useObserveFleet(params.id);
  // tracking
  useTrackScreenView('Frota', { fleetName: fleet?.name }, Boolean(fleet));
  // UI
  if (!fleet) return <Loading />;
  return (
    <DefaultScrollView style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title: `Frota ${fleet.name}` }} />
      <FleetCard style={{ marginTop: paddings.xl }} fleet={fleet} />
    </DefaultScrollView>
  );
}
