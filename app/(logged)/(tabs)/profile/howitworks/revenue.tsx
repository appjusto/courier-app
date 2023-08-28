import RevenueProcess from '@/common/screens/profile/howitworks/revenue';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function RevenueProcessScreen() {
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Recebimento' }} />
      <RevenueProcess />
    </ScrollView>
  );
}
