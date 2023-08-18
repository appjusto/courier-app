import { useProfile } from '@/api/profile/useProfile';
import { Loading } from '@/common/components/views/Loading';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  // context
  const router = useRouter();
  // state
  const profile = useProfile();
  const situation = profile?.situation;
  // side effects
  useEffect(() => {
    if (!situation) return;
    // router.replace('/welcome');
    router.replace('/sign-in');
    // if (situation === 'approved') {
    //   router.replace('/home');
    // } else if (situation === 'pending') {
    //   router.replace('/pending');
    // }
  }, [situation, router]);
  // UI
  return <Loading />;
}
