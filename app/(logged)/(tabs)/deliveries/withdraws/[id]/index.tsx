import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { getWithdrawStatusAsText } from '@/api/couriers/withdraws/getWithdrawStatusAsText';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { ShowToast } from '@/common/components/toast/Toast';
import { Loading } from '@/common/components/views/Loading';
import { MessageBox } from '@/common/components/views/MessageBox';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { formatTimestamp } from '@/common/formatters/timestamp';
import { WithdrawStatusBadge } from '@/common/screens/deliveries/withdraws/withdraw-status-badge';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Dayjs } from '@appjusto/dates';
import { AccountWithdraw } from '@appjusto/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function WithdrawDetailScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const withdrawId = params.id;
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // state
  const [withdraw, setWithdraw] = useState<AccountWithdraw | null>();
  // tracking
  useTrackScreenView('Detalhe de transferência');
  // side effects
  useEffect(() => {
    api
      .couriers()
      .fetchWithdraw(withdrawId)
      .then(setWithdraw)
      .catch((error: Error) => {
        setWithdraw(null);
        showToast(error.message, 'error');
      });
  }, [api, withdrawId, showToast]);
  useEffect(() => {
    ShowToast(withdrawId, 10000);
  }, [withdrawId]);
  // UI
  // console.log('withdraw', withdrawId, withdraw);
  if (!withdraw) return <Loading />;
  const { status, data, amount, createdOn } = withdraw;
  const payingAt = (() => {
    const result = 'Até às 23:59';
    if (data.paying_at) {
      const calendar = Dayjs(new Date(data.paying_at)).calendar();
      if (status !== 'pending') return calendar;
      return result + ' de ' + calendar;
    } else {
      if (status === 'pending') return result + ' do próximo dia útil';
      return null;
    }
  })();
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: `Transferência ${getWithdrawStatusAsText(status)}` }} />
      <DefaultView style={{ padding: paddings.lg }}>
        <DefaultView style={{ padding: paddings.lg }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <DefaultText size="lg" color="black">
                Transferência
              </DefaultText>
              <WithdrawStatusBadge style={{ marginLeft: paddings.md }} status={status} />
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="xs" color="neutral800">
                Valor
              </DefaultText>
              <DefaultText style={{ marginTop: paddings['2xs'] }}>{amount}</DefaultText>
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="xs" color="neutral800">
                Solicitado em
              </DefaultText>
              <DefaultText style={{ marginTop: paddings['2xs'] }}>
                {formatTimestamp(createdOn)}
              </DefaultText>
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="xs" color="neutral800">
                Destino
              </DefaultText>
              <DefaultText style={{ marginTop: paddings['2xs'] }}>
                {`${data.bank_address.bank} • Ag ${data.bank_address.bank_ag} • ${data.bank_address.bank_cc}`}
              </DefaultText>
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="xs" color="neutral800">
                Compensação
              </DefaultText>
              <DefaultText style={{ marginTop: paddings['2xs'] }}>{payingAt}</DefaultText>
            </View>
            {status === 'pending' ? (
              <MessageBox style={{ marginTop: paddings['2xl'] }}>
                {`O valor estará disponível ${payingAt}`}
              </MessageBox>
            ) : null}
          </View>
        </DefaultView>
      </DefaultView>
    </DefaultScrollView>
  );
}
