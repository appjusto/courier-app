import firestore from '@react-native-firebase/firestore';

export const fromDate = (date: Date) => firestore.Timestamp.fromDate(date);
