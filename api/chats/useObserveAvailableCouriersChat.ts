import { ChatMessage, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { groupOrderChatMessages } from './groupOrderChatMessages';
import { sortMessages } from './sortMessages';
import { GroupedChatMessages } from './types';

export const useObserveAvailableCouriersChat = (enabled: boolean) => {
  // context
  const api = useContextApi();
  // state
  const [messages, setMessages] = useState<WithId<ChatMessage>[]>();
  const [chat, setChat] = useState<WithId<GroupedChatMessages>[]>();
  // side effects
  useEffect(() => {
    if (!enabled) return;
    return api.chat().observeAvailableCouriersChat(setMessages);
  }, [api, enabled]);
  useEffect(() => {
    if (!messages) return;
    setChat(groupOrderChatMessages(messages.sort(sortMessages)));
  }, [messages]);
  // result
  return chat;
};
