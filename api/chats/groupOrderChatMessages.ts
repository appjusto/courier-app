import { ChatMessage, ChatPublicMessage, WithId } from '@appjusto/types';
import { last } from 'lodash';
import { GroupedChatMessages } from './types';

const groupId = (message: ChatMessage | ChatPublicMessage) => message.from.id ?? message.from.agent;

export const groupOrderChatMessages = <T extends ChatMessage | ChatPublicMessage>(
  messages: WithId<T>[]
) =>
  messages.reduce<GroupedChatMessages<T>[]>((groups, message) => {
    const currentGroup = last(groups);
    if (groupId(message) === currentGroup?.from) {
      currentGroup!.messages.push(message);
      return groups;
    }
    // use as id for chat group the id of the first message of the group
    return [
      ...groups,
      {
        id: message.id,
        messages: [message],
        from: groupId(message),
        fromFlavor: message.from.agent,
      } as GroupedChatMessages<T>,
    ];
  }, []);
