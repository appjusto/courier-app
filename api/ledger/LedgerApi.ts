import { documentAs, documentsAs } from '@/common/firebase/documentAs';
import { LedgerEntry, LedgerEntryStatus, WithId } from '@appjusto/types';
import crashlytics from '@react-native-firebase/crashlytics';
import firestore from '@react-native-firebase/firestore';
import AuthApi from '../auth/AuthApi';
import { fromDate } from '../firebase/timestamp';

// firestore
const ledgerRef = () => firestore().collection('ledger');
const entryRef = (id: string) => ledgerRef().doc(id);

// API

export interface ObserveLedgerOptions {
  statuses?: LedgerEntryStatus[];
  limit?: number;
  from?: Date;
  to?: Date;
}
export default class LedgerApi {
  constructor(private auth: AuthApi) {}
  // observe orders
  observeLedger(
    options: ObserveLedgerOptions,
    resultHandler: (orders: WithId<LedgerEntry>[]) => void
  ) {
    console.log('observeLedger', options);
    const { statuses, from, to } = options;
    let query = ledgerRef()
      .where('to.accountType', '==', 'courier')
      .where('to.accountId', '==', this.auth.getUserId())
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
        console.log('observeLedger snapshot', snapshot.size);
        resultHandler(snapshot.empty ? [] : documentsAs<LedgerEntry>(snapshot.docs));
      },
      (error) => {
        console.error(error);
      }
    );
  }
  async fetchLedgerEntry(id: string) {
    try {
      const snapshot = await entryRef(id).get();
      if (!snapshot.exists) return null;
      return documentAs<LedgerEntry>(snapshot);
    } catch (error: unknown) {
      if (error instanceof Error) crashlytics().recordError(error);
      throw new Error('Não foi possível obter detalhes do ganho. Tente novamente mais tarde.');
    }
  }
}
