import { useContextApi } from '@/api/ApiContext';
import { useContextUser } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { CodeInput } from '@/common/components/inputs/code-input/CodeInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { MessageBox } from '@/common/components/views/MessageBox';
import { phoneFormatter } from '@/common/formatters/phone';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

type ScreenState = 'verifying-phone' | 'phone-verified' | 'code-confirmed' | 'error';

export default function PhoneVerification() {
  // context
  const auth = useContextApi().getAuth();
  const user = useContextUser();
  const router = useRouter();
  // params
  // @ts-ignore
  const search = useLocalSearchParams<{ countryCode: string; phone: string }>();
  const countryCode = search.countryCode;
  const phone = search.phone;
  // refs
  const codeRef = useRef<TextInput>(null);
  // state
  const [state, setState] = useState<ScreenState>('verifying-phone');
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(
    null
  );
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  // helpers
  const signInWithPhoneNumber = useCallback(() => {
    console.log('signInWithPhoneNumber', phone);
    setState('verifying-phone');
    auth
      .signInWithPhoneNumber(phone)
      .then((result) => {
        setConfirmation(result);
        console.log(result);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        const message = error instanceof Error ? error.message : JSON.stringify(error);
        setError(message);
        setState('error');
      });
  }, [auth, phone]);
  // side effects
  useEffect(() => {
    if (state === 'verifying-phone') {
      signInWithPhoneNumber();
    } else if (state === 'phone-verified') {
      codeRef?.current?.focus();
    } else if (state === 'code-confirmed') {
      router.replace('/home');
    }
  }, [state, signInWithPhoneNumber, router]);
  useEffect(() => {
    if (confirmation?.verificationId) setState('phone-verified');
  }, [confirmation]);
  // handlers
  const verifyHandler = () => {
    console.log('verifyHandler', phone);
    confirmation
      ?.confirm(code)
      .then((result) => {
        setState('code-confirmed');
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        const message = error instanceof Error ? error.message : JSON.stringify(error);
        setError(message);
        setState('error');
      });
  };
  // UI
  const canSubmit = state === 'phone-verified' && code.length === 6;
  return (
    <View
      style={{
        ...screens.default,
        padding: paddings.lg,
      }}
    >
      <Stack.Screen options={{ title: 'Confirmação de número' }} />
      <DefaultText size="xl" style={{ marginVertical: paddings.lg }}>
        Confirme seu celular
      </DefaultText>
      <DefaultText style={{ ...lineHeight.md }}>
        {`Enviamos um código SMS para o número +${countryCode} ${phoneFormatter(
          phone
        )}. Você deverá recebê-lo nos próximos segundos. Ao receber, informe o código abaixo:`}
      </DefaultText>
      <CodeInput
        value={code}
        onChange={setCode}
        length={6}
        style={{ marginVertical: paddings.xl }}
      />

      <MessageBox variant={error ? 'error' : 'info'}>
        {error ??
          `Se você não receber o código em alguns segundos, verifique seu número e a caixa de SPAM do
        seu aplicativo de mensagens.`}
      </MessageBox>
      <View style={{ flex: 1 }} />
      <DefaultButton title="Entrar" disabled={!canSubmit} onPress={verifyHandler} />
    </View>
  );
}
