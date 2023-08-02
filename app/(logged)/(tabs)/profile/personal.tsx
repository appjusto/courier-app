import { useContextApi } from '@/api/ApiContext';
import { useProfile } from '@/api/profile/useProfile';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { DefaultScrollView } from '@/common/components/views/DefaultScrollView';
import screens from '@/common/constants/screens';
import colors from '@/common/styles/colors';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';

export default function ProfilePersonalData() {
  // context
  const api = useContextApi();
  const profile = useProfile();
  // state
  const [email, setEmail] = useState<string>();
  // effects
  useEffect(() => {
    if (!profile) {
      // initial info
      setEmail(api.getAuth().getEmail() ?? '');
      return;
    }
    if (profile.email && !email) setEmail(profile.email);
  }, [api, profile, email]);
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default, backgroundColor: colors.gray50 }}>
      <Stack.Screen options={{ title: 'Dados pessoais' }} />
      <DefaultInput
        style={{}}
        title="E-mail"
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        value={email}
        // editable={canUpdateProfile && !api.auth().getEmail()}
        blurOnSubmit={false}
        autoCorrect={false}
        onChangeText={(text) => setEmail(text)}
        // onSubmitEditing={() => nameRef.current?.focus()}
      />
    </DefaultScrollView>
  );
}
