import { getDispatchingStateFocus } from '@/api/orders/dispatching-state/getDispatchingStateFocus';
import { Order, WithId } from '@appjusto/types';
import { router } from 'expo-router';

export const openChat = (
  order: WithId<Order>,
  hasUnreadMessagesFromConsumer: boolean,
  hasUnreadMessagesFromBusiness: boolean
) => {
  let counterpartId = '';
  if (hasUnreadMessagesFromConsumer && !hasUnreadMessagesFromBusiness) {
    counterpartId = order.consumer.id;
  } else if (
    hasUnreadMessagesFromBusiness &&
    !hasUnreadMessagesFromConsumer &&
    order.business?.id
  ) {
    counterpartId = order.business.id;
  } else if (order.type === 'p2p') {
    counterpartId = order.consumer.id;
  } else if (getDispatchingStateFocus(order.dispatchingState) === 'pickup') {
    counterpartId = order.business!.id;
  }
  if (counterpartId) {
    router.push({
      pathname: '/(logged)/order/[id]/chat/[counterpart]',
      params: { id: order.id, counterpart: counterpartId },
    });
  } else {
    router.push({
      pathname: '/(logged)/order/[id]/chat-picker',
      params: {
        id: order.id,
        consumerId: order.consumer.id,
        businessId: order.business!.id,
        hasUnreadMessagesFromConsumer: `${hasUnreadMessagesFromConsumer}`,
        hasUnreadMessagesFromBusiness: `${hasUnreadMessagesFromBusiness}`,
      },
    });
  }
};
