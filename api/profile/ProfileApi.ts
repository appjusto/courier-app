import { documentAs, documentsAs } from '@/common/firebase/documentAs';
import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import { getInstallationId } from '@/common/security/getInstallationId';
import { getAppVersion } from '@/common/version';
import { CourierProfile, ProfileChange, UserProfile, WithId } from '@appjusto/types';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { hash } from 'geokit';
import { Platform } from 'react-native';
import AuthApi from '../auth/AuthApi';
import StorageApi from '../storage/StorageApi';

// firestore
const profileRef = (id: string) => firestore().collection('couriers').doc(id);
const usersRef = () => firestore().collection('users');
const usersSubcollectionsRef = () => usersRef().doc('subcollections');
const usersChangesRef = () => usersSubcollectionsRef().collection('changes');

// storage

export default class ProfileApi {
  constructor(
    private auth: AuthApi,
    private storage: StorageApi
  ) {}

  // public API
  async createProfile(id: string) {
    // console.log('createProfile', id);
    await profileRef(id).set(
      {
        situation: 'pending',
        email: this.auth.getEmail() ?? null,
        phone: this.auth.getPhoneNumber(true) ?? null,
        createdOn: firestore.FieldValue.serverTimestamp(),
      } as UserProfile,
      { merge: true }
    );
  }
  // observe profile changes
  observeProfile<T extends UserProfile>(
    id: string,
    resultHandler: (profile: WithId<T> | null) => void
  ) {
    // console.log('observeProfile', id);
    return profileRef(id).onSnapshot(async (snapshot) => {
      // console.log('profile.exists', snapshot.exists);
      if (!snapshot.exists) {
        await this.createProfile(id);
        // resultHandler(null);
      } else {
        resultHandler(documentAs<T>(snapshot));
      }
    });
  }
  // update profile
  async updateProfile(id: string, changes: Partial<CourierProfile>, retry = 5) {
    const appVersion = getAppVersion();
    const appInstallationId = await getInstallationId();
    const update: Partial<UserProfile> = {
      ...changes,
      appVersion,
      appInstallationId,
      platform: Platform.OS,
      updatedOn: serverTimestamp(),
    };
    try {
      await profileRef(id).update(update);
    } catch (error) {
      if (retry > 0) {
        setTimeout(() => this.updateProfile(id, changes, retry - 1), 2000);
      } else {
        throw error;
      }
    }
  }

  async submitProfile() {
    const courierId = this.auth.getUserId();
    if (!courierId) return;
    await profileRef(courierId).update({
      situation: 'submitted',
      updatedOn: serverTimestamp(),
    } as Partial<CourierProfile>);
  }

  async updateLocation(id: string, location: FirebaseFirestoreTypes.GeoPoint) {
    const update: Partial<UserProfile> = {
      coordinates: location,
      g: {
        geopoint: location,
        geohash: hash({
          lat: location.latitude,
          lng: location.longitude,
        }),
      },
      updatedOn: serverTimestamp(),
    };
    await this.updateProfile(id, update);
  }

  async requestProfileChange(changes: Partial<ProfileChange>) {
    await usersChangesRef().add({
      userType: 'courier',
      situation: 'pending',
      createdOn: serverTimestamp(),
      ...changes,
    });
  }

  async observePendingChange(
    id: string,
    resultHandler: (profile: WithId<ProfileChange> | null) => void
  ) {
    const query = usersChangesRef()
      .where('accountId', '==', id)
      .where('situation', '==', 'pending')
      .limit(1);
    return query.onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          resultHandler(null);
        } else {
          resultHandler(documentsAs<ProfileChange>(snapshot.docs)[0]);
        }
      },
      (error) => {
        console.error(error);
        // Sentry.Native.captureException(error);
      }
    );
  }

  getSelfiePath(size?: string) {
    const courierId = this.auth.getUserId();
    if (!courierId) return null;
    return `couriers/${courierId}/selfie${size ? `_${size}x${size}` : ''}.jpg`;
  }
  getDocumentPath(size?: string) {
    const courierId = this.auth.getUserId();
    if (!courierId) return null;
    return `couriers/${courierId}/document${size ? `_${size}x${size}` : ''}.jpg`;
  }
}
