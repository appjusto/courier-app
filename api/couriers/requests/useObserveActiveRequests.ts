import { useContextApi } from '@/api/ApiContext';
import { CourierOrderRequest, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';

export const useObserveActiveRequests = () => {
  // context
  const api = useContextApi();
  // state
  const [requests, setRequests] = useState<WithId<CourierOrderRequest>[]>();
  // side effects
  // observe pending requests
  useEffect(() => {
    return api.couriers().observeActiveRequests(setRequests);
  }, [api]);
  // result
  return requests;
};
