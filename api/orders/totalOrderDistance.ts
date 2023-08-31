import { Order } from '@appjusto/types';

export const totalOrderDistance = (order: Order) => {
  const distanceToOrigin = order.courier?.distanceToOrigin ?? 0;
  const routeDistance = order.route?.distance ?? 0;
  return distanceToOrigin + routeDistance;
};
