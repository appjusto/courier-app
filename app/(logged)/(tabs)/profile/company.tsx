import ProfileCompany from '@/common/screens/profile/company';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileCompanyScreen() {
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
      <Stack.Screen options={{ title: 'Dados da sua PJ' }} />
      <ProfileCompany />
    </KeyboardAwareScrollView>
  );
}
