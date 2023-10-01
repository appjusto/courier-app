import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import ProfileBank from '@/common/screens/profile/bank';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileBankScreen() {
  // tracking
  useTrackScreenView('Sua conta: Dados bancários');
  // context
  const router = useRouter();
  // UI
  return (
    <KeyboardAwareScrollView
      style={{ ...screens.default }}
      enableOnAndroid
      enableAutomaticScroll
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Stack.Screen options={{ title: 'Dados bancários' }} />
      <ProfileBank onSelectBank={() => router.push('/profile/select-bank')} />
    </KeyboardAwareScrollView>
  );
}
