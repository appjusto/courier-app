import { useProfile } from '@/api/profile/useProfile';
import { Loading } from '@/common/components/views/Loading';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function PendingIndex() {
  // context
  // state
  const profile = useProfile();
  const situation = profile?.situation;
  // side effects
  useEffect(() => {
    if (!situation) return;
    if (situation === 'approved') router.replace('/home');
    else if (situation === 'pending') router.replace('/pending');
  }, [situation]);
  // UI
  return <Loading />;
}
