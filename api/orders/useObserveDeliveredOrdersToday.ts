import { useContextUserId } from '@/common/auth/AuthContext';
import { Dayjs } from '@appjusto/dates';
import { Order, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveDeliveredOrdersOptions } from './OrdersApi';

export const useObserveDeliveredOrdersToday = () => {
  // context
  const api = useContextApi();
  const courierId = useContextUserId();
  // state
  const [options, setOptions] = useState<ObserveDeliveredOrdersOptions>();
  const [orders, setOrders] = useState<WithId<Order>[]>();
  // side effects
  useEffect(() => {
    if (!courierId) return;
    setOptions({
      courierId,
      from: Dayjs().startOf('day').toDate(),
      statuses: ['delivered'],
    });
  }, [courierId]);
  useEffect(() => {
    if (!options) return;
    return api.orders().observeOrders(options, setOrders);
  }, [api, options]);
  // result
  return orders;
};
