import { Bank, WithId } from '@appjusto/types';
import React from 'react';
import { useContextApi } from '../../ApiContext';

export const useFetchBanks = () => {
  // context
  const api = useContextApi();
  // state
  const [banks, setBanks] = React.useState<WithId<Bank>[]>();
  // side effects
  React.useEffect(() => {
    (async () => {
      setBanks(await api.platform().fetchBanks());
    })();
  }, [api]);
  return banks;
};
