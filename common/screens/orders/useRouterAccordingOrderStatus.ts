import { isOrderOngoing } from '@/api/orders/status';
import { OrderStatus } from '@appjusto/types';
import { router } from 'expo-router';
import { useEffect } from 'react';

export const useRouterAccordingOrderStatus = (orderId?: string, status?: OrderStatus) => {
  useEffect(() => {
    if (!orderId) return;
    if (!status) return;
    if (isOrderOngoing(status)) {
      // @ts-expect-error
      router.replace({ pathname: '/order/(ongoing)/[id]', params: { id: orderId } });
    }
  }, [orderId, status]);
};
