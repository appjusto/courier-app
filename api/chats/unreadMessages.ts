import { ChatMessage, WithId } from '@appjusto/types';
import { GroupedChatMessages } from './types';

export const unreadMessages = (chat?: GroupedChatMessages[], fromId?: string) => {
  if (!chat) return [];
  return chat.reduce((result, group) => {
    // group.messages.forEach((message) => {
    //   console.log(message.message, message.read, message.to.id, fromId);
    // });
    return [
      ...result,
      ...group.messages.filter(
        (message) => !message.read && (!fromId || message.from.id === fromId)
      ),
    ];
  }, [] as WithId<ChatMessage>[]);
};
