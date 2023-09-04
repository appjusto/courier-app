import { getAppVersion } from '@/common/version';
import { getFirebaseRegion } from '@/extra';
import { FetchAccountInformationResponse } from '@appjusto/types';
import firebase from '@react-native-firebase/app';
import AuthApi from '../auth/AuthApi';

const region = getFirebaseRegion();

export const fetchAccountInformation = firebase
  .app()
  .functions(region)
  .httpsCallable('fetchAccountInformation');

export default class CouriersApi {
  constructor(private auth: AuthApi) {}

  async fetchAccountInformation() {
    return (
      await fetchAccountInformation({
        accountType: 'courier',
        accountId: this.auth.getUserId(),
        meta: { version: getAppVersion() },
      })
    ).data as FetchAccountInformationResponse;
  }
}
