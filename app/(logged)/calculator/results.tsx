import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';

export default function CalculatorResultsScreen() {
  // tracking
  useTrackScreenView('Calculadora Resultados');
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: '' }} />
      <DefaultView style={{ padding: paddings.lg }}></DefaultView>
    </DefaultScrollView>
  );
}
