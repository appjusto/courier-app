import { Fleet, WithId } from '@appjusto/types';
import React from 'react';
import { useContextApi } from '../ApiContext';

export const useObserveFleet = (fleetId: string | undefined) => {
  // context
  const api = useContextApi();
  // state
  const [fleet, setFleet] = React.useState<WithId<Fleet> | null>();
  // side effects
  // observe fleet
  React.useEffect(() => {
    if (!fleetId) return;
    return api.fleets().observeFleet(fleetId, setFleet);
  }, [api, fleetId]);
  // result
  return fleet;
};
