import { LedgerEntry } from '@appjusto/types';

export const totalEntriesValue = (entries: LedgerEntry[]) =>
  entries.reduce((total, entry) => total + entry.value, 0);
