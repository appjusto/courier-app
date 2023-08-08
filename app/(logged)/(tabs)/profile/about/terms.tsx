import { MarkdownView } from '@/common/components/views/markdown/MarkdownView';
import { URL_TERMS } from '@/common/constants/urls';
import { TERMS } from '@/common/screens/terms/embeded';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function ProfileTerms() {
  // UI
  const title = 'Termos de uso';
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title }} />
      <MarkdownView url={URL_TERMS} fallback={TERMS} title={title} />
    </View>
  );
}
