import { ChatMessage, ChatPublicMessage, ClientFlavor, WithId } from '@appjusto/types';

export interface GroupedChatMessages<T extends ChatMessage | ChatPublicMessage> {
  id: string;
  from: string;
  fromFlavor: ClientFlavor;
  fromName: string;
  messages: WithId<T>[];
}
