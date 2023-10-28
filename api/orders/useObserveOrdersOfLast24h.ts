import { Dayjs } from '@appjusto/dates';
import { Order, WithId } from '@appjusto/types';
import { useEffect, useRef, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveOrdersOptions } from './OrdersApi';

export const useObserveOrdersOfLast24h = () => {
  // context
  const api = useContextApi();
  // refs
  const optionsRef = useRef<ObserveOrdersOptions>({
    statuses: ['delivered'],
    from: Dayjs().subtract(1, 'day').toDate(),
  });
  const options = optionsRef.current;
  // state
  const [orders, setOrders] = useState<WithId<Order>[]>();
  useEffect(() => {
    return api.orders().observeOrders(options, setOrders);
  }, [api, options]);
  // result
  return orders;
};
