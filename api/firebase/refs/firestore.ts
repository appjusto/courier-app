import firestore from '@react-native-firebase/firestore';

export const getProfile = (id: string) =>
  firestore().collection('couriers').doc(id);

// platform
export const getPlatformCollection = () => firestore().collection('platform');
export const getPlatformParamsDoc = () => getPlatformCollection().doc('params');
export const getPlatformAccessDoc = () => getPlatformCollection().doc('access');
// platform data
export const getPlatformDataDoc = () => getPlatformCollection().doc('data');
export const getBanksCollection = () =>
  getPlatformDataDoc().collection('banks');
// platform logs
export const getPlatformLogsDoc = () => getPlatformCollection().doc('logs');
export const getLoginsCollection = () =>
  getPlatformLogsDoc().collection('logins');
