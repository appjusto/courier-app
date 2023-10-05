import { useUniqState } from '@/common/react/useUniqState';
import { LedgerEntry, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveLedgerOptions } from './LedgerApi';

export const useObserveLedgerFromPeriod = (_from: Date | undefined, _to: Date | undefined) => {
  // context
  const api = useContextApi();
  // state
  const from = useUniqState(_from);
  const to = useUniqState(_to);
  const [options, setOptions] = useState<ObserveLedgerOptions>();
  const [entries, setEntries] = useState<WithId<LedgerEntry>[]>();
  // side effects
  useEffect(() => {
    if (!from) return;
    if (!to) return;
    setOptions({
      from,
      to,
    });
  }, [from, to]);
  useEffect(() => {
    if (!options) return;
    return api.ledger().observeLedger(options, setEntries);
  }, [api, options]);
  // result
  return entries;
};
