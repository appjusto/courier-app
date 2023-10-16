import { ChatMessage, ClientFlavor, WithId } from '@appjusto/types';

export interface GroupedChatMessages {
  id: string;
  from: string;
  fromFlavor: ClientFlavor;
  messages: WithId<ChatMessage>[];
}
