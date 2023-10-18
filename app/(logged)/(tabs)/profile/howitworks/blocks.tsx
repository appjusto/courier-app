import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { BlockProcess } from '@/common/screens/profile/howitworks/blocks';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function BlockProcessScreen() {
  // tracking
  useTrackScreenView('Sua conta / Como funciona: bloqueios');
  // UI
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Bloqueios' }} />
      <BlockProcess variant="how-it-works" />
    </ScrollView>
  );
}
