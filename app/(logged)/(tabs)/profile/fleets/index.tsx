import { useObserveFleet } from '@/api/fleets/useObserveFleet';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { FleetCard } from '@/common/screens/profile/fleets/FleetCard';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';

export default function FleetsScreen() {
  // context
  const router = useRouter();
  const profile = useContextProfile();
  const fleet = useObserveFleet(profile?.fleetsIds?.find(() => true));
  // UI
  const title = 'Frota';
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
        onPress={() => router.push('/profile/fleets/search')}
      />
      <DefaultButton
        style={{ marginTop: paddings.lg }}
        variant="outline"
        title="Criar nova frota"
        onPress={() => null}
      />
    </DefaultScrollView>
  );
}
