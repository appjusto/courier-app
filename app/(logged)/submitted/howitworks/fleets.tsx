import FleetProcess from '@/common/components/profile/howitworks/fleets';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function FleetProcessScreen() {
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Frotas' }} />
      <FleetProcess />
    </ScrollView>
  );
}
