import { useAuth } from '@/auth/context/auth-context';
import colors from '@/common/constants/colors';
import { DefaultInput } from '@/common/expo/components/inputs/DefaultInput';
import screens from '@/common/expo/constants/screens';
import { useEffect, useRef } from 'react';
import { TextInput, View } from 'react-native';

export default function SignIn() {
  const { signIn } = useAuth();
  // refs
  const phoneRef = useRef<TextInput>(null);
  // side effects
  useEffect(() => {
    phoneRef?.current?.focus();
  }, []);
  // UI
  return (
    <View style={{ ...screens.headless, backgroundColor: colors.gray50 }}>
      <DefaultInput
        ref={phoneRef}
        title="Celular"
        placeholder="Número com DDD"
      />
    </View>
  );
}
