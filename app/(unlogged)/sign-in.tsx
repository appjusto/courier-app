import { useContextApi } from '@/api/ApiContext';
import { useContextUser } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import screens from '@/common/constants/screens';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { TextInput, ToastAndroid, View } from 'react-native';

type ScreenState =
  | 'initial'
  | 'verifying-phone'
  | 'phone-verified'
  | 'phone-error';

export default function SignIn() {
  // context
  const auth = useContextApi().getAuth();
  const user = useContextUser();
  const router = useRouter();
  // refs
  const phoneRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  // state
  const [state, setState] = useState<ScreenState>('initial');
  const [phone, setPhone] = useState('');
  const [confirmation, setConfirmation] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState('');
  // side effects
  useEffect(() => {
    phoneRef?.current?.focus();
  }, []);
  useEffect(() => {
    if (confirmation?.verificationId) setState('phone-verified');
  }, [confirmation]);
  const canEditPhone = state === 'initial' || state === 'phone-error';
  const canEnterCode = state === 'phone-verified';
  // handlers
  const signInHandler = () => {
    console.log('signInHandler', phone);
    setState('verifying-phone');
    auth
      .signInWithPhoneNumber(phone)
      .then((result) => {
        setConfirmation(result);
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
        const message =
          error instanceof Error ? error.message : JSON.stringify(error);
        ToastAndroid.show(message, 3000);
        setState('phone-error');
      });
  };
  const verifyHandler = () => {
    console.log('verifyHandler', phone);
    confirmation
      ?.confirm(code)
      .then((result) => {
        console.log('result', result);
        router.replace('/(logged)/(tabs)/home');
      })
      .catch((error) => {
        console.error(error);
        const message =
          error instanceof Error ? error.message : JSON.stringify(error);
        ToastAndroid.show(message, 3000);
      });
  };
  console.log('user', user);
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
        keyboardType="number-pad"
        ref={phoneRef}
        editable={canEditPhone}
        value={phone}
        onChangeText={setPhone}
      />
      <DefaultButton
        title="Entrar"
        disabled={!canEditPhone}
        onPress={signInHandler}
      />
      <PatternInput
        pattern="sixDigitsCode"
        title="Código"
        placeholder="Código de confirmação"
        keyboardType="number-pad"
        ref={codeRef}
        editable={canEnterCode}
        value={code}
        onChangeText={setCode}
      />
      <DefaultButton
        title="Verificar"
        disabled={canEditPhone || !canEnterCode}
        onPress={verifyHandler}
      />
    </View>
  );
}
