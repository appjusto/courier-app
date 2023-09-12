import { documentsAs } from '@/common/firebase/documentAs';
import { getAppVersion } from '@/common/version';
import { getFirebaseRegion } from '@/extra';
import { MatchOrderPayload, Order, OrderStatus, WithId } from '@appjusto/types';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { fromDate } from '../firebase/timestamp';

// functions
const region = getFirebaseRegion();
const matchOrder = firebase.app().functions(region).httpsCallable('matchOrder');

// firestore
const ordersRef = () => firestore().collection('orders');
// const getOrderRef = (id: string) => ordersRef().doc(id);

// API
export type ObserveDeliveredOrdersOptions = {
  courierId: string;
  statuses?: OrderStatus[];
  from?: Date;
  to?: Date;
};
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
        console.log('snapshot', snapshot.size);
        resultHandler(snapshot.empty ? [] : documentsAs<Order>(snapshot.docs));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async matchOrder(orderId: string, distanceToOrigin: number | undefined) {
    const payload: MatchOrderPayload = {
      orderId,
      distanceToOrigin,
      meta: { version: getAppVersion() },
    };
    await matchOrder(payload);
  }
}
