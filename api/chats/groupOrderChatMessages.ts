import { ChatMessage, WithId } from '@appjusto/types';
import { first } from 'lodash';
import { GroupedChatMessages } from './types';

export const groupOrderChatMessages = (messages: WithId<ChatMessage>[]) =>
  messages.reduce<GroupedChatMessages[]>((groups, message) => {
    const currentGroup = first(groups);
    if (message.from.id === currentGroup?.from) {
      currentGroup!.messages.push(message);
      return groups;
    }
    // use as id for chat group the id of the first message of the group
    return [{ id: message.id, from: message.from.id, messages: [message] }, ...groups];
  }, []);
