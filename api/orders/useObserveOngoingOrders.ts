import { Order, WithId } from '@appjusto/types';
import { useEffect, useRef, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { ObserveOrdersOptions } from './OrdersApi';
import { OngoingOrdersStatuses } from './status';

export const useObserveOngoingOrders = (enabled = true) => {
  // context
  const api = useContextApi();
  // refs
  const optionsRef = useRef<ObserveOrdersOptions>({ statuses: OngoingOrdersStatuses });
  const options = optionsRef.current;
  // state
  const [orders, setOrders] = useState<WithId<Order>[]>();
  useEffect(() => {
    if (!enabled) return;
    return api.orders().observeOrders(options, setOrders);
  }, [api, options, enabled]);
  // result
  return orders;
};
