import { documentsAs } from '@/common/firebase/documentAs';
import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import { ChatMessage, WithId } from '@appjusto/types';
import firestore from '@react-native-firebase/firestore';
import AuthApi from '../auth/AuthApi';

const chatsRef = () => firestore().collection('chats');
const chatRef = (id: string) => firestore().collection('chats').doc(id);

export default class ChatsApi {
  constructor(private auth: AuthApi) {}

  observeOrderChat(orderId: string, resultHandler: (chats: WithId<ChatMessage>[]) => void) {
    const query = chatsRef()
      .where('orderId', '==', orderId)
      .where('participantsIds', 'array-contains', this.auth.getUserId())
      .orderBy('timestamp', 'asc');
    return query.onSnapshot(async (snapshot) => {
      if (snapshot.empty) {
        resultHandler([]);
      } else {
        resultHandler(documentsAs<ChatMessage>(snapshot.docs));
      }
    });
  }

  async sendMessage(message: Partial<ChatMessage>) {
    await chatsRef().add({
      ...message,
      read: false,
      timestamp: serverTimestamp(),
    } as ChatMessage);
  }

  async updateReadMessages(messageIds: string[]) {
    const batch = firestore().batch();
    messageIds.forEach((id) => {
      batch.update(chatRef(id), {
        read: true,
      } as Partial<ChatMessage>);
    });
    await batch.commit();
  }
}
