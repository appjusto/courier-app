import { documentAs, documentsAs } from '@/common/firebase/documentAs';
import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import { getAppVersion } from '@/common/version';
import { getFirebaseRegion } from '@/extra';
import {
  CompleteDeliveryPayload,
  DropOrderPayload,
  Issue,
  MatchOrderPayload,
  Order,
  OrderReview,
  OrderStatus,
  RejectOrderPayload,
  WithId,
} from '@appjusto/types';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { omit } from 'lodash';
import AuthApi from '../auth/AuthApi';
import { fromDate } from '../firebase/timestamp';
import StorageApi from '../storage/StorageApi';

// functions
const region = getFirebaseRegion();
const matchOrder = firebase.app().functions(region).httpsCallable('matchOrder');
const rejectOrder = firebase.app().functions(region).httpsCallable('rejectOrder');
const dropOrder = firebase.app().functions(region).httpsCallable('dropOrder');
const completeDelivery = firebase.app().functions(region).httpsCallable('completeDelivery');

// firestore
const ordersRef = () => firestore().collection('orders');
const orderRef = (id: string) => ordersRef().doc(id);
const reviewsRef = () => firestore().collection('reviews');
const reviewRef = (id: string) => reviewsRef().doc(id);

// API
export interface ObserveDeliveredOrdersOptions {
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
  constructor(
    private auth: AuthApi,
    private storage: StorageApi
  ) {}
  // observe orders
  observeOrders(
    options: ObserveDeliveredOrdersOptions,
    resultHandler: (orders: WithId<Order>[]) => void
  ) {
    console.log('observeOrders', options);
    const { statuses, from, to } = options;
    let query = ordersRef()
      .where('courier.id', '==', this.auth.getUserId())
      .orderBy('createdOn', 'desc');
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

  async rejectOrder(orderId: string, issue: Issue, comment: string) {
    console.log('rejectOrder');
    const payload: RejectOrderPayload = {
      orderId,
      issue,
      comment,
      meta: { version: getAppVersion() },
    };
    await rejectOrder(payload);
  }

  async dropOrder(orderId: string, issue: Issue, comment: string) {
    console.log('dropOrder');
    const payload: DropOrderPayload = {
      orderId,
      issue,
      comment,
      meta: { version: getAppVersion() },
    };
    await dropOrder(payload);
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

  // reviews
  observeOrderReview(orderId: string, resultHandler: (orders: WithId<OrderReview> | null) => void) {
    const query = reviewsRef()
      .where('orderId', '==', orderId)
      .where('createdBy.id', '==', this.auth.getUserId());
    return query.onSnapshot(
      async (snapshot) => {
        if (snapshot.empty) {
          resultHandler(null);
        } else {
          resultHandler(documentsAs<OrderReview>(snapshot.docs)[0]);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async setOrderReview(orderId: string, review: Partial<WithId<OrderReview>>) {
    const reviewId = review.id ?? reviewsRef().doc().id;
    await reviewRef(reviewId).set(
      {
        ...omit(review, ['id']),
        orderId,
        createdBy: {
          id: this.auth.getUserId(),
          flavor: 'courier',
        },
        reviewedOn: serverTimestamp(),
      } as OrderReview,
      { merge: true }
    );
  }

  getOrderPODPackagePath(orderId: string) {
    return `orders/${orderId}/${this.auth.getUserId()}/package.jpg`;
  }
  getOrderPODFrontPath(orderId: string) {
    return `orders/${orderId}/${this.auth.getUserId()}/front.jpg`;
  }
}
