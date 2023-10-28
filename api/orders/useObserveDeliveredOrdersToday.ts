import { Dayjs } from '@appjusto/dates';
import { Order, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveOrdersOptions } from './OrdersApi';

export const useObserveDeliveredOrdersToday = () => {
  // context
  const api = useContextApi();
  // state
  const [options, setOptions] = useState<ObserveOrdersOptions>();
  const [orders, setOrders] = useState<WithId<Order>[]>();
  // side effects
  useEffect(() => {
    setOptions({
      from: Dayjs().startOf('day').toDate(),
      statuses: ['delivered'],
    });
  }, []);
  useEffect(() => {
    if (!options) return;
    return api.orders().observeOrders(options, setOrders);
  }, [api, options]);
  // result
  return orders;
};
