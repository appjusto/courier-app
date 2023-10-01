import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import SafetyProcess from '@/common/screens/profile/howitworks/safety';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

export default function SafetyProcessScreen() {
  // track
  useTrackScreenView('Cadastro enviado / Como funciona: segurança');
  // UI
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Segurança' }} />
      <SafetyProcess />
    </ScrollView>
  );
}
