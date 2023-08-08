import { BlockProcessContent } from '@/common/components/profile/howitworks/BlockProcessContent';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function BlockProcess() {
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Bloqueios' }} />
      <BlockProcessContent variant="how-it-works" />
    </ScrollView>
  );
}
