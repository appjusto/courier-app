import { Order, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveDeliveredOrdersOptions } from './OrdersApi';
import { OngoingOrdersStatuses } from './status';

export const useObserveOngoingOrders = (enabled = true) => {
  // context
  const api = useContextApi();
  // state
  const [options, setOptions] = useState<ObserveDeliveredOrdersOptions>();
  const [orders, setOrders] = useState<WithId<Order>[]>();
  // side effects
  useEffect(() => {
    setOptions({
      statuses: OngoingOrdersStatuses,
    });
  }, []);
  useEffect(() => {
    if (!enabled) return;
    if (!options) return;
    return api.orders().observeOrders(options, setOrders);
  }, [api, options, enabled]);
  // result
  return orders;
};
