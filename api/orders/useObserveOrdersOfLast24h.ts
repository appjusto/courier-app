import { Dayjs } from '@appjusto/dates';
import { Order, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveDeliveredOrdersOptions } from './OrdersApi';

export const useObserveOrdersOfLast24h = () => {
  // context
  const api = useContextApi();
  // state
  const [options, setOptions] = useState<ObserveDeliveredOrdersOptions>();
  const [orders, setOrders] = useState<WithId<Order>[]>();
  // side effects
  useEffect(() => {
    setOptions({
      from: Dayjs().subtract(1, 'day').toDate(),
    });
  }, []);
  useEffect(() => {
    if (!options) return;
    return api.orders().observeOrders(options, setOrders);
  }, [api, options]);
  // result
  return orders;
};
