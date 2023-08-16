import { useContextApi } from '@/api/ApiContext';
import { useProfile } from '@/api/profile/useProfile';
import { useRequestedProfileChanges } from '@/api/profile/useRequestedProfileChanges';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { AlertBox } from '@/common/components/views/AlertBox';
import { Loading } from '@/common/components/views/Loading';
import { getProfileState } from '@/common/profile/getProfileState';
import { isProfileValid } from '@/common/profile/isProfileValid';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { CourierProfile, ProfileChange, UserProfile } from '@appjusto/types';
import { Stack } from 'expo-router';
import { isEmpty, omit } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfilePersonalData() {
  // context
  const api = useContextApi();
  const profile = useProfile<CourierProfile>();
  const profileState = getProfileState(profile);
  // refs
  const nameRef = useRef<TextInput>(null);
  const surnameRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const birthdayRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  // state
  const pendingChange = useRequestedProfileChanges(profile?.id);
  const hasPendingChange = !isEmpty(omit(pendingChange ?? {}, ['company']));
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
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
    if (
      !editing &&
      !hasPendingChange &&
      profileState.includes('approved') &&
      profile.birthday?.length === 8
    ) {
      setEditing(true);
      return;
    }
    setLoading(true);
    if (!editing) {
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
    } else {
      const changes: Partial<ProfileChange> = {
        accountId: profile.id,
      };
      if (name !== profile.name) changes.name = name;
      if (surname !== profile.surname) changes.surname = surname;
      if (cpf !== profile.cpf) changes.cpf = cpf;
      if (phone !== profile.phone) changes.phone = phone;
      if (birthday !== profile.birthday) changes.birthday = birthday;
      setEditing(false);
      api
        .getProfile()
        .requestProfileChange(changes)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };
  // UI
  const title = 'Dados pessoais';
  if (!profile) return <Loading backgroundColor="gray50" title={title} />;
  return (
    <KeyboardAwareScrollView
      style={{ ...screens.profile, padding: paddings.lg }}
      enableOnAndroid
      enableAutomaticScroll
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
      scrollIndicatorInsets={{ right: 1 }}
    >
      <Stack.Screen options={{ title }} />
      <DefaultText size="2xl">Seus dados:</DefaultText>
      <DefaultInput
        style={{ marginTop: paddings.lg }}
        title="E-mail"
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        returnKeyType="next"
        autoCapitalize="none"
        value={email}
        editable={!profileState.includes('approved') || editing}
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
        editable={!profileState.includes('approved') || editing}
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
        editable={!profileState.includes('approved') || editing}
        blurOnSubmit={false}
        maxLength={15}
        onChangeText={setSurname}
        onSubmitEditing={() => cpfRef.current?.focus()}
      />
      <PatternInput
        ref={cpfRef}
        style={{ marginTop: paddings.lg }}
        pattern="cpf"
        title="CPF"
        placeholder="Apenas números"
        keyboardType="number-pad"
        returnKeyType="next"
        editable={!profileState.includes('approved') || editing}
        blurOnSubmit={false}
        value={cpf}
        onChangeText={setPhone}
        onSubmitEditing={() => birthdayRef.current?.focus()}
      />
      <PatternInput
        ref={birthdayRef}
        style={{ marginTop: paddings.lg }}
        pattern="fulldate"
        title="Data de nascimento"
        placeholder="Apenas números"
        keyboardType="number-pad"
        returnKeyType="done"
        editable={!profileState.includes('approved') || !profile?.birthday || editing}
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
        editable={editing}
        value={phone}
        onChangeText={setPhone}
      />
      <View style={{ flex: 1 }} />
      {profileState.includes('approved') ? (
        <AlertBox
          variant={hasPendingChange ? 'yellow' : 'white'}
          description={
            hasPendingChange
              ? 'Sua solicitação foi enviada para o nosso time e será revisada em breve.'
              : 'Alterações dos seus dados cadastrais precisarão ser revisadas pelo nosso time.'
          }
        />
      ) : null}
      <View style={{ flex: 1 }} />
      <DefaultButton
        title={profileState.includes('approved') ? 'Atualizar dados' : 'Avançar'}
        disabled={
          isLoading || hasPendingChange || (!canUpdateProfile && !profileState.includes('approved'))
        }
        onPress={updateProfileHandler}
      />
    </KeyboardAwareScrollView>
  );
}