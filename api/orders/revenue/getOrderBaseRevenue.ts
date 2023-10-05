import { Order } from '@appjusto/types';

export const getOrderBaseRevenue = (order: Order) => {
  if (!order.fare?.courier) return 0;
  else if (order.fare.courier.paid) return order.fare.courier.paid;
  else if (order.fare.courier.netValue) {
    return order.fare.courier.netValue + (order.fare.courier.locationFee ?? 0);
  }
  return 0;
};
