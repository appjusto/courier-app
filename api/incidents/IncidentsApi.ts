import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import { Incident, Issue } from '@appjusto/types';
import firestore from '@react-native-firebase/firestore';
import AuthApi from '../auth/AuthApi';

// firestore
export const incidentsRef = () => firestore().collection('incidents');

// API
export default class IncidentsApi {
  constructor(private auth: AuthApi) {}

  async createIncident(issue: Issue, comment: string, orderId?: string) {
    const incidentRef = incidentsRef().doc();
    const incident: Incident = {
      issue,
      comment,
      createdBy: {
        flavor: 'courier',
        id: this.auth.getUserId()!,
      },
      createdAt: serverTimestamp(),
      orderId: orderId ?? null,
    };
    await incidentRef.set(incident);
    return incidentRef.id;
  }
}
