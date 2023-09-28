import { getManifestExtra } from '@/extra';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

const extra = getManifestExtra();
let initialized = false;

export const initApp = () => {
  if (initialized) return;
  auth().languageCode = 'pt';
  // firebase.app().functions(extra.firebase.region);
  if (extra.firebase.emulator.host) {
    const host = extra.firebase.emulator.host;
    auth().useEmulator(`http://${host}:9099`);
    firestore().useEmulator(host, 8080);
    functions().useEmulator(host, 5001);
    storage().useEmulator(host, 9199);
    // TODO: firebase.app().storage('gs://default-bucket')
  }
  initialized = true;
};
