import { Bank, WithId } from '@appjusto/types';
import React from 'react';
import { useContextApi } from '../ApiContext';

export default function () {
  // context
  const api = useContextApi();
  // state
  const [banks, setBanks] = React.useState<WithId<Bank>[]>();
  // side effects
  React.useEffect(() => {
    (async () => {
      setBanks(await api.getPlatform().fetchBanks());
    })();
  }, [api]);
  return banks;
}
