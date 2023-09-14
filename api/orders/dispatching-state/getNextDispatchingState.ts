import { Order } from '@appjusto/types';

export const getNextDispatchingState = (order: Order) => {
  const { dispatchingState } = order;
  if (dispatchingState === 'going-pickup') return 'arrived-pickup';
  if (dispatchingState === 'arrived-pickup') return 'going-destination';
  if (dispatchingState === 'going-destination') return 'arrived-destination';
  return null;
};
