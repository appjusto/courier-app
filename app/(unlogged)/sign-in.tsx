import { CheckButton } from '@/common/components/buttons/check/CheckButton';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { SignInImage } from '@/common/screens/unlogged/sign-in/image';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { isPhoneValid } from '@/common/validators/phone';
import { getEnv } from '@/extra';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

export default function SignIn() {
  // context
  const router = useRouter();
  // refs
  const phoneRef = useRef<TextInput>(null);
  // state
  // const [phone, setPhone] = useState(getEnv() === 'dev' ? '11990085775' : '');
  // const [phone, setPhone] = useState(getEnv() === 'dev' ? '85986971945' : '');
  const [phone, setPhone] = useState(getEnv() === 'dev' ? '11999999999' : '');
  const [termsAccepted, setTermsAccepted] = useState(getEnv() === 'dev');
  console.log(phone);
  const canSubmit = termsAccepted && isPhoneValid(phone);
  // side effects
  useEffect(() => {
    phoneRef?.current?.focus();
  }, []);

  // UI
  return (
    <View
      style={{
        ...screens.headless,
        paddingHorizontal: paddings.lg,
        paddingBottom: paddings.xl,
      }}
    >
      <Stack.Screen options={{ title: 'Entrar' }} />
      <SignInImage />
      <View style={{ flex: 1 }} />
      <DefaultText size="lg" style={{ marginVertical: paddings.xl }}>
        Acesse ou crie uma conta
      </DefaultText>
      <PatternInput
        ref={phoneRef}
        pattern="phone"
        title="Celular"
        placeholder="Número com DDD"
        keyboardType="number-pad"
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
        <LinkButton onPress={() => router.push('/(unlogged)/terms')}>Ler termos</LinkButton>
      </View>
      <CheckButton
        title="Acesse ou crie uma conta"
        checked={termsAccepted}
        style={{ marginVertical: paddings.lg }}
        onPress={() => setTermsAccepted((value) => !value)}
      />
      <View style={{ flex: 1 }} />
      <DefaultButton
        title="Entrar"
        disabled={!canSubmit}
        onPress={() => {
          router.push({
            pathname: `/phone-verification`,
            // @ts-ignore
            params: { phone, countryCode: 55 },
          });
        }}
      />
    </View>
  );
}
