import { ChatMessage, WithId } from '@appjusto/types';
import { useEffect, useState } from 'react';
import { useContextApi } from '../ApiContext';
import { useContextInitialLocation } from '../location/context/useContextInitialLocation';
import { groupOrderChatMessages } from './groupOrderChatMessages';
import { sortMessages } from './sortMessages';
import { GroupedChatMessages } from './types';

export const useFetchAvailableCouriersChatAround = (enabled: boolean) => {
  // context
  const api = useContextApi();
  const location = useContextInitialLocation();
  // state
  const [messages, setMessages] = useState<WithId<ChatMessage>[]>();
  const [chat, setChat] = useState<WithId<GroupedChatMessages>[]>();
  // side effects
  useEffect(() => {
    if (!enabled) return;
    if (!location) return;
    api.chat().fetchAvailableCouriersChat(location).then(setMessages);
  }, [api, enabled, location]);
  useEffect(() => {
    if (!messages) return;
    setChat(groupOrderChatMessages(messages.sort(sortMessages)));
  }, [messages]);
  // result
  return chat;
};
