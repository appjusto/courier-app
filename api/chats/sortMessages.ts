import { ChatMessage, ChatPublicMessage } from '@appjusto/types';

export const sortMessages = <T extends ChatMessage | ChatPublicMessage>(a: T, b: T) => {
  if (a.timestamp && b.timestamp) return a.timestamp.toMillis() - b.timestamp.toMillis();
  if (!a.timestamp) return 1;
  else if (!b.timestamp) return -1;
  return 0;
};
