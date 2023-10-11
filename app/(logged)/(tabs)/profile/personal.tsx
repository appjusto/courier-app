import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import ProfilePersonalData from '@/common/screens/profile/personal';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';

export default function ProfilePersonalDataScreen() {
  // tracking
  useTrackScreenView('Sua conta: Dados pessoais');
  // UI
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Dados pessoais' }} />
      <ProfilePersonalData />
    </DefaultView>
  );
}
