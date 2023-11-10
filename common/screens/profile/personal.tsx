import { useContextApi } from '@/api/ApiContext';
import { useRequestedProfileChanges } from '@/api/profile/useRequestedProfileChanges';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { MessageBox } from '@/common/components/views/MessageBox';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { handleErrorMessage } from '@/common/firebase/errors';
import { getProfileState } from '@/common/profile/getProfileState';
import { isProfileValid } from '@/common/profile/isProfileValid';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { ProfileChange, UserProfile } from '@appjusto/types';
import crashlytics from '@react-native-firebase/crashlytics';
import { isEmpty, omit } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';

interface Props {
  onUpdateProfile?: () => void;
}

export default function ProfilePersonalData({ onUpdateProfile }: Props) {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const profileState = getProfileState(profile);
  const showToast = useShowToast();
  // refs
  const nameRef = useRef<TextInput>(null);
  const surnameRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const birthdayRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  // state
  const pendingChange = useRequestedProfileChanges(profile?.id);
  const hasPendingChange = !isEmpty(omit(pendingChange ?? {}, ['company']));
  const [email, setEmail] = useState(api.auth().getEmail() ?? undefined);
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [phone, setPhone] = useState(api.auth().getPhoneNumber(true) ?? undefined);
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
  const canUpdateProfile = isProfileValid(updatedUser);
  // effects
  useEffect(() => {
    if (!profile) return;
    if (profile.email && email === undefined) setEmail(profile.email);
    if (profile.name && name === undefined) setName(profile.name);
    if (profile.surname && surname === undefined) setSurname(profile.surname);
    if (profile.cpf && cpf === undefined) setCpf(profile.cpf);
    if (profile.birthday && birthday === undefined) setBirthday(profile.birthday);
    if (profile.phone && phone === undefined) setPhone(profile.phone);
  }, [api, profile, email, name, surname, cpf, birthday, phone]);
  // handlers
  const handleError = (error: unknown) => {
    if (error instanceof Error) crashlytics().recordError(error);
    const message = handleErrorMessage(error);
    showToast(message, 'error');
    setLoading(false);
  };
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
        .profile()
        .updateProfile(updatedUser)
        .then(() => {
          setLoading(false);
          if (onUpdateProfile) onUpdateProfile();
        })
        .catch((error) => {
          handleError(error);
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
      if (isEmpty(changes)) {
        showToast('Nenhuma alteração solicitada.', 'warning');
        return;
      }
      api
        .profile()
        .requestProfileChange(changes)
        .then(() => {
          setLoading(false);
          setEditing(false);
          showToast('As alterações foram solcitadas com sucesso!', 'success');
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };
  // UI
  const title = 'Dados pessoais';
  if (!profile) return <Loading backgroundColor="neutral50" title={title} />;
  return (
    <DefaultKeyboardAwareScrollView style={{ ...screens.default, padding: paddings.lg }}>
      <SafeAreaView>
        <DefaultText size="lg">
          {profileState.includes('approved')
            ? 'Seus dados pessoais'
            : 'Preencha seus dados pessoais'}
        </DefaultText>
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
          autoCapitalize="words"
          editable={!profileState.includes('approved') || editing}
          blurOnSubmit={false}
          onChangeText={setName}
          onSubmitEditing={() => surnameRef.current?.focus()}
        />
        <DefaultInput
          ref={surnameRef}
          style={{ marginTop: paddings.lg }}
          title="Sobrenome"
          placeholder="Digite seu sobrenome"
          value={surname}
          keyboardType="default"
          returnKeyType="next"
          autoCapitalize="words"
          editable={!profileState.includes('approved') || editing}
          blurOnSubmit={false}
          onChangeText={setSurname}
          onSubmitEditing={() => cpfRef.current?.focus()}
        />
        <View style={{ flexDirection: 'row', marginTop: paddings.lg }}>
          <PatternInput
            style={{ flex: 1 }}
            ref={cpfRef}
            pattern="cpf"
            title="CPF"
            placeholder="000.000.000-00"
            keyboardType="number-pad"
            returnKeyType="next"
            editable={!profileState.includes('approved') || editing}
            blurOnSubmit={false}
            value={cpf}
            onChangeText={setCpf}
            onSubmitEditing={() => birthdayRef.current?.focus()}
          />
          <PatternInput
            ref={birthdayRef}
            style={{ marginLeft: paddings.lg, flex: 1 }}
            pattern="fulldate"
            title="Data de nascimento"
            placeholder="00/00/0000"
            keyboardType="number-pad"
            returnKeyType="done"
            editable={!profileState.includes('approved') || !profile?.birthday || editing}
            value={birthday}
            onChangeText={setBirthday}
          />
        </View>
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
        {profileState.includes('approved') ? (
          <MessageBox style={{ marginTop: paddings.lg }}>
            {hasPendingChange
              ? 'Sua solicitação foi enviada para o nosso time e será revisada em breve.'
              : 'Alterações dos seus dados cadastrais precisarão ser revisadas pelo nosso time.'}
          </MessageBox>
        ) : null}
        <View style={{ flex: 1 }} />
        <DefaultButton
          style={{ marginTop: paddings.lg, marginBottom: paddings.xl }}
          title={
            profileState.includes('approved')
              ? editing
                ? 'Salvar'
                : 'Atualizar dados'
              : 'Salvar e avançar'
          }
          disabled={isLoading || hasPendingChange || !canUpdateProfile}
          onPress={updateProfileHandler}
        />
      </SafeAreaView>
    </DefaultKeyboardAwareScrollView>
  );
}
