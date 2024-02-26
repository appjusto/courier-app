import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import ProfilePIX from '@/common/screens/profile/pix';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';

export default function ProfilePIXScreen() {
  // tracking
  useTrackScreenView('Sua conta: pix');
  // UI
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Saque instantâneo' }} />
      <ProfilePIX />
    </DefaultView>
  );
}
