import { LedgerEntry } from '@appjusto/types';
import { uniq } from 'lodash';
import { totalEntriesValue } from './totalEntriesValue';

export interface EntriesSummary {
  total: number | undefined;
  orders: string[] | undefined;
}

export const useEntriesSummary = (entries: LedgerEntry[] | undefined): EntriesSummary => {
  // state
  const total = entries ? totalEntriesValue(entries) : undefined;
  const orders = entries
    ? uniq(entries.map((entry) => entry.orderId).filter((value) => Boolean(value)) as string[])
    : undefined;
  // result
  return { total, orders };
};
