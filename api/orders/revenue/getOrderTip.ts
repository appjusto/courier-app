import { Order } from '@appjusto/types';

export const getOrderTipRevenue = (order: Order) => {
  if (order.tip?.value && order.tip.status === 'paid') {
    return order.tip.value - (order.tip?.processing?.value ?? 0);
  }
  return 0;
};
