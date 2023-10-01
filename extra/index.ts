import Constants from 'expo-constants';
import { Extra } from './types';

export const getManifestExtra = () => Constants.expoConfig?.extra as Extra;
export const getEnv = () => getManifestExtra().env;
export const isLive = () => getEnv() === 'live';

// firebase
export const getFirebaseRegion = () => getManifestExtra().firebase.region;
