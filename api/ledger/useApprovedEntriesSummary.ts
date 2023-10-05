import { useEntriesSummary } from './useEntriesSummary';
import { useObserveApprovedEntries } from './useObserveApprovedEntries';

export const useApprovedEntriesSummary = () => {
  // state
  const entries = useObserveApprovedEntries();
  return useEntriesSummary(entries);
};
