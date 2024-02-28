import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { MessageBox } from '@/common/components/views/MessageBox';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { formatCurrency } from '@/common/formatters/currency';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import crashlytics from '@react-native-firebase/crashlytics';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { toNumber } from 'lodash';
import { CircleDollarSign, Percent, Wallet } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function RequestWithdrawScreen() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // params
  const search = useLocalSearchParams<{
    balance: string;
    fee: string;
    value: string;
    instantWithdraw: string;
  }>();
  const { balance, fee, value, instantWithdraw } = search;
  const balanceAsNumber = toNumber(balance);
  const instant = instantWithdraw === 'true';
  // tracking
  useTrackScreenView('Solicitar transferência');
  // state
  const [loading, setLoading] = useState(false);
  // handlers
  const requestWithdraw = () => {
    setLoading(true);
    api
      .couriers()
      .requestWithdraw(balanceAsNumber, instant)
      .then((id) => {
        setLoading(false);
        router.replace({
          pathname: '/(logged)/(tabs)/deliveries/withdraws/[id]/feedback',
          params: { id, instantWithdraw },
        });
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
        <DefaultText style={{ ...lineHeight.lg }} size="lg">
          O AppJusto não fica com o valor do seu trabalho
        </DefaultText>
        <DefaultText
          style={{ marginTop: paddings.xs, ...lineHeight.sm }}
          size="sm"
          color="neutral800"
        >
          {`Todos os pagamentos são processados com segurança pela operadora financeira Iugu, que cobra ${fee} por cada operação de saque.`}
        </DefaultText>
        <View
          style={{
            marginTop: paddings.lg,
            padding: paddings.lg,
            ...borders.default,
            borderColor: colors.neutral100,
          }}
        >
          <View style={{ flexDirection: 'row', padding: paddings.md }}>
            <CircleDollarSign color={colors.neutral800} />
            <View style={{ marginLeft: paddings.lg }}>
              <DefaultText>Disponível para transferência</DefaultText>
              <DefaultText size="xl">{formatCurrency(balanceAsNumber)}</DefaultText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: paddings.sm, padding: paddings.md }}>
            <Percent color={colors.neutral800} />
            <View style={{ marginLeft: paddings.lg }}>
              <DefaultText>Taxa da Iugu por saque</DefaultText>
              <DefaultText size="xl">{`-${fee}`}</DefaultText>
            </View>
          </View>
          <View
            style={{
              marginTop: paddings.sm,
              backgroundColor: colors.success100,
              borderRadius: 8,
            }}
          >
            <View style={{ flexDirection: 'row', padding: paddings.md }}>
              <Wallet color={colors.black} />
              <View style={{ marginLeft: paddings.lg }}>
                <DefaultText>Valor total do saque</DefaultText>
                <DefaultText size="xl">{`${formatCurrency(toNumber(value))}`}</DefaultText>
              </View>
            </View>
          </View>
        </View>
        <MessageBox style={{ marginTop: paddings.lg }}>
          {instant === true
            ? `Atenção: o saque pode ser solicitado todos os dias, entre 6h e 22h. O valor será compensado imediatamente na sua conta.`
            : `Atenção: o saque pode ser solicitado durante o horário comercial e o valor será compensado na conta no próximo dia útil, até 23:59.`}
        </MessageBox>
        <DefaultButton
          style={{ marginVertical: paddings.lg }}
          title="Confirmar transferência"
          loading={loading}
          disabled={loading}
          onPress={requestWithdraw}
        />
      </DefaultView>
    </DefaultScrollView>
  );
}
