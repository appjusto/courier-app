import { ChatMessage, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { groupOrderChatMessages } from './groupOrderChatMessages';
import { sortMessages } from './sortMessages';
import { GroupedChatMessages } from './types';

export const useObserveChat = (orderId: string | undefined, counterpartId: string | undefined) => {
  // context
  const api = useContextApi();
  // state
  const [orderChat, setOrderChat] = useState<WithId<ChatMessage>[]>();
  const [chat, setChat] = useState<WithId<GroupedChatMessages>[]>();
  // side effects
  useEffect(() => {
    if (!orderId) return;
    if (!counterpartId) return;
    return api.chat().observeOrderChat(orderId, setOrderChat);
  }, [api, orderId, counterpartId]);
  useEffect(() => {
    if (!orderChat) return;
    if (!counterpartId) return;
    setChat(
      groupOrderChatMessages(
        orderChat
          .filter((value) => value.participantsIds?.includes(counterpartId))
          .sort(sortMessages)
      )
    );
  }, [orderChat, counterpartId]);
  // result
  return chat;
};
