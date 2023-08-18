import ProfileSelectBank from '@/common/screens/profile/select-bank';
import { router } from 'expo-router';

export default function PendingSelectBankScreen() {
  console.log('PendingSelectBankScreen');
  // UI
  return (
    <ProfileSelectBank
      onSelectBank={(id) => {
        router.push({ pathname: `/pending/pager`, params: { bankId: id } });
      }}
    />
  );
}
