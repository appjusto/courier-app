import { uniq } from 'lodash';
import { totalEntriesValue } from './totalEntriesValue';
import { useObserveApprovedEntries } from './useObserveApprovedEntries';

export const useApprovedEntriesSummary = () => {
  // state
  const entries = useObserveApprovedEntries();
  const total = entries ? totalEntriesValue(entries) : undefined;
  const numberOfOrders = entries
    ? uniq(entries.map((entry) => entry.orderId).filter((value) => Boolean(value))).length
    : undefined;
  // result
  return { total, numberOfOrders };
};
