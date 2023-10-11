import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import ProfileCompany from '@/common/screens/profile/company';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';

export default function ProfileCompanyScreen() {
  // tracking
  useTrackScreenView('Sua conta: Dados da sua PJ');
  // UI
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Dados da sua PJ' }} />
      <ProfileCompany />
    </DefaultView>
  );
}
