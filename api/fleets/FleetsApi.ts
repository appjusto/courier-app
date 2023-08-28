import { documentAs } from '@/common/firebase/documentAs';
import { Fleet, WithId } from '@appjusto/types';
import { getFleetRef } from '../firebase/refs/firestore';

export default class FleetsApi {
  observeFleet(id: string, resultHandler: (fleet: WithId<Fleet> | null) => void) {
    return getFleetRef(id).onSnapshot(async (snapshot) => {
      if (!snapshot.exists) {
        resultHandler(null);
      } else {
        resultHandler(documentAs<Fleet>(snapshot));
      }
    });
  }
}
