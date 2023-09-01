import { useContextProfile } from '@/common/auth/AuthContext';
import { Dayjs } from '@appjusto/dates';
import { Order, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveDeliveredOrdersOptions } from './OrdersApi';

export const useObserveOrdersOfLast24h = () => {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const courierId = profile?.id;
  // state
  const [options, setOptions] = useState<ObserveDeliveredOrdersOptions>();
  const [orders, setOrders] = useState<WithId<Order>[]>();
  // side effects
  useEffect(() => {
    if (!courierId) return;
    setOptions({
      courierId,
      from: Dayjs().subtract(1, 'day').toDate(),
    });
  }, [courierId]);
  useEffect(() => {
    if (!options) return;
    return api.orders().observeOrders(options, setOrders);
  }, [api, options]);
  // result
  return orders;
};
