import { useContextProfile } from '@/common/auth/AuthContext';
import { useObserveFleet } from './useObserveFleet';

export const useObserveActiveFleet = () => {
  // context
  const profile = useContextProfile();
  // state
  const fleet = useObserveFleet(profile?.fleetsIds?.find(() => true));
  // result
  return fleet;
};
