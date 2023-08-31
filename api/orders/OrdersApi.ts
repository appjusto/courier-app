import { documentsAs } from '@/common/firebase/documentAs';
import { Order, OrderStatus, WithId } from '@appjusto/types';
import firestore from '@react-native-firebase/firestore';
import { getOrdersRef } from '../firebase/refs/firestore';

export type ObserveDeliveredOrdersOptions = {
  courierId: string;
  from?: Date;
  to?: Date;
};

export default class OrdersApi {
  // observe orders
  observeDeliveredOrders(
    options: ObserveDeliveredOrdersOptions,
    resultHandler: (orders: WithId<Order>[]) => void
  ) {
    const { courierId, from, to } = options;
    let query = getOrdersRef()
      .where('courier.id', '==', courierId)
      .where('status', '==', 'delivered' as OrderStatus)
      .orderBy('createdOn', 'desc');
    if (from) {
      query = query.where('createdOn', '>', firestore.Timestamp.fromDate(from));
    }
    if (to) {
      query = query.where('createdOn', '<', firestore.Timestamp.fromDate(to));
    }
    return query.onSnapshot(
      async (snapshot) => {
        resultHandler(snapshot.empty ? [] : documentsAs<Order>(snapshot.docs));
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
