import { useContextApi } from '@/api/ApiContext';
import { getFullName } from '@/api/couriers/name/getFullName';
import { useContextPlatformFees } from '@/api/platform/context/PlatformContext';
import { getPixTypeLabel } from '@/api/profile/pix/getPixTypeLabel';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { handleErrorMessage } from '@/common/firebase/errors';
import { formatCurrency } from '@/common/formatters/currency';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { isEmailValid } from '@/common/validators/email';
import { isPhoneValid } from '@/common/validators/phone';
import { PixKeyType } from '@appjusto/types/payment/iugu';
import { PixReceiver } from '@appjusto/types/payment/iugu/api/account/withdraw';
import * as cnpjutils from '@fnando/cnpj';
import * as cpfutils from '@fnando/cpf';
import crashlytics from '@react-native-firebase/crashlytics';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, Switch, TextInput, View } from 'react-native';
import { PixTypeModal } from './pix-type-modal';

interface Props {}

export default function ProfilePIX({}: Props) {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const fees = useContextPlatformFees();
  const fee = formatCurrency(fees?.processing.iugu.instantWithdraw ?? 0);
  const showToast = useShowToast();
  // refs
  const cpfRef = useRef<TextInput>(null);
  const typeRef = useRef<TextInput>(null);
  const keyRef = useRef<TextInput>(null);
  // state
  const [name, setName] = useState<string>();
  const [cpf, setCPF] = useState<string>();
  const [cnpj, setCNPJ] = useState<string>();
  const [pixType, setPixType] = useState<PixKeyType | undefined>(profile?.pix?.type);
  const [pixTypeLabel, setPixTypeLabel] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [randomKey, setRandomKey] = useState<string>();
  const [disabled, setDisabled] = useState(profile?.pix?.enabled === false);
  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // side effects
  useEffect(() => {
    if (!profile) return;
    if (name === undefined) {
      if (profile.pix?.fullname) setName(profile.pix.fullname);
      else setName(getFullName(profile) ?? '');
    }
    if (email === undefined) {
      if (profile.email) setEmail(profile.email);
      else setEmail(api.auth().getEmail() ?? '');
    }
    if (phone === undefined) {
      if (profile.phone) setPhone(profile.phone);
      else setPhone(api.auth().getPhoneNumber(true) ?? '');
    }
    if (cpf === undefined) {
      if (profile.cpf) setCPF(profile.cpf);
    }
    if (cnpj === undefined) {
      if (profile.company?.cnpj) setCNPJ(profile.company.cnpj);
    }
    if (randomKey === undefined) {
      if (profile.pix?.type === 'evp') setRandomKey(profile.pix.key);
    }
  }, [api, profile, email, name, cpf, phone, cnpj, randomKey]);
  useEffect(() => {
    const label = getPixTypeLabel(pixType);
    if (label) setPixTypeLabel(label);
  }, [pixType]);
  // helpers
  const receiver = (() => {
    if (!name) return null;
    if (!cpf) return null;
    if (!pixType) return null;
    let key = '';
    if (pixType === 'cpf') {
      if (!cpfutils.isValid(cpf)) return null;
      key = cpf;
    } else if (pixType === 'email') {
      if (!email || !isEmailValid(email)) return null;
      key = email;
    } else if (pixType === 'phone') {
      if (!phone || !isPhoneValid(phone)) return null;
      key = phone;
    } else if (pixType === 'cnpj') {
      if (!cnpj || !cnpjutils.isValid(cnpj)) return null;
      key = cnpj;
    } else if (pixType === 'evp') {
      if (randomKey?.length !== 32) return null;
      key = randomKey;
    }
    return {
      fullname: name,
      document: cpf,
      type: pixType,
      key,
      enabled: !disabled,
    } as PixReceiver;
  })();
  const canSave = Boolean(receiver);
  // handlers
  const handleError = (error: unknown) => {
    if (error instanceof Error) crashlytics().recordError(error);
    const message = handleErrorMessage(error);
    showToast(message, 'error');
    setLoading(false);
  };
  const updateProfileHandler = () => {
    if (!profile) return;
    if (!receiver) return;
    setLoading(true);
    api
      .profile()
      .updateProfile({
        pix: receiver,
      })
      .then(() => {
        setLoading(false);
        showToast('Dados salvos com sucesso!', 'success');
        router.back();
      })
      .catch((error) => {
        handleError(error);
      });
  };
  // UI
  const title = 'Saque imediato';
  if (!profile) return <Loading backgroundColor="neutral50" title={title} />;
  return (
    <DefaultKeyboardAwareScrollView style={{ ...screens.default, padding: paddings.lg }}>
      <PixTypeModal
        visible={modalVisible}
        onSelectType={(type) => {
          setPixType(type);
          setModalVisible(false);
        }}
      />
      <SafeAreaView>
        <DefaultText size="lg">Saque instantâneo</DefaultText>
        <DefaultText style={{ marginTop: paddings.lg }} color="neutral700">
          {`Agora você pode sacar instantaneamente seus ganhos na plataforma. Solicite e receba na hora, por uma taxa de ${fee}. Configure seus dados de recebimento para começar a utilizar.`}
        </DefaultText>
        <DefaultInput
          style={{ marginTop: paddings.lg }}
          title="Nome completo"
          placeholder="Digite seu nome completo"
          value={name}
          keyboardType="default"
          returnKeyType="next"
          autoCapitalize="words"
          editable={!disabled}
          blurOnSubmit={false}
          onChangeText={setName}
          onSubmitEditing={() => cpfRef.current?.focus()}
        />
        <PatternInput
          style={{ marginTop: paddings.lg }}
          ref={cpfRef}
          pattern="cpf"
          title="CPF"
          placeholder="000.000.000-00"
          keyboardType="number-pad"
          returnKeyType="next"
          editable={false}
          blurOnSubmit={false}
          value={cpf}
          onChangeText={setCPF}
          onSubmitEditing={() => typeRef.current?.focus()}
        />
        <Pressable onPress={() => setModalVisible(true)}>
          <View pointerEvents="none">
            <DefaultInput
              style={{ marginTop: paddings.lg }}
              title="Tipo de chave pix"
              placeholder="Escolha o tipo da sua chave pix"
              value={pixTypeLabel}
            ></DefaultInput>
          </View>
        </Pressable>
        {pixType === 'cnpj' ? (
          <PatternInput
            ref={keyRef}
            style={{ marginTop: paddings.lg }}
            pattern="cnpj"
            title="CNPJ"
            placeholder="Digite o CNPJ"
            keyboardType="number-pad"
            returnKeyType="done"
            editable={!disabled}
            blurOnSubmit={true}
            value={cnpj}
            onChangeText={setCNPJ}
          />
        ) : null}
        {pixType === 'phone' ? (
          <PatternInput
            ref={keyRef}
            style={{ marginTop: paddings.lg }}
            pattern="phone"
            title="Celular"
            placeholder="Apenas números"
            keyboardType="number-pad"
            returnKeyType="done"
            editable={!disabled}
            blurOnSubmit={true}
            value={phone}
            onChangeText={setPhone}
          />
        ) : null}
        {pixType === 'email' ? (
          <DefaultInput
            ref={keyRef}
            style={{ marginTop: paddings.lg }}
            title="E-mail"
            placeholder="Digite o e-mail"
            keyboardType="email-address"
            returnKeyType="done"
            autoCapitalize="none"
            value={email}
            editable={!disabled}
            blurOnSubmit={true}
            autoCorrect={false}
            onChangeText={setEmail}
          />
        ) : null}
        {pixType === 'evp' ? (
          <DefaultInput
            ref={keyRef}
            style={{ marginTop: paddings.lg }}
            title="Chave aleatória"
            placeholder="Digite a chave aleatória"
            keyboardType="default"
            returnKeyType="done"
            autoCapitalize="none"
            maxLength={32}
            value={randomKey}
            editable={!disabled}
            blurOnSubmit={true}
            autoCorrect={false}
            onChangeText={setRandomKey}
          />
        ) : null}
        <Switch
          style={{ marginTop: paddings.lg }}
          trackColor={{ false: colors.neutral200, true: colors.black }}
          thumbColor={colors.white}
          ios_backgroundColor={colors.white}
          onValueChange={(value) => setDisabled(!value)}
          value={!disabled}
        />
        <View style={{ flex: 1 }} />
        <DefaultButton
          style={{ marginTop: paddings.lg, marginBottom: paddings.xl }}
          title="Salvar"
          disabled={isLoading || !fee || !canSave}
          onPress={updateProfileHandler}
        />
      </SafeAreaView>
    </DefaultKeyboardAwareScrollView>
  );
}
