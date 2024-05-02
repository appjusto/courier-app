import { useUniqState } from '@/common/react/useUniqState';
import { useObserveFleets } from './useObserveFleets';

export const useObserveFleet = (fleetId: string | undefined) => {
  const ids = useUniqState(fleetId ? [fleetId] : undefined);
  const fleets = useObserveFleets(ids);
  return fleets?.find(() => true);
};
