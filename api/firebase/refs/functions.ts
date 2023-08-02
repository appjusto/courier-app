import firebase from '@react-native-firebase/app';
import { getFirebaseRegion } from '../../../extra';

const region = getFirebaseRegion();

export const getServerTime = () => firebase.app().functions(region).httpsCallable('getServerTime');

export const getDeleteAccount = () =>
  firebase.app().functions(region).httpsCallable('deleteAccount');
