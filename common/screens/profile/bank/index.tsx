import { useContextApi } from '@/api/ApiContext';
import { useFetchBanks } from '@/api/platform/banks/useFetchBanks';
import { useRequestedProfileChanges } from '@/api/profile/useRequestedProfileChanges';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { RadioButton } from '@/common/components/buttons/radio/RadioButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { LabeledText } from '@/common/components/texts/LabeledText';
import { Loading } from '@/common/components/views/Loading';
import { MessageBox } from '@/common/components/views/MessageBox';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { handleErrorMessage } from '@/common/firebase/errors';
import { bankFormatter, getCEFAccountCode } from '@/common/formatters/bank';
import { getProfileState } from '@/common/profile/getProfileState';
import { isBankAccountValid } from '@/common/profile/isBankAccountValid';
import { useBankPatterns } from '@/common/screens/profile/bank/useBankPatterns';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import {
  Bank,
  BankAccount,
  BankAccountPersonType,
  BankAccountType,
  ProfileChange,
  WithId,
} from '@appjusto/types';
import crashlytics from '@react-native-firebase/crashlytics';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import { PersonTypeModal } from './person-type-modal';

interface AccountTypeRadio {
  title: string;
  accountType: BankAccountType;
}

interface Props {
  bankId?: string;
  onSelectBank: () => void;
  onUpdateProfile?: () => void;
}

export default function ProfileBank({ bankId, onSelectBank, onUpdateProfile }: Props) {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // refs
  const agencyRef = useRef<TextInput>(null);
  const accountRef = useRef<TextInput>(null);
  // state
  const profile = useContextProfile();
  const profileState = getProfileState(profile);
  const banks = useFetchBanks();
  const pendingChange = useRequestedProfileChanges(profile?.id);
  const hasPendingChange = !isEmpty(pendingChange?.bankAccount);
  const [bank, setBank] = useState<WithId<Bank>>();
  const [agency, setAgency] = useState<string>();
  const [account, setAccount] = useState<string>();
  const [personType, setPersonType] = useState<BankAccountPersonType>();
  const [accountTypes, setAccountTypes] = useState<AccountTypeRadio[]>();
  const [accountType, setAccountType] = useState<BankAccountType>();
  const [personTypeModalShown, setPersonTypeModalShown] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  // effects
  // initial
  useEffect(() => {
    if (!profile?.bankAccount) return;
    if (profile.bankAccount.name && bank === undefined) {
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
  // side effects
  useEffect(() => {
    if (!bankId) return;
    if (bankId === bank?.id) return;
    const selectedBank = banks?.find((value) => value.id === bankId);
    if (selectedBank) {
      setBank(selectedBank);
      setAgency('');
      setAccount('');
      agencyRef.current?.focus();
    }
  }, [bankId, banks, bank]);
  // account types
  useEffect(() => {
    const types: AccountTypeRadio[] =
      bank?.code === '104'
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
    setAccountType(types[0].accountType);
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
  const canUpdateProfile = isBankAccountValid(updatedBank);
  // handlers
  const handleError = (error: unknown) => {
    if (error instanceof Error) crashlytics().recordError(error);
    const message = handleErrorMessage(error);
    showToast(message, 'error');
    setLoading(false);
  };
  const updateProfileHandler = () => {
    if (!profile?.id) return;
    if (!editing && !hasPendingChange && profileState.includes('approved')) {
      setEditing(true);
      return;
    }
    if (!bank) {
      return;
    }
    const agencyFormatted = agencyFormatter(bankFormatter(bank.agencyPattern, agency));
    let accountFormatted = accountFormatter(bankFormatter(bank.accountPattern, account));
    if (bank.code === '104') {
      accountFormatted = `${getCEFAccountCode(personType!, accountType!)}${accountFormatted}`;
    }
    const bankAccount = {
      ...updatedBank,
      agencyFormatted,
      accountFormatted,
    } as BankAccount;
    if (!editing) {
      setLoading(true);
      api
        .profile()
        .updateProfile({ bankAccount })
        .then(() => {
          setLoading(false);
          if (onUpdateProfile) onUpdateProfile();
        })
        .catch((error) => {
          handleError(error);
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
      console.log(bankChanges);
      if (isEmpty(bankChanges)) {
        showToast('Nenhuma alteração solicitada.', 'error');
        return;
      }
      setLoading(true);
      api
        .profile()
        .requestProfileChange(changes)
        .then(() => {
          setEditing(false);
          setLoading(false);
          showToast('As alterações foram solcitadas com sucesso!', 'success');
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };
  // UI
  if (!profile || !accountTypes) return <Loading />;
  return (
    <DefaultKeyboardAwareScrollView
      contentContainerStyle={{ ...screens.default, padding: paddings.lg }}
    >
      <SafeAreaView>
        <PersonTypeModal
          personType={personType}
          visible={personTypeModalShown}
          onConfirm={() => {
            setPersonTypeModalShown(false);
          }}
          onCancel={() => {
            setPersonTypeModalShown(false);
            setPersonType((value) =>
              value === 'Pessoa Física' ? 'Pessoa Jurídica' : 'Pessoa Física'
            );
          }}
        />
        <DefaultText size="lg">
          {profileState.includes('approved') ? 'Dados bancários' : 'Preencha seus dados bancários'}
        </DefaultText>
        <View style={{ flex: 1, marginTop: paddings.sm }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: paddings.sm,
              alignItems: 'center',
            }}
          >
            <RadioButton
              title="Pessoa Física"
              checked={personType === 'Pessoa Física'}
              onPress={() => {
                if (!profileState.includes('approved') || editing) {
                  setPersonType('Pessoa Física');
                  setPersonTypeModalShown(true);
                }
              }}
            />
            <RadioButton
              style={{ marginLeft: paddings.lg }}
              title="Pessoa Jurídica"
              checked={personType === 'Pessoa Jurídica'}
              onPress={() => {
                if (!profileState.includes('approved') || editing) {
                  setPersonType('Pessoa Jurídica');
                  setPersonTypeModalShown(true);
                }
              }}
            />
          </View>
          <LabeledText
            style={{ marginTop: paddings.lg }}
            title="Banco"
            placeholder="Selecione seu banco"
            value={bank?.name}
            color={!profileState.includes('approved') || editing ? 'neutral700' : 'neutral500'}
            onPress={() => {
              if (!profileState.includes('approved') || editing) onSelectBank();
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
            placeholder="Digite sua agência"
            keyboardType="number-pad"
            returnKeyType="next"
            editable={!profileState.includes('approved') || editing}
            value={agency}
            onChangeText={setAgency}
            onBlur={() => {
              if (bank?.agencyPattern && agency?.length) {
                setAgency(bankFormatter(bank.agencyPattern, agency));
              }
            }}
            onSubmitEditing={() => accountRef.current?.focus()}
          />
          <View style={{ marginTop: paddings.lg }}>
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
          </View>
          <PatternInput
            ref={accountRef}
            style={{ marginTop: paddings.lg }}
            patternObject={{
              mask: bank?.accountPattern,
              formatter: accountFormatter,
              parser: accountParser,
            }}
            title="Conta"
            placeholder="Digite sua conta"
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
          <MessageBox style={{ marginTop: paddings.lg }}>
            {profileState.includes('approved')
              ? hasPendingChange
                ? 'Sua solicitação foi enviada para o nosso time e será revisada em breve.'
                : 'Possíveis alterações dos seus dados cadastrais precisarão ser revisadas pelo nosso time.'
              : 'Se sua empresa for MEI, você pode usar sua conta bancária de pessoa física. Caso não seja MEI, a conta bancária deverá ser em nome da empresa.'}
          </MessageBox>
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
        </View>
      </SafeAreaView>
    </DefaultKeyboardAwareScrollView>
  );
}
