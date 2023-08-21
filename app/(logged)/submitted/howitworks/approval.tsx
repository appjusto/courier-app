import ApprovalProcess from '@/common/components/profile/howitworks/approval';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function ApprovalProcessScreen() {
  // UI
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Aprovação de cadastro' }} />
      <ApprovalProcess />
    </ScrollView>
  );
}
