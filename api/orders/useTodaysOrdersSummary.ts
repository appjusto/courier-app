import { totalOrderDistance } from './distance/totalOrderDistance';
import { totalOrderTime } from './timestamp/totalOrderTime';
import { useObserveDeliveredOrdersToday } from './useObserveDeliveredOrdersToday';

export const useTodaysOrdersSummary = () => {
  // state
  const orders = useObserveDeliveredOrdersToday();
  const distance = orders
    ? orders.reduce((total, order) => total + totalOrderDistance(order), 0)
    : undefined;
  const time = orders
    ? orders.reduce((total, order) => total + totalOrderTime(order), 0)
    : undefined;
  // result
  return { distance, time };
};
