import { Order } from '@appjusto/types';

export const getOrderTime = (order: Order) => {
  const time = order.timestamps?.delivered ?? order.timestamps?.confirmed ?? order.createdOn;
  return time.toDate();
};
