import { unreadMessagesIds } from '@/api/chats/unreadMessagesIds';
import { useObserveChat } from '@/api/chats/useObserveOrderChat';
import { getDispatchingStateFocus } from '@/api/orders/dispatching-state/getDispatchingStateFocus';
import { Order, WithId } from '@appjusto/types';
import { router } from 'expo-router';

export const useChatHandler = (order?: WithId<Order> | null) => {
  const orderId = order?.id;
  const dispatchingState = order?.dispatchingState;
  const chatWithConsumer = useObserveChat(orderId, order?.consumer.id);
  const chatWithBusiness = useObserveChat(orderId, order?.business?.id);
  const hasUnreadMessagesFromConsumer = Boolean(
    unreadMessagesIds(chatWithConsumer, order?.consumer.id)?.length
  );
  const hasUnreadMessagesFromBusiness = Boolean(
    unreadMessagesIds(chatWithBusiness, order?.business?.id)?.length
  );
  const hasUnreadMessages = hasUnreadMessagesFromConsumer || hasUnreadMessagesFromBusiness;
  const openChat = () => {
    if (!order || !orderId) return;
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
    } else if (getDispatchingStateFocus(dispatchingState) === 'pickup') {
      counterpartId = order.business!.id;
    }
    if (counterpartId) {
      router.push({
        pathname: '/(logged)/order/[id]/chat/[counterpart]',
        params: { id: orderId, counterpart: counterpartId },
      });
    } else {
      router.push({
        pathname: '/(logged)/order/[id]/chat-picker',
        params: {
          id: orderId,
          consumerId: order.consumer.id,
          businessId: order.business!.id,
          hasUnreadMessagesFromConsumer: `${hasUnreadMessagesFromConsumer}`,
          hasUnreadMessagesFromBusiness: `${hasUnreadMessagesFromBusiness}`,
        },
      });
    }
  };
  return { hasUnreadMessages, openChat };
};
