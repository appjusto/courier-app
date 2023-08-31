import firestore from '@react-native-firebase/firestore';

// couriers
export const getProfileRef = (id: string) => firestore().collection('couriers').doc(id);
// fleets
export const getFleetRef = (id: string) => firestore().collection('fleets').doc(id);
// orders
export const getOrdersRef = () => firestore().collection('orders');
export const getOrderRef = (id: string) => getOrdersRef().doc(id);
// orders
export const getLedgerRef = () => firestore().collection('ledger');
export const getLedgerEntryRef = (id: string) => getLedgerRef().doc(id);
// users
export const getUsersCollection = () => firestore().collection('users');
export const getUsersSubcollectionsRef = () => getUsersCollection().doc('subcollections');
export const getUsersChangesRef = () => getUsersSubcollectionsRef().collection('changes');
// platform
export const getPlatformCollection = () => firestore().collection('platform');
export const getPlatformParamsDoc = () => getPlatformCollection().doc('params');
export const getPlatformAccessDoc = () => getPlatformCollection().doc('access');
// platform data
export const getPlatformDataDoc = () => getPlatformCollection().doc('data');
export const getBanksCollection = () => getPlatformDataDoc().collection('banks');
// platform logs
export const getPlatformLogsDoc = () => getPlatformCollection().doc('logs');
export const getLoginsCollection = () => getPlatformLogsDoc().collection('logins');
