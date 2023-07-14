import { documentsAs } from '@/common/firebase/documentAs';
import { Bank, PlatformAccess, PlatformParams } from '@appjusto/types';
import {
  getBanksCollection,
  getPlatformAccessDoc,
  getPlatformParamsDoc,
} from '../firebase/refs/firestore';

export default class PlatformApi {
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
