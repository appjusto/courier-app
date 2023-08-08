import { useContextApi } from '@/api/ApiContext';
import useBanks from '@/api/platform/useBanks';
import { useProfile } from '@/api/profile/useProfile';
import { useRequestedProfileChanges } from '@/api/profile/useRequestedProfileChanges';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { RadioButton } from '@/common/components/buttons/radio/RadioButton';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { useBankPatterns } from '@/common/components/profile/banks/useBankPatterns';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { LabeledText } from '@/common/components/texts/LabeledText';
import { AlertBox } from '@/common/components/views/AlertBox';
import { Loading } from '@/common/components/views/Loading';
import { bankFormatter, getCEFAccountCode } from '@/common/formatters/bank';
import { getProfileState } from '@/common/profile/getProfileState';
import { isBankAccountValid } from '@/common/profile/isBankAccountValid';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import {
  Bank,
  BankAccount,
  BankAccountPersonType,
  BankAccountType,
  CourierProfile,
  ProfileChange,
  WithId,
} from '@appjusto/types';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface AccountTypeRadio {
  title: string;
  accountType: BankAccountType;
}

export default function ProfileBank() {
  // context
  const api = useContextApi();
  const router = useRouter();
  // params
  // @ts-ignore
  const search = useLocalSearchParams<{ bankId: string }>();
  // refs
  const agencyRef = useRef<TextInput>(null);
  const accountRef = useRef<TextInput>(null);
  // state
  const profile = useProfile<CourierProfile>();
  const profileState = getProfileState(profile);
  const banks = useBanks();
  const pendingChange = useRequestedProfileChanges(profile?.id);
  const hasPendingChange = !isEmpty(pendingChange?.bankAccount);
  const [bank, setBank] = useState<WithId<Bank>>();
  const [agency, setAgency] = useState<string>();
  const [account, setAccount] = useState<string>();
  const [personType, setPersonType] = useState<BankAccountPersonType>();
  const [accountTypes, setAccountTypes] = useState<AccountTypeRadio[]>();
  const [accountType, setAccountType] = useState<BankAccountType>();
  const [isLoading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  // effects
  // initial
  useEffect(() => {
    if (!profile?.bankAccount) return;
    if (profile.bankAccount.name && !bank) {
      const selectedBank = banks?.find((value) => value.name === profile.bankAccount?.name);
      if (selectedBank) setBank(selectedBank);
    }
    if (profile.bankAccount.personType && personType === undefined) {
      setPersonType(profile.bankAccount.personType);
    }
    if (profile.bankAccount.type && accountType === undefined) {
      setAccountType(profile.bankAccount.type);
    }
    if (profile.bankAccount.agency && agency === undefined) {
      setAgency(profile.bankAccount.agency);
    }
    if (profile.bankAccount.account && account === undefined) {
      setAccount(profile.bankAccount.account);
    }
  }, [profile, bank, banks, personType, accountType, agency, account]);
  // params
  useEffect(() => {
    if (!search.bankId) return;
    if (search.bankId === bank?.id) return;
    const selectedBank = banks?.find((value) => value.id === search.bankId);
    if (selectedBank) {
      setBank(selectedBank);
      setAgency('');
      setAccount('');
      agencyRef.current?.focus();
    }
  }, [search, banks, bank]);
  // account types
  useEffect(() => {
    if (!bank) return;
    const types: AccountTypeRadio[] =
      bank.code === '104'
        ? [
            { title: '001 - Conta Corrente', accountType: 'Corrente' },
            { title: '002 - Conta Simples', accountType: 'Simples' },
            { title: '013 - Conta Poupança', accountType: 'Poupança' },
            { title: '1288 - Conta Poupança (novo formato)', accountType: 'Nova Poupança' },
          ]
        : [
            { title: 'Corrente', accountType: 'Corrente' },
            { title: 'Poupança', accountType: 'Poupança' },
          ];
    setAccountTypes(types);
  }, [bank]);
  // helpers
  const { agencyParser, agencyFormatter, accountParser, accountFormatter } = useBankPatterns(bank);
  const updatedBank = (() => {
    const value: Partial<BankAccount> = {
      type: accountType,
      personType,
      agency: (agency ?? '').trim(),
      agencyFormatted: agencyFormatter(agency),
      account: (account ?? '').trim(),
      accountFormatted: accountFormatter(account),
      name: bank?.name ?? '',
    };
    return value;
  })();
  const canUpdateProfile =
    !isBankAccountValid(profile?.bankAccount) && isBankAccountValid(updatedBank);
  // handlers
  const updateProfileHandler = () => {
    if (!profile?.id) return;
    if (!editing && !hasPendingChange && profileState.includes('approved')) {
      setEditing(true);
      return;
    }
    console.log('canUpdateProfile', canUpdateProfile);
    if (!bank) {
      return;
    }
    const agencyFormatted = agencyFormatter(agency);
    let accountFormatted = accountFormatter(account);
    if (bank.code === '104') {
      accountFormatted = `${getCEFAccountCode(personType!, accountType!)}${accountFormatted}`;
    }
    setLoading(true);
    if (!editing) {
      api
        .getProfile()
        .updateProfile(profile.id, { bankAccount: updatedBank as BankAccount })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      const bankChanges: Partial<BankAccount> = {};
      const changes: Partial<ProfileChange> = {
        accountId: profile.id,
        bankAccount: bankChanges,
      };
      if (Boolean(accountType) && accountType !== profile.bankAccount?.type) {
        bankChanges.type = accountType;
      }
      if (Boolean(personType) && personType !== profile.bankAccount?.personType) {
        bankChanges.personType = personType;
      }
      if (bank.name !== profile.bankAccount?.name) {
        bankChanges.name = bank.name;
      }
      if (Boolean(agency) && agency !== profile.bankAccount?.agency) {
        bankChanges.agency = agency;
        bankChanges.agencyFormatted = agencyFormatted;
      }
      if (Boolean(account) && account !== profile.bankAccount?.account) {
        bankChanges.account = account;
        bankChanges.accountFormatted = accountFormatted;
      }
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
  const title = 'Dados bancários';
  if (!profile || !accountTypes) return <Loading backgroundColor="gray50" title={title} />;
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
      <DefaultText size="sm" color="gray700">
        <DefaultText size="sm" color="red">
          Aviso:
        </DefaultText>
        {` Se seu CNPJ for de uma MEI, cadastre uma conta no seu nome. Caso contrário, você precisará cadastrar uma conta corrente no nome da sua PJ.`}
      </DefaultText>
      <View style={{ flex: 1, marginTop: paddings.sm }}>
        <RadioButton
          style={{ marginTop: paddings.sm }}
          title="Pessoa Física"
          checked={personType === 'Pessoa Física'}
          onPress={() => {
            if (!profileState.includes('approved') || editing) {
              setPersonType('Pessoa Física');
            }
          }}
        />
        <RadioButton
          style={{ marginTop: paddings.xs }}
          title="Pessoa Jurídica"
          checked={personType === 'Pessoa Jurídica'}
          onPress={() => {
            if (!profileState.includes('approved') || editing) {
              setPersonType('Pessoa Jurídica');
            }
          }}
        />
        <LabeledText
          style={{ marginTop: paddings.lg }}
          title="Banco"
          placeholder="Escolha seu banco"
          value={bank?.name}
          color={!profileState.includes('approved') || editing ? 'gray700' : 'gray500'}
          onPress={() => {
            router.push('/profile/select-bank');
          }}
        />
        <PatternInput
          ref={agencyRef}
          style={{ marginTop: paddings.lg }}
          patternObject={{
            mask: bank?.agencyPattern,
            formatter: agencyFormatter,
            parser: agencyParser,
          }}
          title="Agência"
          placeholder="Apenas números"
          keyboardType="number-pad"
          returnKeyType="next"
          editable={!profileState.includes('approved') || editing}
          value={agency}
          onChangeText={setAgency}
          onBlur={() => {
            if (bank?.agencyPattern && agency?.length) {
              setAgency(bankFormatter(bank?.agencyPattern, agency));
            }
          }}
          onSubmitEditing={() => accountRef.current?.focus()}
        />
        <DefaultText
          style={{ marginTop: paddings['2xl'], marginBottom: paddings.sm }}
          size="sm"
          color="gray700"
        >
          Selecione o tipo da sua conta:
        </DefaultText>
        {(accountTypes ?? []).map((option) => (
          <RadioButton
            key={option.accountType}
            style={{ marginTop: paddings.xs }}
            title={option.title}
            checked={accountType === option.accountType}
            onPress={() => {
              if (!profileState.includes('approved') || editing) {
                setAccountType(option.accountType);
              }
            }}
          />
        ))}
        <PatternInput
          ref={accountRef}
          style={{ marginTop: paddings.lg }}
          patternObject={{
            mask: bank?.accountPattern,
            formatter: accountFormatter,
            parser: accountParser,
          }}
          title="Conta"
          placeholder="Apenas números"
          keyboardType="number-pad"
          returnKeyType="next"
          editable={!profileState.includes('approved') || editing}
          value={account}
          onChangeText={setAccount}
          onBlur={() => {
            if (bank?.accountPattern && account?.length) {
              setAccount(bankFormatter(bank.accountPattern, account));
            }
          }}
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
        <SafeAreaView>
          <DefaultButton
            title={profileState.includes('approved') ? 'Atualizar dados' : 'Avançar'}
            disabled={
              isLoading ||
              hasPendingChange ||
              (!canUpdateProfile && !profileState.includes('approved'))
            }
            onPress={updateProfileHandler}
          />
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
}
