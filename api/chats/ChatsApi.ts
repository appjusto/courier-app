import { documentsAs } from '@/common/firebase/documentAs';
import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import { Dayjs } from '@appjusto/dates';
import { ChatMessage, ChatPublicMessage, WithId } from '@appjusto/types';
import firestore from '@react-native-firebase/firestore';
import { LatLng } from 'react-native-maps';
import AuthApi from '../auth/AuthApi';
import { fromDate } from '../firebase/timestamp';
import { geolocationFromLatLng } from '../location/geolocationFromLatLng';

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

  observeAvailableCouriersChat(resultHandler: (chats: WithId<ChatPublicMessage>[]) => void) {
    const query = chatsRef()
      .where('type', '==', 'available-couriers')
      .where('timestamp', '>', fromDate(Dayjs().subtract(4, 'h').toDate()))
      .orderBy('timestamp', 'asc');
    return query.onSnapshot(
      async (snapshot) => {
        if (snapshot.empty) {
          resultHandler([]);
        } else {
          resultHandler(documentsAs<ChatPublicMessage>(snapshot.docs));
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async sendMessage(message: Partial<ChatMessage | ChatPublicMessage>) {
    await chatsRef().add({
      ...message,
      read: false,
      timestamp: serverTimestamp(),
    } as ChatMessage);
  }

  async sendPublicMessage(message: string, courierName: string, location?: LatLng) {
    await this.sendMessage({
      type: 'available-couriers',
      from: {
        agent: 'courier',
        id: this.auth.getUserId() as string,
        name: courierName,
        ...(location ? geolocationFromLatLng(location) : {}),
      },
      message: message.trim(),
    });
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
