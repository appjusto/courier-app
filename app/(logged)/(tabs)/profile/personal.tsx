import ProfilePersonalData from '@/common/screens/profile/personal';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfilePersonalDataScreen() {
  // UI
  const title = 'Dados pessoais';
  return (
    <KeyboardAwareScrollView
      style={{ ...screens.profile, padding: paddings.lg }}
      enableOnAndroid
      enableAutomaticScroll
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Stack.Screen options={{ title }} />
      <ProfilePersonalData />
    </KeyboardAwareScrollView>
  );
}
