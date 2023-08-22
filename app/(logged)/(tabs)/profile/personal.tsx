import ProfilePersonalData from '@/common/screens/profile/personal';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfilePersonalDataScreen() {
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
      <Stack.Screen options={{ title: 'Dados pessoais' }} />
      <ProfilePersonalData />
    </KeyboardAwareScrollView>
  );
}
