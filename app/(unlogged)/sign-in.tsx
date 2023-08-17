import { useContextApi } from '@/api/ApiContext';
import { useContextUser } from '@/common/auth/AuthContext';
import { CheckButton } from '@/common/components/buttons/check/CheckButton';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { SignInImage } from '@/common/screens/unlogged/sign-in/image';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { TextInput, ToastAndroid, View } from 'react-native';

type ScreenState = 'initial' | 'verifying-phone' | 'phone-verified' | 'phone-error';

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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(
    null
  );
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
        const message = error instanceof Error ? error.message : JSON.stringify(error);
        ToastAndroid.show(message, 3000);
        setState('phone-error');
      });
  };
  const verifyHandler = () => {
    console.log('verifyHandler', phone);
    confirmation
      ?.confirm(code)
      .then((result) => {
        router.replace('/home');
      })
      .catch((error) => {
        console.error(error);
        const message = error instanceof Error ? error.message : JSON.stringify(error);
        ToastAndroid.show(message, 3000);
      });
  };
  // UI
  return (
    <View
      style={{
        ...screens.headless,
        paddingHorizontal: paddings.lg,
        paddingBottom: paddings.xl,
      }}
    >
      <SignInImage />
      <View style={{ flex: 1 }} />
      <DefaultText size="lg" style={{ marginVertical: paddings.xl }}>
        Acesse ou crie uma conta
      </DefaultText>
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // borderWidth: 1,
        }}
      >
        <DefaultText size="sm" color="neutral800" style={{ marginTop: paddings.xs }}>
          Digite o número do seu celular
        </DefaultText>
        <DefaultText color="black">Ler termos</DefaultText>
      </View>
      <CheckButton
        title="Acesse ou crie uma conta"
        checked={termsAccepted}
        style={{ marginVertical: paddings.lg }}
        onPress={() => setTermsAccepted((value) => !value)}
      />
      <View style={{ flex: 1 }} />
      <DefaultButton title="Entrar" disabled={!canEditPhone} onPress={signInHandler} />
      {canEnterCode ? (
        <View>
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
      ) : null}
    </View>
  );
}
