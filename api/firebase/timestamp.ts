import { Timestamp } from '@appjusto/types/external/firebase';
import firestore from '@react-native-firebase/firestore';

export const fromDate = (date: Date) => firestore.Timestamp.fromDate(date);
export const toDate = (timestamp: Timestamp) => timestamp.toDate();
