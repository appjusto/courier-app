import { useContextUser } from '@/common/auth/AuthContext';
import { Loading } from '@/common/components/views/Loading';
import { useRootNavigationState, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  // context
  const router = useRouter();
  // state
  const mounted = Boolean(useRootNavigationState().key);
  const user = useContextUser();
  // side effects
  useEffect(() => {
    if (!mounted) return;
    // console.log('mounted', mounted, user);
    if (user === undefined) return;
    // if (user === null) router.replace('/welcome');
    // else router.replace('/logged');
    setTimeout(() => router.replace(user === null ? '/welcome' : '/logged'), 1);
  }, [mounted, user, router]);
  // UI
  return <Loading />;
}
