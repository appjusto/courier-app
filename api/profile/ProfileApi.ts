import { documentAs, documentsAs } from '@/common/firebase/documentAs';
import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import { getAppVersion } from '@/common/version';
import { CourierProfile, ProfileChange, UserProfile, WithId } from '@appjusto/types';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { hash } from 'geokit';
import { Platform } from 'react-native';
import AuthApi from '../auth/AuthApi';
import { putFile } from '../files/putFile';
import { getProfile, getUsersChangesRef } from '../firebase/refs/firestore';
import { getDocumentPath, getSelfiePath } from '../firebase/refs/storage';

export default class ProfileApi {
  constructor(private auth: AuthApi) {}

  // public API
  async createProfile(id: string) {
    await getProfile(id).set(
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
    return getProfile(id).onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          resultHandler(null);
        } else {
          resultHandler(documentAs<T>(snapshot));
        }
      },
      (error) => {
        console.error(error);
        // Sentry.Native.captureException(error);
      }
    );
  }
  // update profile
  async updateProfile(id: string, changes: Partial<CourierProfile>, retry = 5) {
    return new Promise<void>((resolve) => {
      (async () => {
        try {
          const appVersion = getAppVersion();
          // TODO: update
          // const appVersion = getNativeAndManifestVersion();
          // const appInstallationId = await getInstallationId();
          const update: Partial<UserProfile> = {
            ...changes,
            appVersion,
            appInstallationId: '',
            platform: Platform.OS,
            updatedOn: serverTimestamp(),
          };
          await getProfile(id).set(update, { merge: true });

          resolve();
        } catch (error) {
          if (retry > 0) {
            setTimeout(() => resolve(this.updateProfile(id, changes, retry - 1)), 2000);
          } else {
            console.error(error);
            // Sentry.Native.captureException(error);
            resolve();
          }
        }
      })();
    });
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
    await getUsersChangesRef().add({
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
    const query = getUsersChangesRef()
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

  async getSelfieDownloadURL(id: string, size?: string) {
    return storage().ref(getSelfiePath(id, size)).getDownloadURL();
  }
  async getDocumentDownloadURL(id: string, size?: string) {
    return storage().ref(getDocumentPath(id, size)).getDownloadURL();
  }
  async uploadSelfie(id: string, localPath: string) {
    return putFile(localPath, getSelfiePath(id));
  }
  async uploadDocument(id: string, localPath: string) {
    return putFile(localPath, getDocumentPath(id));
  }
}