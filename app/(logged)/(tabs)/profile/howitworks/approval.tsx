import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import ApprovalProcess from '@/common/screens/profile/howitworks/approval';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function ApprovalProcessScreen() {
  // tracking
  useTrackScreenView('Sua conta / Como funciona: aprovação');
  // UI
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Aprovação de cadastro' }} />
      <ApprovalProcess />
    </ScrollView>
  );
}
