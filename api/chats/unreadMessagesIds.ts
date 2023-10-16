import { ChatMessage, WithId } from '@appjusto/types';
import { GroupedChatMessages } from './types';

export const unreadMessagesIds = (chat?: GroupedChatMessages[], fromId?: string) => {
  if (!chat) return [];
  if (!fromId) return [];
  // console.log('unreadMessagesIds; fromId:', fromId);
  const messages = chat.reduce((result, group) => {
    // group.messages.forEach((message) => {
    //   console.log(message.message, message.read, message.to.id, fromId);
    // });
    return [
      ...result,
      ...group.messages.filter((message) => !message.read && message.from.id === fromId),
    ];
  }, [] as WithId<ChatMessage>[]);
  return messages.map((message) => message.id);
};
