import { ChatMessage, WithId } from '@appjusto/types';
import { last } from 'lodash';
import { GroupedChatMessages } from './types';

export const groupOrderChatMessages = (messages: WithId<ChatMessage>[]) =>
  messages.reduce<GroupedChatMessages[]>((groups, message) => {
    const currentGroup = last(groups);
    if (message.from.id === currentGroup?.from) {
      currentGroup!.messages.push(message);
      return groups;
    }
    // use as id for chat group the id of the first message of the group
    return [
      ...groups,
      {
        id: message.id,
        messages: [message],
        from: message.from.id,
        fromFlavor: message.from.agent,
      } as GroupedChatMessages,
    ];
  }, []);
