import { useContextApi } from '@/api/ApiContext';
import { fetchPostalDetails } from '@/api/externals/viacep';
import { useProfile } from '@/api/profile/useProfile';
import { useRequestedProfileChanges } from '@/api/profile/useRequestedProfileChanges';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { AlertBox } from '@/common/components/views/AlertBox';
import { DefaultView } from '@/common/components/views/DefaultView';
import screens from '@/common/constants/screens';
import { getProfileState } from '@/common/profile/getProfileState';
import { isCompanyValid } from '@/common/profile/isCompanyValid';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { CourierCompany, CourierProfile, ProfileChange } from '@appjusto/types';
import { Stack } from 'expo-router';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfilePersonalData() {
  // context
  const api = useContextApi();
  const profile = useProfile<CourierProfile>();
  const profileState = getProfileState(profile);
  // refs
  const nameRef = useRef<TextInput>(null);
  const cepRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const numberRef = useRef<TextInput>(null);
  const additionalRef = useRef<TextInput>(null);
  // state
  const pendingChange = useRequestedProfileChanges(profile?.id);
  const hasPendingChange = !isEmpty(pendingChange?.company);
  const [cnpj, setCNPJ] = useState<string>();
  const [name, setName] = useState<string>();
  const [cep, setCEP] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [additional, setAdditional] = useState<string>();
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  // helpers
  const updatedCompany: CourierCompany = {
    cnpj: (cnpj ?? '').trim(),
    name: (name ?? '').trim(),
    cep: (cep ?? '').trim(),
    address: (address ?? '').trim(),
    number: (address ?? '').trim(),
    additional: (additional ?? '').trim(),
    city: (city ?? '').trim(),
    state: (state ?? '').trim(),
  };
  const canUpdateProfile = !isCompanyValid(profile?.company) && isCompanyValid(updatedCompany);
  // effects
  useEffect(() => {
    if (!profile) return;
    if (profile.company?.cnpj && !cnpj) setCNPJ(profile.company.cnpj);
    if (profile.company?.name && !name) setName(profile.company.name);
    if (profile.company?.cep && !cep) setCEP(profile.company.cep);
    if (profile.company?.address && !address) setAddress(profile.company.address);
    if (profile.company?.number && !number) setNumber(profile.company.number);
    if (profile.company?.additional && !additional) setAdditional(profile.company.additional);
    if (profile.company?.city && !city) setCity(profile.company.city);
    if (profile.company?.state && !state) setState(profile.company.state);
  }, [api, profile, cnpj, name, cep, address, number, additional, city, state]);
  useEffect(() => {
    if (cep?.length === 8 && cepRef.current?.isFocused()) {
      setLoading(true);
      fetchPostalDetails(cep)
        .then((result) => {
          setLoading(false);
          if (!result.error) {
            setAddress(result.logradouro);
            setCity(result.localidade);
            setState(result.uf);
            numberRef.current?.focus();
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    }
  }, [cep]);
  // handlers
  const updateProfileHandler = () => {
    if (!profile?.id) return;
    if (!editing && !hasPendingChange && profileState.includes('approved')) {
      setEditing(true);
      return;
    }
    setLoading(true);
    if (!editing) {
      api
        .getProfile()
        .updateProfile(profile.id, { company: updatedCompany })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      const companyChanges: Partial<CourierCompany> = {};
      const changes: Partial<ProfileChange> = {
        accountId: profile.id,
        company: companyChanges,
      };
      if (Boolean(cnpj) && cnpj !== profile.company?.cnpj) companyChanges.cnpj = cnpj;
      if (Boolean(name) && name !== profile.company?.name) companyChanges.name = name;
      if (Boolean(cep) && cep !== profile.company?.cep) companyChanges.cep = cep;
      if (Boolean(address) && address !== profile.company?.address)
        companyChanges.address = address;
      if (Boolean(number) && number !== profile.company?.number) companyChanges.number = number;
      if (Boolean(additional) && additional !== profile.company?.additional)
        companyChanges.additional = additional;
      if (Boolean(city) && city !== profile.company?.city) companyChanges.city = city;
      if (Boolean(state) && state !== profile.company?.state) companyChanges.state = state;
      console.log(changes);
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
  if (!profile)
    return (
      <DefaultView style={{ ...screens.default, backgroundColor: colors.gray50 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </DefaultView>
    );
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
      <Stack.Screen options={{ title: 'Dados da sua PJ' }} />
      <DefaultText size="sm">Preencha os dados da sua MEI ou empresa</DefaultText>
      <PatternInput
        style={{ marginTop: paddings.lg }}
        pattern="cnpj"
        title="CNPJ"
        placeholder="Apenas números"
        keyboardType="number-pad"
        returnKeyType="next"
        editable={!profileState.includes('approved') || editing}
        blurOnSubmit={false}
        value={cnpj}
        onChangeText={setCNPJ}
        onSubmitEditing={() => nameRef.current?.focus()}
      />
      <DefaultInput
        ref={nameRef}
        style={{ marginTop: paddings.lg }}
        title="Razão social"
        placeholder="Razão social da sua PJ"
        value={name}
        keyboardType="default"
        returnKeyType="next"
        editable={!profileState.includes('approved') || editing}
        blurOnSubmit={false}
        onChangeText={setName}
        onSubmitEditing={() => cepRef.current?.focus()}
        maxLength={15}
      />
      <PatternInput
        style={{ marginTop: paddings.lg }}
        pattern="cep"
        title="CEP"
        placeholder="Apenas números"
        keyboardType="number-pad"
        returnKeyType="next"
        editable={!profileState.includes('approved') || editing}
        blurOnSubmit={false}
        value={cep}
        onChangeText={setCEP}
        onSubmitEditing={() => addressRef.current?.focus()}
      />
      <DefaultInput
        ref={addressRef}
        style={{ marginTop: paddings.lg }}
        title="Endereço"
        placeholder="Endereço"
        value={address}
        keyboardType="default"
        returnKeyType="next"
        editable={!profileState.includes('approved') || editing}
        blurOnSubmit={false}
        onChangeText={setAddress}
        onSubmitEditing={() => numberRef.current?.focus()}
      />
      <View style={{ flexDirection: 'row', marginTop: paddings.lg }}>
        <DefaultInput
          ref={numberRef}
          style={{ flex: 1 }}
          title="Número"
          value={number}
          placeholder="000"
          keyboardType="phone-pad"
          returnKeyType="next"
          editable={!profileState.includes('approved') || editing}
          blurOnSubmit={false}
          onChangeText={setNumber}
          onSubmitEditing={() => additionalRef.current?.focus()}
        />
        <DefaultInput
          ref={additionalRef}
          style={{ marginLeft: paddings.lg, flex: 3 }}
          title="Complemento"
          value={additional}
          placeholder="Sem complemento"
          maxLength={9}
          keyboardType="default"
          returnKeyType="next"
          editable={!profileState.includes('approved') || editing}
          onChangeText={setAdditional}
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: paddings.lg }}>
        <DefaultInput
          style={{ flex: 3 }}
          title="Cidade"
          placeholder="Cidade"
          value={city}
          keyboardType="default"
          returnKeyType="next"
          editable={!profileState.includes('approved') || editing}
          onChangeText={setCity}
        />
        <DefaultInput
          style={{ flex: 1, marginLeft: paddings.lg }}
          title="Estado"
          placeholder="UF"
          value={state}
          maxLength={2}
          keyboardType="default"
          returnKeyType="next"
          editable={!profileState.includes('approved') || editing}
          onChangeText={setState}
        />
      </View>
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
        title="Atualizar dados"
        disabled={
          isLoading || hasPendingChange || (!canUpdateProfile && !profileState.includes('approved'))
        }
        onPress={updateProfileHandler}
      />
    </KeyboardAwareScrollView>
  );
}
