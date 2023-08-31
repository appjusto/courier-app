import { useContextProfile } from '@/common/auth/AuthContext';
import { LedgerEntry, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';

export const useObserveApprovedEntries = () => {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const courierId = profile?.id;
  // state
  const [entries, setEntries] = useState<WithId<LedgerEntry>[]>();
  // side effects
  useEffect(() => {
    if (!courierId) return;
    return api.ledger().observeApprovedEntries(courierId, setEntries);
  }, [api, courierId]);
  // result
  return entries;
};
