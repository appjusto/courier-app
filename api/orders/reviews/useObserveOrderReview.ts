import { OrderReview, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../../ApiContext';

export const useObserveOrderReview = (orderId?: string) => {
  // context
  const api = useContextApi();
  // state
  const [review, setReview] = useState<WithId<OrderReview> | null>();
  // side effects
  useEffect(() => {
    if (!orderId) return;
    return api.orders().observeOrderReview(orderId, setReview);
  }, [api, orderId]);
  // result
  return review;
};
