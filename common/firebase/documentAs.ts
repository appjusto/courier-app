import { WithId } from '@appjusto/types';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type FirebaseQueryDocumentSnapshot =
  FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
export type FirebaseDocumentSnapshot =
  FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;
export type FirebaseDocument = FirebaseQueryDocumentSnapshot | FirebaseDocumentSnapshot;

export const documentAs = <T extends object>(doc: FirebaseDocument): WithId<T> => ({
  ...(doc.data() as T),
  id: doc.id,
});

export const documentsAs = <T extends object>(docs: FirebaseDocument[]): WithId<T>[] =>
  docs.map((doc) => documentAs<T>(doc));
