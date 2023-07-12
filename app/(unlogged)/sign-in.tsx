import { useAuth } from '@/common/expo/auth/context/useAuth';
import { DefaultButton } from '@/common/expo/components/buttons/default/DefaultButton';
import { PatternInput } from '@/common/expo/components/inputs/pattern/PatternInput';
import screens from '@/common/expo/constants/screens';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

export default function SignIn() {
  const { signIn } = useAuth();
  // refs
  const phoneRef = useRef<TextInput>(null);
  // state
  const [phone, setPhone] = useState('');
  // side effects
  useEffect(() => {
    phoneRef?.current?.focus();
  }, []);
  // handlres
  const signInHandler = () => {
    console.log('signInHandler');
  };
  // UI
  return (
    <View
      style={{
        ...screens.headless,
        padding: paddings.md,
        backgroundColor: colors.gray50,
      }}
    >
      <PatternInput
        pattern="phone"
        title="Celular"
        placeholder="Número com DDD"
        value={phone}
        onChangeText={setPhone}
        ref={phoneRef}
      />
      <DefaultButton title="Entrar" onPress={signInHandler} />
    </View>
  );
}
