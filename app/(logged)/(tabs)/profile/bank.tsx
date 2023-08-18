import ProfileBank from '@/common/screens/profile/bank';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileBankScreen() {
  // context
  const router = useRouter();
  // UI
  return (
    <KeyboardAwareScrollView
      style={{ ...screens.default, padding: paddings.lg }}
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
