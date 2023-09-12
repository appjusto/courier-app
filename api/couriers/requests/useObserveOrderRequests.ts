import { useContextApi } from '@/api/ApiContext';
import { CourierOrderRequest, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';

export const useObserveOrderRequests = (orderId: string) => {
  // context
  const api = useContextApi();
  // state
  const [requests, setRequests] = useState<WithId<CourierOrderRequest>[]>();
  // side effects
  // observe order requests
  useEffect(() => {
    return api.couriers().observeOrderRequests(orderId, setRequests);
  }, [api, orderId]);
  // result
  return requests;
};
