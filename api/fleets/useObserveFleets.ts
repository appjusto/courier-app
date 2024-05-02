import { Fleet, WithId } from '@appjusto/types';
import React from 'react';
import { useContextApi } from '../ApiContext';

export const useObserveFleets = (ids: string[] | undefined) => {
  // context
  const api = useContextApi();
  // state
  const [fleets, setFleets] = React.useState<WithId<Fleet>[] | null>();
  // side effects
  // observe fleet
  React.useEffect(() => {
    if (!ids?.length) return;
    return api.fleets().observeFleets(ids, setFleets);
  }, [api, ids]);
  // result
  // console.log(fleets);
  return fleets;
};
