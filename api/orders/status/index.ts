import { OrderStatus } from '@appjusto/types';

export const OngoingOrdersStatuses: OrderStatus[] = [
  'scheduled',
  'confirming',
  'confirmed',
  'preparing',
  'ready',
  'dispatching',
];

export const isOrderOngoing = (status: OrderStatus) => OngoingOrdersStatuses.includes(status);
