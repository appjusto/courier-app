import { useContextUserId } from '@/common/auth/AuthContext';
import { Order, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveDeliveredOrdersOptions } from './OrdersApi';

export const useObserveOrdersFromPeriod = (from: Date | undefined, to: Date | undefined) => {
  // context
  const api = useContextApi();
  const courierId = useContextUserId();
  // state
  const [options, setOptions] = useState<ObserveDeliveredOrdersOptions>();
  const [orders, setOrders] = useState<WithId<Order>[]>();
  // side effects
  useEffect(() => {
    if (!courierId) return;
    if (!from) return;
    if (!to) return;
    setOptions({
      courierId,
      from,
      to,
    });
  }, [courierId, from, to]);
  useEffect(() => {
    if (!options) return;
    return api.orders().observeOrders(options, setOrders);
  }, [api, options]);
  // result
  return orders;
};
