import { ChatMessage, WithId } from '@appjusto/types';
import { GroupedChatMessages } from './types';

export const unreadMessages = (chat?: GroupedChatMessages[], toId?: string) => {
  if (!chat) return [];
  return chat.reduce((result, group) => {
    return [
      ...result,
      ...group.messages.filter((message) => !message.read && (!toId || message.to.id === toId)),
    ];
  }, [] as WithId<ChatMessage>[]);
};
