import { isOrderOngoing } from '@/api/orders/status';
import { OrderStatus } from '@appjusto/types';
import { router } from 'expo-router';
import { useEffect } from 'react';

export const useRouterAccordingOrderStatus = (orderId?: string, status?: OrderStatus | null) => {
  useEffect(() => {
    if (!orderId) return;
    if (status === undefined) return;
    if (status === null) {
      // TODO: removed from order
    } else if (isOrderOngoing(status)) {
      // @ts-expect-error
      router.replace({ pathname: '/order/(ongoing)/[id]', params: { id: orderId } });
    } else if (status === 'delivered') {
      // @ts-expect-error
      router.replace({ pathname: '/order/(delivered)/[id]', params: { id: orderId } });
    } else if (status === 'canceled') {
      // screen with cancellation info
    }
  }, [orderId, status]);
};
