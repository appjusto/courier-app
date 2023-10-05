import { Order } from '@appjusto/types';

export const getOrderExtraRevenue = (order: Order) => {
  let value = 0;
  (order.fare?.courier?.extras ?? []).forEach((extra) => {
    value += extra.value;
  });
  return value;
};
