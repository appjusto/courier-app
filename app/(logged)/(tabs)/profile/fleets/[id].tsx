import { useObserveFleet } from '@/api/fleets/useObserveFleet';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { FleetCard } from '@/common/screens/profile/fleets/FleetCard';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function FleetDetailScreen() {
  // context
  // @ts-expect-error
  const params = useLocalSearchParams<{ id: string }>();
  const fleet = useObserveFleet(params.id);
  // UI
  const title = 'Frota';
  if (!fleet) return <Loading title={title} />;
  return (
    <DefaultScrollView style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title }} />
      <DefaultText size="lg">Sua frota atual</DefaultText>
      <FleetCard style={{ marginTop: paddings.xl }} fleet={fleet} />
    </DefaultScrollView>
  );
}
