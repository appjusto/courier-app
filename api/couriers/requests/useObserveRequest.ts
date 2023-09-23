import { useContextApi } from '@/api/ApiContext';
import { CourierOrderRequest, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';

export const useObserveRequest = (requestId: string) => {
  // context
  const api = useContextApi();
  // state
  const [request, setRequest] = useState<WithId<CourierOrderRequest> | null>();
  // side effects
  // observe order requests
  useEffect(() => {
    if (!requestId) return;
    return api.couriers().observeRequest(requestId, setRequest);
  }, [api, requestId]);
  // result
  return request;
};
