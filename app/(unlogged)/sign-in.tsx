import { useAuth } from '@/auth/context/auth-context';
import { PatternInput } from '@/common/expo/components/inputs/pattern/PatternInput';
import screens from '@/common/expo/constants/screens';
import colors from '@/common/styles/colors';
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
  // UI
  return (
    <View style={{ ...screens.headless, backgroundColor: colors.gray50 }}>
      <PatternInput
        pattern="phone"
        title="Celular"
        placeholder="Número com DDD"
        value={phone}
        onChangeText={setPhone}
        ref={phoneRef}
      />
    </View>
  );
}
