import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useContextProfile } from '@/common/auth/AuthContext';
import { Loading } from '@/common/components/views/Loading';
import { useSafeRouter } from '@/common/deeplink/useSafeRouter';
import { useEffect } from 'react';

export default function Index() {
  // context
  const router = useSafeRouter();
  // state
  const profile = useContextProfile();
  const situation = profile === null ? null : profile?.situation;
  // side effects
  useTrackScreenView('Index');
  // routing
  useEffect(() => {
    if (!router) return;
    if (situation === undefined) return;
    if (situation === null) router.replace('/welcome');
    else if (situation === 'approved') router.replace('/home');
  }, [situation, router]);
  // UI
  return <Loading />;
}
