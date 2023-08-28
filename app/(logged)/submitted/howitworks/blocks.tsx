import BlockProcess from '@/common/screens/profile/howitworks/blocks';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

export default function BlockProcessScreen() {
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <Stack.Screen options={{ title: 'Bloqueios' }} />
      <BlockProcess variant="how-it-works" />
    </ScrollView>
  );
}
