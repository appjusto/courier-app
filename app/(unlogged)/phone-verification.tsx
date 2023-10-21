import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { CodeInput } from '@/common/components/inputs/code-input/CodeInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { MessageBox } from '@/common/components/views/MessageBox';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { handleErrorMessage } from '@/common/firebase/errors';
import { phoneFormatter } from '@/common/formatters/phone';
import { RequestCodeModal } from '@/common/screens/unlogged/sign-in/request-code-modal';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useTimer } from '@/common/timer/useTimer';
import analytics from '@react-native-firebase/analytics';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

type ScreenState = 'default' | 'access-code';

export default function PhoneVerification() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // params
  const search = useLocalSearchParams<{ countryCode: string; phone: string }>();
  const countryCode = search.countryCode ?? '55';
  const phone = search.phone;
  // refs
  const codeRef = useRef<TextInput>(null);
  // state
  const [state, setState] = useState<ScreenState>();
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult | null>(
    null
  );
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [requestCodeModalShown, setRequestCodeModalShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const timer = useTimer(60);
  // helpers
  const signInWithPhoneNumber = useCallback(() => {
    // console.log('signInWithPhoneNumber', phone);
    setLoading(true);
    trackEvent('Confirmando telefone', { phone });
    api
      .auth()
      .signInWithPhoneNumber(phone, countryCode)
      .then((result) => {
        setLoading(false);
        trackEvent('Telefone confirmado', { phone });
        setConfirmation(result);
      })
      .catch((error) => {
        setLoading(false);
        trackEvent('Erro ao confirmar telefone', { phone });
        console.log(JSON.stringify(error));
        setError(handleErrorMessage(error));
        crashlytics().recordError(error);
      })
      .finally(() => {
        setState('default');
      });
  }, [api, phone, countryCode]);
  // side effects
  // track
  useTrackScreenView('Verificação de telefone');
  // sign in
  useEffect(() => {
    signInWithPhoneNumber();
  }, [signInWithPhoneNumber]);
  // phone verification
  useEffect(() => {
    if (confirmation?.verificationId) codeRef?.current?.focus();
  }, [confirmation]);
  // handlers
  const verifyHandler = () => {
    setLoading(true);
    trackEvent('Confirmando código', { phone });
    confirmation
      ?.confirm(code)
      .then((result) => {
        trackEvent('Código confirmado', { phone });
        analytics().logLogin({ method: 'Firebase Phone' }).catch(console.error);
      })
      .catch((error) => {
        setLoading(false);
        trackEvent('Erro ao confirmar código', { phone });
        console.log(JSON.stringify(error));
        setError(handleErrorMessage(error));
        crashlytics().recordError(error);
      });
  };
  const requestAccessCode = () => {
    setRequestCodeModalShown(false);
    setLoading(true);
    trackEvent('Requisitando código alternativo', { phone });
    setState('access-code');
    setCode('');
    api
      .auth()
      .requestAccessCode(phone)
      .then(() => {
        setLoading(false);
        trackEvent('Código alternativo requisitado', { phone });
        showToast('Novo código enviado por SMS!', 'success');
      })
      .catch(() => {
        setLoading(false);
        trackEvent('Erro ao requisitar código alternativo', { phone });
        showToast('Não foi possível requisitar o código por SMS. Tente novamente.', 'error');
      });
  };
  const loginWithAccessCode = () => {
    setLoading(true);
    trackEvent('Confirmando código alternativo', { phone });
    api
      .auth()
      .loginWithAccessCode(phone, code)
      .then((token) => {
        trackEvent('Código alternativo confirmado', { phone });
        api
          .auth()
          .signInWithCustomToken(token)
          .catch(() => {
            setLoading(false);
            showToast('Código inválido. Tente novamente.', 'error');
          });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        trackEvent('Erro ao confirmar código alternativo', { phone });
        showToast('Código inválido. Tente novamente.', 'error');
      });
  };
  // UI
  if (!state) return <Loading />;
  const canSubmit = code.trim().length === 6;
  return (
    <View
      style={{
        ...screens.default,
        padding: paddings.lg,
      }}
    >
      <Stack.Screen options={{ title: 'Confirmação de número' }} />
      <RequestCodeModal
        visible={requestCodeModalShown}
        timer={timer}
        onRequest={requestAccessCode}
        onDismiss={() => setRequestCodeModalShown(false)}
      />
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
        {error
          ? error
          : `Se você não receber o código em alguns segundos, verifique seu número e a caixa de SPAM do seu aplicativo de mensagens.`}
      </MessageBox>
      <View style={{ flex: 1 }} />
      {state !== 'access-code' ? (
        <View>
          <DefaultButton
            title="Verificar"
            disabled={!canSubmit}
            loading={loading}
            onPress={verifyHandler}
          />
          <DefaultButton
            style={{ marginTop: paddings.lg }}
            title="Não recebi o código"
            variant="outline"
            onPress={() => setRequestCodeModalShown(true)}
          />
        </View>
      ) : (
        <DefaultButton
          title="Verificar"
          disabled={!canSubmit}
          loading={loading}
          onPress={loginWithAccessCode}
        />
      )}
    </View>
  );
}
