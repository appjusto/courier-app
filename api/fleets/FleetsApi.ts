import { documentAs } from '@/common/firebase/documentAs';
import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import { Fleet, WithId } from '@appjusto/types';
import firestore from '@react-native-firebase/firestore';
import ProfileApi from '../profile/ProfileApi';

const fleetsRef = () => firestore().collection('fleets');
const fleetRef = (id: string) => fleetsRef().doc(id);

export default class FleetsApi {
  constructor(private profile: ProfileApi) {}
  observeFleet(id: string, resultHandler: (fleet: WithId<Fleet> | null) => void) {
    return fleetRef(id).onSnapshot(async (snapshot) => {
      if (!snapshot.exists) {
        resultHandler(null);
      } else {
        resultHandler(documentAs<Fleet>(snapshot));
      }
    });
  }
  async joinFleet(fleetId: string) {
    return this.profile.updateProfile({ fleetsIds: [fleetId], updatedOn: serverTimestamp() });
  }

  async createFleet(fleet: Fleet) {
    const ref = fleetsRef().doc();
    await ref.set(fleet);
    return ref.id;
  }
}
