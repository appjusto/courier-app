import { Complaint } from '@appjusto/types';
import firestore from '@react-native-firebase/firestore';

const complaintsRef = () => firestore().collection('complaints');

export default class ComplaintsApi {
  async createComplaint(complaint: Complaint) {
    await complaintsRef().add(complaint);
  }
}
