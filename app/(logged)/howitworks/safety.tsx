import SafetyProcess from '@/common/screens/profile/howitworks/safety';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

export default function SafetyProcessScreen() {
  // UI
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Segurança' }} />
      <SafetyProcess />
    </ScrollView>
  );
}
