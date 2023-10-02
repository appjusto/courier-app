import { useContextApi } from '@/api/ApiContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { formatCurrency } from '@/common/formatters/currency';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import crashlytics from '@react-native-firebase/crashlytics';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { toNumber } from 'lodash';
import { useState } from 'react';
import { View } from 'react-native';

export default function RequestWithdrawScreen() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // params
  const search = useLocalSearchParams<{ balance: string; fee: string; value: string }>();
  const { balance, fee, value } = search;
  const balanceAsNumber = toNumber(balance);
  // state
  const [loading, setLoading] = useState(false);
  // handlers
  const requestWithdraw = () => {
    setLoading(true);
    api
      .couriers()
      .requestWithdraw(balanceAsNumber)
      .then(() => {
        setLoading(false);
        showToast('Solicitação realizada com sucesso!', 'success');
        router.back();
      })
      .catch((error: unknown) => {
        if (error instanceof Error) crashlytics().recordError(error);
        showToast(
          'Não foi possível solicitar a transferência. Tente novamente mais tarde.',
          'error'
        );
        setLoading(false);
      });
  };
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Solicitar transferência' }} />
      <DefaultView style={{ padding: paddings.lg }}>
        <DefaultText size="md">
          {`O appjusto não fica com nada do valor do seu trabalho. Todos os pagamentos são processados com segurança pela operadora financeira Iugu, que cobra ${fee} por cada operação de saque.`}
        </DefaultText>
        <DefaultText size="lg">{`Disponível para transferência: ${formatCurrency(
          balanceAsNumber
        )}`}</DefaultText>
        <DefaultText size="lg">{`Taxa iugu: ${formatCurrency(toNumber(fee))}`}</DefaultText>
        <DefaultText size="lg">{`Valor que será transferido: ${formatCurrency(
          toNumber(value)
        )}`}</DefaultText>
        <DefaultText size="lg">{`Atenção: o saque pode ser solicitado a qualquer momento mas o valor compensa na conta somente no próximo dia útil, até 23:59`}</DefaultText>
        <View style={{ flex: 1 }} />
        <DefaultButton
          title="Confirmar transferência"
          disabled={loading}
          onPress={requestWithdraw}
        />
      </DefaultView>
    </DefaultScrollView>
  );
}
