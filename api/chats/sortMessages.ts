import { ChatMessage } from '@appjusto/types';

export const sortMessages = (a: ChatMessage, b: ChatMessage) => {
  if (a.timestamp && b.timestamp) return a.timestamp.toMillis() - b.timestamp.toMillis();
  if (!a.timestamp) return 1;
  else if (!b.timestamp) return -1;
  return 0;
};
