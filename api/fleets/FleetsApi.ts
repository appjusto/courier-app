import { documentAs } from '@/common/firebase/documentAs';
import { Fleet, WithId } from '@appjusto/types';
import firestore from '@react-native-firebase/firestore';

const fleetRef = (id: string) => firestore().collection('fleets').doc(id);

export default class FleetsApi {
  observeFleet(id: string, resultHandler: (fleet: WithId<Fleet> | null) => void) {
    return fleetRef(id).onSnapshot(async (snapshot) => {
      if (!snapshot.exists) {
        resultHandler(null);
      } else {
        resultHandler(documentAs<Fleet>(snapshot));
      }
    });
  }
}
