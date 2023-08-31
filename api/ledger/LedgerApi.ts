import { documentsAs } from '@/common/firebase/documentAs';
import { LedgerEntry, LedgerEntryStatus, WithId } from '@appjusto/types';
import { getLedgerRef } from '../firebase/refs/firestore';

export default class LedgerApi {
  // observe orders
  observeApprovedEntries(
    courierId: string,
    resultHandler: (orders: WithId<LedgerEntry>[]) => void
  ) {
    const query = getLedgerRef()
      .where('to.accountType', '==', 'courier')
      .where('to.accountId', '==', courierId)
      .where('status', '==', 'approved' as LedgerEntryStatus)
      .orderBy('createdOn', 'desc');
    return query.onSnapshot(
      async (snapshot) => {
        resultHandler(snapshot.empty ? [] : documentsAs<LedgerEntry>(snapshot.docs));
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
