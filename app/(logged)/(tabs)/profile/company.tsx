import ProfileCompany from '@/common/screens/profile/company';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileCompanyScreen() {
  // context
  const title = 'Dados da sua PJ';
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
      <ProfileCompany />
    </KeyboardAwareScrollView>
  );
}
