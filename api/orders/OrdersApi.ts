import { documentAs, documentsAs } from '@/common/firebase/documentAs';
import { getAppVersion } from '@/common/version';
import { getFirebaseRegion } from '@/extra';
import {
  CompleteDeliveryPayload,
  MatchOrderPayload,
  Order,
  OrderStatus,
  WithId,
} from '@appjusto/types';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { fromDate } from '../firebase/timestamp';

// functions
const region = getFirebaseRegion();
const matchOrder = firebase.app().functions(region).httpsCallable('matchOrder');
const completeDelivery = firebase.app().functions(region).httpsCallable('completeDelivery');

// firestore
const ordersRef = () => firestore().collection('orders');
const orderRef = (id: string) => ordersRef().doc(id);

// API
export interface ObserveDeliveredOrdersOptions {
  courierId: string;
  statuses?: OrderStatus[];
  from?: Date;
  to?: Date;
}

interface CompleteDeliveryOptions {
  orderId: string;
  handshakeResponse?: string;
  deliveredTo?: string;
  comment?: string;
}
export default class OrdersApi {
  // observe orders
  observeOrders(
    options: ObserveDeliveredOrdersOptions,
    resultHandler: (orders: WithId<Order>[]) => void
  ) {
    console.log('observeOrders', options);
    const { courierId, statuses, from, to } = options;
    let query = ordersRef().where('courier.id', '==', courierId).orderBy('createdOn', 'desc');
    if (statuses) {
      query = query.where('status', 'in', statuses);
    }
    if (from) {
      query = query.where('createdOn', '>', fromDate(from));
    }
    if (to) {
      query = query.where('createdOn', '<', fromDate(to));
    }
    return query.onSnapshot(
      async (snapshot) => {
        console.log('observeOrders snapshot', snapshot.size);
        resultHandler(snapshot.empty ? [] : documentsAs<Order>(snapshot.docs));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  observeOrder(orderId: string, resultHandler: (orders: WithId<Order> | null) => void) {
    const query = orderRef(orderId);
    return query.onSnapshot(
      async (snapshot) => {
        resultHandler(snapshot.exists ? documentAs<Order>(snapshot) : null);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async updateOrder(orderId: string, update: Partial<Order>) {
    console.log('updating order', orderId, JSON.stringify(update));
    await orderRef(orderId).update(update);
  }

  async matchOrder(orderId: string, distanceToOrigin: number | undefined) {
    console.log('matchOrder');
    const payload: MatchOrderPayload = {
      orderId,
      distanceToOrigin,
      meta: { version: getAppVersion() },
    };
    await matchOrder(payload);
  }

  async completeDelivery({
    orderId,
    handshakeResponse,
    deliveredTo,
    comment,
  }: CompleteDeliveryOptions) {
    console.log('completeDelivery');
    const payload: CompleteDeliveryPayload = {
      orderId,
      handshakeResponse,
      deliveredTo,
      comment,
      meta: { version: getAppVersion() },
    };
    await completeDelivery(payload);
  }
}
