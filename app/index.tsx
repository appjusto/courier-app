import { useContextProfile } from '@/common/auth/AuthContext';
import { Loading } from '@/common/components/views/Loading';
import { useDeeplink } from '@/common/deeplink/useDeeplink';
import { useSafeRouter } from '@/common/deeplink/useSafeRouter';
import { useEffect } from 'react';

export default function Index() {
  // context
  const router = useSafeRouter();
  // state
  const user = useContextProfile();
  // side effects
  // deeplink
  useDeeplink();
  // routing
  useEffect(() => {
    if (!router) return;
    if (user === undefined) return;
    if (user === null) router.replace('/welcome');
    else router.replace('/logged');
    // ShowToast('Index ' + user?.id);
    // setTimeout(() => router.replace(user === null ? '/welcome' : '/logged'), 1);
  }, [user, router]);
  // UI
  return <Loading />;
}
