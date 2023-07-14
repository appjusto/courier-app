import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions, {
  FirebaseFunctionsTypes,
} from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

import { getManifestExtra } from '../extra';
import AuthApi from './auth/AuthApi';
import { getServerTime } from './firebase/refs/functions';
import ProfileApi from './profile/ProfileApi';

const extra = getManifestExtra();

export default class Api {
  private auth: AuthApi;
  private profile: ProfileApi;
  private functions: FirebaseFunctionsTypes.Module;

  constructor() {
    auth().languageCode = 'pt';
    console.log('extra', extra);
    this.functions = firebase.app().functions(extra.firebase.region);
    if (extra.firebase.emulator.host) {
      const host = extra.firebase.emulator.host;
      auth().useEmulator(`http://${host}:9099`);
      firestore().useEmulator(host, 8080);
      functions().useEmulator(host, 5001);
      storage().useEmulator(host, 9199);
      // TODO: firebase.app().storage('gs://default-bucket')
    }
    this.auth = new AuthApi();
    this.profile = new ProfileApi(this.auth);
  }

  getAuth() {
    return this.auth;
  }

  getProfile() {
    return this.profile;
  }

  async getServerTime(): Promise<number> {
    try {
      if (this.auth.getUserId()) {
        const result = await getServerTime()();
        return (result.data as any).time;
      }
    } catch (error) {
      console.error('getServerTime');
      console.error(error);
      // Sentry.Native.captureException(error);
    }
    return new Date().getTime();
  }
}

export const api = new Api();
