import { Order } from '@appjusto/types';

export const getOrderTimestamp = (order: Order) => {
  return order.timestamps?.delivered ?? order.timestamps?.confirmed ?? order.createdOn;
};
