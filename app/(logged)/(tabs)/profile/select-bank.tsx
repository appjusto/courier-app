import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import ProfileSelectBank from '@/common/screens/profile/select-bank';
import { router } from 'expo-router';

export default function ProfileSelectBankScreen() {
  // tracking
  useTrackScreenView('Sua conta: escolha de banco');
  // UI
  return (
    <ProfileSelectBank
      onSelectBank={(id) => {
        router.push({ pathname: `/profile/bank`, params: { bankId: id } });
      }}
    />
  );
}
