import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import ProfileBank from '@/common/screens/profile/bank';
import screens from '@/common/styles/screens';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

export default function ProfileBankScreen() {
  // params
  const search = useLocalSearchParams<{ bankId: string }>();
  // tracking
  useTrackScreenView('Sua conta: Dados bancários');
  // context
  const router = useRouter();
  // UI
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Dados bancários' }} />
      <ProfileBank
        bankId={search?.bankId}
        onSelectBank={() => router.push('/profile/select-bank')}
      />
    </DefaultView>
  );
}
