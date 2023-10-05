import { useObserveDeliveredOrdersToday } from './useObserveDeliveredOrdersToday';
import { useOrdersSummary } from './useOrdersSummary';

export const useTodaysOrdersSummary = () => {
  const orders = useObserveDeliveredOrdersToday();
  return useOrdersSummary(orders);
};
