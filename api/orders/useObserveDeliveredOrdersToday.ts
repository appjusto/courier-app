import { useContextProfile } from '@/common/auth/AuthContext';
import { Dayjs } from '@appjusto/dates';
import { Order, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveDeliveredOrdersOptions } from './OrdersApi';

export const useObserveDeliveredOrdersToday = () => {
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
      from: Dayjs().startOf('day').toDate(),
    });
  }, [courierId]);
  useEffect(() => {
    if (!options) return;
    return api.orders().observeDeliveredOrders(options, setOrders);
  }, [api, options]);
  // result
  return orders;
};
