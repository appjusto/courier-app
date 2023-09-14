import { useContextUserId } from '@/common/auth/AuthContext';
import { Order, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';

export const useObserveOrder = (orderId?: string, enabled = true) => {
  // context
  const api = useContextApi();
  const courierId = useContextUserId();
  // state
  const [order, setOrder] = useState<WithId<Order> | null>();
  // side effects
  useEffect(() => {
    if (!enabled) return;
    if (!courierId) return;
    if (!orderId) return;
    return api.orders().observeOrder(orderId, setOrder);
  }, [api, enabled, courierId, orderId]);
  // result
  return order;
};
