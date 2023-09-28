import { Loading } from '@/common/components/views/Loading';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

export default function FleetDeeplinkScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const fleetId = params.id;
  // side effects
  useEffect(() => {
    if (!router) return;
    router.replace({ pathname: '/profile/fleets/[id]', params: { id: fleetId } });
  }, [fleetId]);
  // UI
  return <Loading />;
}
