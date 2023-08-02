import { useContextApi } from '@/api/ApiContext';
import { useProfile } from '@/api/profile/useProfile';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { AlertBox } from '@/common/components/views/AlertBox';
import screens from '@/common/constants/screens';
import { getProfileState } from '@/common/profile/getProfileState';
import { isProfileValid } from '@/common/profile/isProfileValid';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { CourierProfile, UserProfile } from '@appjusto/types';
import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfilePersonalData() {
  // context
  const api = useContextApi();
  const profile = useProfile<CourierProfile>();
  console.log('profile.id', profile?.id);
  const profileState = getProfileState(profile);
  // refs
  const nameRef = useRef<TextInput>(null);
  const surnameRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const birthdayRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  // state
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  // helpers
  const countryCode = profile?.countryCode ?? '55';
  const updatedUser: Partial<UserProfile> = {
    email: (email ?? '').toLowerCase().trim(),
    name: (name ?? '').trim(),
    surname: (surname ?? '').trim(),
    cpf,
    phone,
    birthday,
    countryCode,
  };
  const canUpdateProfile = !isProfileValid(profile) && isProfileValid(updatedUser);
  // effects
  useEffect(() => {
    if (!profile) {
      // initial info
      setEmail(api.getAuth().getEmail() ?? '');
      setPhone(api.getAuth().getPhoneNumber(true) ?? '');
      return;
    }
    if (profile.email && !email) setEmail(profile.email);
    if (profile.name && !name) setName(profile.name);
    if (profile.surname && !surname) setSurname(profile.surname);
    if (profile.cpf && !cpf) setCpf(profile.cpf);
    if (profile.birthday && !birthday) setBirthday(profile.birthday);
    if (profile.phone && !phone) setPhone(profile.phone);
  }, [api, profile, email, name, surname, cpf, birthday, phone]);
  // handlers
  const updateProfileHandler = () => {
    if (!profile?.id) return;
    setLoading(true);
    api
      .getProfile()
      .updateProfile(profile.id, updatedUser)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  // UI
  if (!profile) return null;
  return (
    <KeyboardAwareScrollView
      style={{ ...screens.default, padding: paddings.lg, backgroundColor: colors.gray50 }}
      enableOnAndroid
      enableAutomaticScroll
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Stack.Screen options={{ title: 'Dados pessoais' }} />
      <DefaultText size="2xl">Seus dados:</DefaultText>
      <DefaultInput
        style={{ marginTop: paddings.lg }}
        title="E-mail"
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        value={email}
        editable={!profileState.includes('approved')}
        blurOnSubmit={false}
        autoCorrect={false}
        onChangeText={setEmail}
        onSubmitEditing={() => nameRef.current?.focus()}
      />
      <DefaultInput
        ref={nameRef}
        style={{ marginTop: paddings.lg }}
        title="Nome"
        placeholder="Digite seu nome"
        value={name}
        keyboardType="default"
        returnKeyType="next"
        editable={!profileState.includes('approved')}
        blurOnSubmit={false}
        onChangeText={setName}
        onSubmitEditing={() => surnameRef.current?.focus()}
        maxLength={15}
      />
      <DefaultInput
        ref={surnameRef}
        style={{ marginTop: paddings.lg }}
        title="Sobrenome"
        placeholder="Digite seu sobrenome"
        value={surname}
        keyboardType="default"
        returnKeyType="next"
        editable={!profileState.includes('approved')}
        blurOnSubmit={false}
        onChangeText={setSurname}
        onSubmitEditing={() => cpfRef.current?.focus()}
        maxLength={15}
      />
      <PatternInput
        ref={cpfRef}
        style={{ marginTop: paddings.lg }}
        pattern="cpf"
        title="CPF"
        placeholder="Apenas números"
        keyboardType="number-pad"
        editable={!profileState.includes('approved')}
        value={cpf}
        onChangeText={setPhone}
      />
      <PatternInput
        ref={birthdayRef}
        style={{ marginTop: paddings.lg }}
        pattern="fulldate"
        title="Data de nascimento"
        placeholder="Apenas números"
        keyboardType="number-pad"
        editable={!profileState.includes('approved') || !profile.birthday}
        value={birthday}
        onChangeText={setBirthday}
      />
      <PatternInput
        ref={phoneRef}
        style={{ marginTop: paddings.lg }}
        pattern="phone"
        title="Celular"
        placeholder="Apenas números"
        keyboardType="number-pad"
        editable={false}
        value={phone}
      />
      <View style={{ flex: 1 }} />
      <AlertBox description="Após aprovação, as solicitações de alteração de dados cadastrais serão revisadas pelo nosso time." />
      <View style={{ flex: 1 }} />
      <DefaultButton
        title="Atualizar dados"
        disabled={!canUpdateProfile || isLoading}
        onPress={updateProfileHandler}
      />
    </KeyboardAwareScrollView>
  );
}
