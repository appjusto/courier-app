import { useContextApi } from '@/api/ApiContext';
import { useContextUser } from '@/api/auth/AuthContext';
import { DefaultButton } from '@/common/expo/components/buttons/default/DefaultButton';
import { PatternInput } from '@/common/expo/components/inputs/pattern/PatternInput';
import screens from '@/common/expo/constants/screens';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

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
  // handlres
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
      .catch((error) => {});
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
        value={phone}
        onChangeText={setPhone}
        ref={phoneRef}
      />
      <DefaultButton title="Entrar" onPress={signInHandler} />
      <PatternInput
        pattern="sixDigitsCode"
        title="Código"
        placeholder="Código de confirmação"
        value={code}
        onChangeText={setCode}
        ref={codeRef}
        editable={state === 'phone-verified'}
      />
      <DefaultButton
        title="Entrar"
        onPress={verifyHandler}
        disabled={state !== 'phone-verified'}
      />
    </View>
  );
}
