import { useUniqState } from '@/common/react/useUniqState';
import { Order, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveOrdersOptions } from './OrdersApi';

export const useObserveOrdersFromPeriod = (_from: Date | undefined, _to: Date | undefined) => {
  // context
  const api = useContextApi();
  // state
  const from = useUniqState(_from);
  const to = useUniqState(_to);
  const [options, setOptions] = useState<ObserveOrdersOptions>();
  const [orders, setOrders] = useState<WithId<Order>[]>();
  // side effects
  useEffect(() => {
    if (!from) return;
    if (!to) return;
    setOptions({
      from,
      to,
    });
  }, [from, to]);
  useEffect(() => {
    if (!options) return;
    return api.orders().observeOrders(options, setOrders);
  }, [api, options]);
  // result
  return orders;
};
