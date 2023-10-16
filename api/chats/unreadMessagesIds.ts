import { ChatMessage, ClientFlavor, WithId } from '@appjusto/types';
import { GroupedChatMessages } from './types';

export const unreadMessagesIds = (
  chat: GroupedChatMessages[] | undefined,
  fromId: string | undefined,
  fromFlavor: ClientFlavor | undefined
) => {
  if (!chat) return [];
  if (!fromId) return [];
  if (!fromFlavor) return [];
  // console.log('unreadMessagesIds; fromId:', fromId);
  const messages = chat.reduce((result, group) => {
    // group.messages.forEach((message) => {
    //   console.log(message.message, message.read, message.to.id, fromId);
    // });
    return [
      ...result,
      ...group.messages.filter(
        (message) =>
          !message.read && message.from.id === fromId && message.from.agent === fromFlavor
      ),
    ];
  }, [] as WithId<ChatMessage>[]);
  return messages.map((message) => message.id);
};
