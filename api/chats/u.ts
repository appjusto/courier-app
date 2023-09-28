import { ChatMessage, WithId } from '@appjusto/types';
import { GroupedChatMessages } from './types';

export const unreadMessages = (chat: GroupedChatMessages[], toId: string) =>
  chat.reduce((result, group) => {
    return [
      ...result,
      ...group.messages.filter((message) => message.to.id === toId && !message.read),
    ];
  }, [] as WithId<ChatMessage>[]);
