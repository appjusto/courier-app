import { LedgerEntry, WithId } from '@appjusto/types';
import { useEffect, useRef, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveLedgerOptions } from './LedgerApi';

export const useObserveApprovedEntries = () => {
  // context
  const api = useContextApi();
  // refs
  const optionsRef = useRef<ObserveLedgerOptions>({ statuses: ['approved'] });
  const options = optionsRef.current;
  // state
  const [entries, setEntries] = useState<WithId<LedgerEntry>[]>();
  // side effects
  useEffect(() => {
    return api.ledger().observeLedger(options, setEntries);
  }, [api, options]);
  // result
  return entries;
};
