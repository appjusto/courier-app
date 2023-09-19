import { isOrderOngoing } from '@/api/orders/status';
import { OrderStatus } from '@appjusto/types';
import { useEffect } from 'react';
import { replaceRouteAccordingOrderStatus } from './replaceRouteAccordingOrderStatus';

export const useRouterAccordingOrderStatus = (orderId?: string, status?: OrderStatus | null) => {
  console.log('useRouterAccordingOrderStatus', status);
  useEffect(() => {
    console.log(orderId, status, status ? isOrderOngoing(status) : '-');
    if (!orderId) return;
    if (status === undefined) return;
    replaceRouteAccordingOrderStatus(orderId, status);
  }, [orderId, status]);
};
