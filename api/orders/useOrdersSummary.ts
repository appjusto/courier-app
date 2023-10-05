import { Order, WithId } from '@appjusto/types';
import { totalOrderDistance } from './distance/totalOrderDistance';
import { totalOrderTime } from './timestamp/totalOrderTime';

export interface OrdersSummary {
  distance: number | undefined;
  time: number | undefined;
}

export const useOrdersSummary = (orders: WithId<Order>[] | undefined): OrdersSummary => {
  const distance = orders
    ? orders.reduce((total, order) => total + totalOrderDistance(order), 0)
    : undefined;
  const time = orders
    ? orders.reduce((total, order) => total + totalOrderTime(order), 0)
    : undefined;
  return { distance, time };
};
