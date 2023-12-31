import { useContextApi } from '@/api/ApiContext';
import { CourierOrderRequest, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';

export const useObserveOrderRequest = (orderId: string) => {
  // context
  const api = useContextApi();
  // state
  const [request, setRequest] = useState<WithId<CourierOrderRequest> | null>();
  // side effects
  // observe order requests
  useEffect(() => {
    if (!orderId) return;
    return api.couriers().observeOrderRequest(orderId, setRequest);
  }, [api, orderId]);
  // result
  return request;
};
