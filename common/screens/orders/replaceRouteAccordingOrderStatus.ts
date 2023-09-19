import { isOrderOngoing } from '@/api/orders/status';
import { OrderStatus } from '@appjusto/types';
import { router } from 'expo-router';

export const replaceRouteAccordingOrderStatus = (orderId: string, status: OrderStatus | null) => {
  console.log('replaceRouteAccordingOrderStatus', status);
  if (status === null) {
    // TODO: removed from order
  } else if (isOrderOngoing(status)) {
    router.replace({ pathname: '/(logged)/order/[id]/ongoing', params: { id: orderId } });
  } else if (status === 'delivered') {
    router.replace({ pathname: '/(logged)/order/[id]/delivered', params: { id: orderId } });
  } else if (status === 'canceled') {
    // screen with cancellation info
  }
};
