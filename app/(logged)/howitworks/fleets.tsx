import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import FleetProcess from '@/common/screens/profile/howitworks/fleets';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function FleetProcessScreen() {
  // tracking
  useTrackScreenView('Como funciona: frotas');
  // UI
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Frotas' }} />
      <FleetProcess />
    </ScrollView>
  );
}
