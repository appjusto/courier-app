import { Loading } from '@/common/components/views/Loading';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

export default function FleetDeeplinkScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const fleetId = params.id;
  console.log('FleetDeeplinkScreen', fleetId);

  // UI
  // useFocusEffect(
  //   useCallback(() => {
  //     router.replace({ pathname: '/profile/fleets/[id]', params: { id: fleetId } });
  //   }, [fleetId])
  // );
  useEffect(() => {
    router.replace({ pathname: '/profile/fleets/[id]', params: { id: fleetId } });
  }, [fleetId]);
  return <Loading />;
}
