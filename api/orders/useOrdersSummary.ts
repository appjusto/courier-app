import { Order, WithId } from '@appjusto/types';
import { totalOrderDistance } from './distance/totalOrderDistance';
import { getOrderRevenue } from './revenue/getOrderRevenue';
import { totalOrderTime } from './timestamp/totalOrderTime';

export interface OrdersSummary {
  total: number | undefined;
  revenue: number | undefined;
  distance: number | undefined;
  time: number | undefined;
}

export const useOrdersSummary = (orders: WithId<Order>[] | undefined): OrdersSummary => {
  const total = orders?.length ?? 0;
  const revenue = orders
    ? orders.reduce((total, order) => total + getOrderRevenue(order), 0)
    : undefined;
  const distance = orders
    ? orders.reduce((total, order) => total + totalOrderDistance(order), 0)
    : undefined;
  const time = orders
    ? orders.reduce((total, order) => total + totalOrderTime(order), 0)
    : undefined;
  return { total, revenue, distance, time };
};
