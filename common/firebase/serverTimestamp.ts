import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const serverTimestamp = () =>
  firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp;
