import { getDispatchingStateFocus } from '@/api/orders/dispatching-state/getDispatchingStateFocus';
import { Order } from '@appjusto/types';

export const useOngoingIssueType = (order?: Order | null) => {
  if (!order) return undefined;
  const { type, dispatchingState } = order;
  if (type === 'food') {
    if (getDispatchingStateFocus(dispatchingState) === 'pickup') {
      return 'courier-pickup-food-delivery';
    } else if (dispatchingState === 'going-destination') {
      return 'courier-delivering-food-order';
    } else if (dispatchingState === 'arrived-destination') {
      return 'courier-destination-food';
    }
  } else if (type === 'p2p') {
    if (getDispatchingStateFocus(dispatchingState) === 'pickup') {
      return 'courier-pickup-p2p-delivery';
    } else if (dispatchingState === 'going-destination') {
      return 'courier-delivering-p2p-order';
    } else if (dispatchingState === 'arrived-destination') {
      return 'courier-destination-p2p';
    }
  }
};
