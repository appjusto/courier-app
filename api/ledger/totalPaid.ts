import { LedgerEntry } from '@appjusto/types';
import { totalEntriesValue } from './totalEntriesValue';

export const totalPaid = (entries: LedgerEntry[] = []) =>
  totalEntriesValue(entries.filter((entry) => entry.status === 'paid'));
