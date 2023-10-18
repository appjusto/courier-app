import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { MarkdownView } from '@/common/components/views/markdown/MarkdownView';
import { URL_PRIVACY_POLICY } from '@/common/constants/urls';
import { PRIVACY_POLICY } from '@/common/screens/terms/privacy';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function ProfilePrivacy() {
  // tracking
  useTrackScreenView('Política de privacidade');
  // UI
  const title = 'Política de privacidade';
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title }} />
      <MarkdownView url={URL_PRIVACY_POLICY} fallback={PRIVACY_POLICY} title={title} />
    </View>
  );
}
