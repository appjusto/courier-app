import { documentsAs } from '@/common/firebase/documentAs';
import { getFirebaseRegion } from '@/extra';
import { Bank, PlatformAccess, PlatformParams } from '@appjusto/types';
import firebase from '@react-native-firebase/app';
import AuthApi from '../auth/AuthApi';
import {
  getBanksCollection,
  getPlatformAccessDoc,
  getPlatformParamsDoc,
} from '../firebase/refs/firestore';

const region = getFirebaseRegion();

export const getServerTime = firebase.app().functions(region).httpsCallable('getServerTime');

export default class PlatformApi {
  constructor(private auth: AuthApi) {}
  async getServerTime(): Promise<number> {
    try {
      if (this.auth.getUserId()) {
        const result = await getServerTime();
        return (result.data as any).time;
      }
    } catch (error) {
      console.error('getServerTime');
      console.error(error);
    }
    return new Date().getTime();
  }

  async fetchPlatformParams() {
    const snapshot = await getPlatformParamsDoc().get();
    return snapshot.data() as PlatformParams;
  }

  async fetchPlatformAccess() {
    const snapshot = await getPlatformAccessDoc().get();
    return snapshot.data() as PlatformAccess;
  }

  async fetchBanks() {
    const snapshot = await getBanksCollection().orderBy('order', 'asc').get();
    return documentsAs<Bank>(snapshot.docs);
  }
}
