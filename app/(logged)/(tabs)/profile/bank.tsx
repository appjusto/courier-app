import useBanks from '@/api/platform/useBanks';
import { useProfile } from '@/api/profile/useProfile';
import { RadioButton } from '@/common/components/buttons/radio/RadioButton';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { useBankPatterns } from '@/common/components/profile/banks/useBankPatterns';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { LabeledText } from '@/common/components/texts/LabeledText';
import { DefaultView } from '@/common/components/views/DefaultView';
import screens from '@/common/constants/screens';
import { zeroing } from '@/common/formatters/bank';
import { getProfileState } from '@/common/profile/getProfileState';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import {
  Bank,
  BankAccountPersonType,
  BankAccountType,
  CourierProfile,
  WithId,
} from '@appjusto/types';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface AccountTypeRadio {
  title: string;
  accountType: BankAccountType;
}

export default function ProfileBank() {
  // context
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
  const [bank, setBank] = useState<WithId<Bank>>();
  const [agency, setAgency] = useState<string>();
  const [account, setAccount] = useState<string>();
  const [personType, setPersonType] = useState<BankAccountPersonType>();
  const [accountTypes, setAccountTypes] = useState<AccountTypeRadio[]>();
  const [accountType, setAccountType] = useState<BankAccountType>();
  const [editing, setEditing] = useState(true);
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
  // UI
  if (!profile)
    return (
      <DefaultView style={{ ...screens.default, backgroundColor: colors.gray50 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </DefaultView>
    );
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
      <Stack.Screen options={{ title: 'Dados bancários' }} />
      <DefaultText size="sm" color="gray700">
        <DefaultText size="sm" color="red">
          Aviso:
        </DefaultText>
        {` Se seu CNPJ for de uma MEI, cadastre sua conta Pessoa Física. Caso contrário, você precisará cadastrar uma conta corrente no nome da sua Pessoa Jurídica.`}
      </DefaultText>
      <View style={{ marginTop: paddings.sm }}>
        <RadioButton
          style={{ marginTop: paddings.sm }}
          title="Pessoa Física"
          checked={personType === 'Pessoa Física'}
          onPress={() => setPersonType('Pessoa Física')}
        />
        <RadioButton
          style={{ marginTop: paddings.xs }}
          title="Pessoa Jurídica"
          checked={personType === 'Pessoa Jurídica'}
          onPress={() => setPersonType('Pessoa Jurídica')}
        />
        <LabeledText
          style={{ marginTop: paddings.lg }}
          title="Banco"
          placeholder="Escolha seu banco"
          value={bank?.name}
          onPress={() => {
            router.push('/(logged)/(tabs)/profile/select-bank');
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
              setAgency(zeroing(bank?.agencyPattern, agencyParser(agency)));
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
            onPress={() => setAccountType(option.accountType)}
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
              setAccount(zeroing(bank?.accountPattern, accountParser(account)));
            }
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
