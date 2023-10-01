import firebase from '@react-native-firebase/app';
import appCheck from '@react-native-firebase/app-check';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions, { FirebaseFunctionsTypes } from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

import { getManifestExtra } from '../extra';
import AuthApi from './auth/AuthApi';
import ChatsApi from './chats/ChatsApi';
import CouriersApi from './couriers/CouriersApi';
import FleetsApi from './fleets/FleetsApi';
import LedgerApi from './ledger/LedgerApi';
import MapsApi from './maps/MapsApi';
import OrdersApi from './orders/OrdersApi';
import PlatformApi from './platform/PlatformApi';
import ProfileApi from './profile/ProfileApi';
import SearchApi from './search/SearchApi';
import StorageApi from './storage/StorageApi';

const extra = getManifestExtra();

export default class Api {
  private _auth: AuthApi;
  private _storage: StorageApi;
  private _platform: PlatformApi;
  private _profile: ProfileApi;
  private _couriers: CouriersApi;
  private _fleets: FleetsApi;
  private _search: SearchApi;
  private _orders: OrdersApi;
  private _ledger: LedgerApi;
  private _maps: MapsApi;
  private _chat: ChatsApi;
  private functions: FirebaseFunctionsTypes.Module;

  constructor() {
    auth().languageCode = 'pt';
    const provider = appCheck().newReactNativeFirebaseAppCheckProvider();
    provider.configure({
      android: {
        provider: __DEV__ ? 'debug' : 'playIntegrity',
        debugToken: extra.firebase.appCheckAndroidDebugToken,
      },
      apple: {
        provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback',
        debugToken: extra.firebase.appCheckIosDebugToken,
      },
    });
    appCheck().initializeAppCheck({ provider, isTokenAutoRefreshEnabled: true });
    this.functions = firebase.app().functions(extra.firebase.region);
    if (extra.firebase.emulator.host) {
      const host = extra.firebase.emulator.host;
      auth().useEmulator(`http://${host}:9099`);
      firestore().useEmulator(host, 8080);
      functions().useEmulator(host, 5001);
      storage().useEmulator(host, 9199);
      // TODO: firebase.app().storage('gs://default-bucket')
    }
    this._auth = new AuthApi();
    this._storage = new StorageApi();
    this._platform = new PlatformApi(this._auth);
    this._profile = new ProfileApi(this._auth, this._storage);
    this._couriers = new CouriersApi(this._auth);
    this._fleets = new FleetsApi();
    this._orders = new OrdersApi(this._auth, this._storage);
    this._ledger = new LedgerApi();
    this._maps = new MapsApi();
    this._search = new SearchApi(extra.algolia, extra.env);
    this._chat = new ChatsApi(this._auth);
  }

  auth() {
    return this._auth;
  }

  storage() {
    return this._storage;
  }

  platform() {
    return this._platform;
  }

  profile() {
    return this._profile;
  }

  couriers() {
    return this._couriers;
  }

  fleets() {
    return this._fleets;
  }

  orders() {
    return this._orders;
  }

  ledger() {
    return this._ledger;
  }

  maps() {
    return this._maps;
  }

  chat() {
    return this._chat;
  }

  search() {
    return this._search;
  }
}

export const api = new Api();
