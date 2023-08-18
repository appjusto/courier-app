import { useProfile } from '@/api/profile/useProfile';
import { Loading } from '@/common/components/views/Loading';
import { useRootNavigationState, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  // context
  const router = useRouter();
  // state
  const mounted = Boolean(useRootNavigationState().key);
  const profile = useProfile();
  // side effects
  useEffect(() => {
    if (!mounted) return;
    if (profile === undefined) return;
    if (profile === null) router.replace('/welcome');
    else router.replace('/logged');
  }, [mounted, profile, router]);
  // UI
  return <Loading />;
}
