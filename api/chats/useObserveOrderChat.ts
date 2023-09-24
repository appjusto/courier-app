import { ChatMessage, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { groupOrderChatMessages } from './groupOrderChatMessages';
import { sortMessages } from './sortMessages';
import { GroupedChatMessages } from './types';

export const useObserveChat = (orderId?: string, counterpartId?: string) => {
  // context
  const api = useContextApi();
  // state
  const [orderChat, setOrderChat] = useState<WithId<ChatMessage>[]>();
  const [chat, setChat] = useState<WithId<GroupedChatMessages>[]>();
  // side effects
  useEffect(() => {
    if (!orderId) return;
    return api.chat().observeOrderChat(orderId, setOrderChat);
  }, [api, orderId]);
  useEffect(() => {
    if (!orderChat) return;
    setChat(
      groupOrderChatMessages(
        orderChat
          .filter((value) => !counterpartId || value.participantsIds.includes(counterpartId))
          .sort(sortMessages)
      )
    );
  }, [orderChat, counterpartId]);
  // result
  console.log(chat);
  return chat;
};
