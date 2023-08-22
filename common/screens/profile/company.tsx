import { useContextApi } from '@/api/ApiContext';
import { fetchPostalDetails } from '@/api/externals/viacep';
import { useProfile } from '@/api/profile/useProfile';
import { useRequestedProfileChanges } from '@/api/profile/useRequestedProfileChanges';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { MessageBox } from '@/common/components/views/MessageBox';
import { useToast } from '@/common/components/views/toast/ToastContext';
import { handleErrorMessage } from '@/common/firebase/errors';
import { getProfileState } from '@/common/profile/getProfileState';
import { isCompanyValid } from '@/common/profile/isCompanyValid';
import paddings from '@/common/styles/paddings';
import { CourierCompany, CourierProfile, ProfileChange } from '@appjusto/types';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

interface Props {
  onUpdateProfile?: () => void;
}

export default function ProfileCompany({ onUpdateProfile }: Props) {
  // context
  const api = useContextApi();
  const profile = useProfile<CourierProfile>();
  const profileState = getProfileState(profile);
  const { showToast } = useToast();
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
    number: (number ?? '').trim(),
    additional: (additional ?? '').trim(),
    city: (city ?? '').trim(),
    state: (state ?? '').trim(),
  };
  const canUpdateProfile = isCompanyValid(profile?.company) || isCompanyValid(updatedCompany);
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
          console.log(result);
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
  const handlError = (error: unknown) => {
    const message = handleErrorMessage(error);
    console.log(message);
    showToast(message, 'error');
    setLoading(false);
  };
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
          if (onUpdateProfile) onUpdateProfile();
        })
        .catch((error) => {
          handlError(error);
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
      api
        .getProfile()
        .requestProfileChange(changes)
        .then(() => {
          setEditing(false);
          setLoading(false);
          showToast('As alterações foram solcitadas com sucesso!', 'success');
        })
        .catch((error) => {
          handlError(error);
        });
    }
  };
  const title = 'Dados da sua PJ';
  if (!profile) return <Loading backgroundColor="neutral50" title={title} />;
  return (
    <View style={{ flex: 1, padding: paddings.lg }}>
      <DefaultText size="lg">
        {profileState.includes('approved')
          ? 'Os dados da sua MEI ou PJ'
          : 'Preencha os dados da sua MEI ou PJ'}
      </DefaultText>
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
        ref={cepRef}
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
      {profileState.includes('approved') ? (
        <MessageBox style={{ marginTop: paddings.lg }}>
          {hasPendingChange
            ? 'Sua solicitação foi enviada para o nosso time e será revisada em breve.'
            : 'Alterações dos seus dados cadastrais precisarão ser revisadas pelo nosso time.'}
        </MessageBox>
      ) : null}
      <View style={{ flex: 1 }} />
      <DefaultButton
        style={{ marginTop: paddings.lg }}
        title={
          profileState.includes('approved')
            ? editing
              ? 'Salvar'
              : 'Atualizar dados'
            : 'Salvar e avançar'
        }
        disabled={
          isLoading || hasPendingChange || (!canUpdateProfile && !profileState.includes('approved'))
        }
        onPress={updateProfileHandler}
      />
    </View>
  );
}
