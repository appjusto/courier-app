import { documentsAs } from '@/common/firebase/documentAs';
import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import { Fleet, WithId } from '@appjusto/types';
import firestore from '@react-native-firebase/firestore';
import ProfileApi from '../profile/ProfileApi';

const fleetsRef = () => firestore().collection('fleets');
// const fleetRef = (id: string) => fleetsRef().doc(id);

export default class FleetsApi {
  constructor(private profile: ProfileApi) {}
  observeFleets(ids: string[], resultHandler: (fleet: WithId<Fleet>[] | null) => void) {
    return fleetsRef()
      .where(firestore.FieldPath.documentId(), 'in', ids)
      .onSnapshot((snapshot) => {
        console.log('observeFleets', ids, snapshot.size);
        if (snapshot.empty) resultHandler(null);
        else resultHandler(documentsAs<Fleet>(snapshot.docs));
      });
  }
  async joinFleet(fleetId: string) {
    return this.profile.updateProfile({
      fleetsIds: firestore.FieldValue.arrayUnion(fleetId) as unknown as string[],
      updatedOn: serverTimestamp(),
    });
  }
  async leaveFleet(fleetId: string) {
    return this.profile.updateProfile({
      fleetsIds: firestore.FieldValue.arrayRemove(fleetId) as unknown as string[],
      updatedOn: serverTimestamp(),
    });
  }

  async createFleet(fleet: Fleet) {
    const ref = fleetsRef().doc();
    await ref.set(fleet);
    return ref.id;
  }
}
