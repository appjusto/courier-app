import { CheckButton } from '@/common/components/buttons/check/CheckButton';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { SignInIcon } from '@/common/screens/unlogged/sign-in/icon';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { isPhoneValid } from '@/common/validators/phone';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignIn() {
  // context
  const router = useRouter();
  // state
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const canSubmit = termsAccepted && isPhoneValid(phone);

  // UI
  return (
    <KeyboardAwareScrollView
      style={{ ...screens.headless }}
      enableOnAndroid
      enableAutomaticScroll
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Stack.Screen options={{ title: 'Entrar' }} />
      <View
        style={{
          flex: 0.8,
          backgroundColor: colors.neutral50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SignInIcon />
      </View>
      <View style={{ flex: 1, padding: paddings.lg }}>
        <View style={{ flex: 1 }} />
        <DefaultText size="lg" style={{ marginVertical: paddings.xl }}>
          Acesse ou crie uma conta
        </DefaultText>
        <PatternInput
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
          title="Li e aceito os termos"
          checked={termsAccepted}
          style={{ marginVertical: paddings.lg }}
          onPress={() => setTermsAccepted((value) => !value)}
        />

        <View style={{ flex: 1 }} />
        <SafeAreaView>
          <DefaultButton
            title="Entrar"
            disabled={!canSubmit}
            style={{ marginBottom: paddings.sm }}
            onPress={() => {
              router.push({
                pathname: `/phone-verification`,
                // @ts-ignore
                params: { phone, countryCode: 55 },
              });
            }}
          />
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
}
