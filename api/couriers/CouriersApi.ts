import { documentAs, documentsAs } from '@/common/firebase/documentAs';
import { getAppVersion } from '@/common/version';
import { getFirebaseRegion } from '@/extra';
import { AccountWithdraw, FetchAccountInformationResponse } from '@appjusto/types';
import firebase from '@react-native-firebase/app';
import crashlytics from '@react-native-firebase/crashlytics';
import firestore from '@react-native-firebase/firestore';
import AuthApi from '../auth/AuthApi';
import { fromDate } from '../firebase/timestamp';

// functions
const region = getFirebaseRegion();
const fetchAccountInformation = firebase
  .app()
  .functions(region)
  .httpsCallable('fetchAccountInformation');

// firestore
const withdrawsRef = () => firestore().collection('withdraws');
const withdrawRef = (id: string) => firestore().collection('withdraws').doc(id);
export default class CouriersApi {
  constructor(private auth: AuthApi) {}

  async fetchAccountInformation() {
    try {
      return (
        await fetchAccountInformation({
          accountType: 'courier',
          accountId: this.auth.getUserId(),
          meta: { version: getAppVersion() },
        })
      ).data as FetchAccountInformationResponse;
    } catch (error: unknown) {
      if (error instanceof Error) crashlytics().recordError(error);
      throw new Error('Não foi possível obter seu saldo. Tente novamente mais tarde.');
    }
  }

  async fetchWithdraws(from: Date, to: Date) {
    try {
      const query = withdrawsRef()
        .where('accountId', '==', this.auth.getUserId())
        .where('createdOn', '>', fromDate(from))
        .where('createdOn', '<', fromDate(to));
      const snapshot = await query.get();
      if (snapshot.empty) return [];
      return documentsAs<AccountWithdraw>(snapshot.docs);
    } catch (error: unknown) {
      if (error instanceof Error) crashlytics().recordError(error);
      throw new Error('Não foi possível obter suas transferências. Tente novamente mais tarde.');
    }
  }

  async fetchWithdraw(id: string) {
    try {
      const snapshot = await withdrawRef(id).get();
      if (!snapshot.exists) return null;
      return documentAs<AccountWithdraw>(snapshot);
    } catch (error: unknown) {
      if (error instanceof Error) crashlytics().recordError(error);
      throw new Error(
        'Não foi possível obter detalhes da transferências. Tente novamente mais tarde.'
      );
    }
  }
}
