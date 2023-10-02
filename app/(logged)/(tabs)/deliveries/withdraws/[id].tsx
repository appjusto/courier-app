import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { MessageBox } from '@/common/components/views/MessageBox';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { formatTimestamp } from '@/common/formatters/timestamp';
import { WithdrawStatusBadge } from '@/common/screens/deliveries/withdraws/withdraw-status-badge';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Dayjs } from '@appjusto/dates';
import { AccountWithdraw } from '@appjusto/types';
import { useLocalSearchParams } from 'expo-router';
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
  useTrackScreenView('Transferência');
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
  // UI
  // console.log('withdraw', withdrawId, withdraw);
  if (withdraw === undefined) return <Loading />;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={{ padding: paddings.lg }}>
        {withdraw ? (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <DefaultText size="md" color="black">
                Transferência
              </DefaultText>
              <WithdrawStatusBadge style={{ marginLeft: paddings.md }} status={withdraw.status} />
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="xs" color="neutral800">
                Valor
              </DefaultText>
              <DefaultText style={{ marginTop: paddings['2xs'] }}>{withdraw.amount}</DefaultText>
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="xs" color="neutral800">
                Solicitado em
              </DefaultText>
              <DefaultText style={{ marginTop: paddings['2xs'] }}>
                {formatTimestamp(withdraw.createdOn)}
              </DefaultText>
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="xs" color="neutral800">
                Destino
              </DefaultText>
              <DefaultText style={{ marginTop: paddings['2xs'] }}>
                {`${withdraw.data.bank_address.bank} • Ag ${withdraw.data.bank_address.bank_ag} • ${withdraw.data.bank_address.bank_cc}`}
              </DefaultText>
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="xs" color="neutral800">
                Previsão de compensação
              </DefaultText>
              <DefaultText style={{ marginTop: paddings['2xs'] }}>
                {`${
                  withdraw.data.paying_at
                    ? Dayjs(new Date(withdraw.data.paying_at)).calendar()
                    : 'Até 23:59 do dia solicitado'
                }`}
              </DefaultText>
            </View>
            <MessageBox style={{ marginTop: paddings['2xl'] }}>
              Valores solicitados para transferência após horário comercial serão compensados no dia
              seguinte.
            </MessageBox>
          </View>
        ) : null}
      </DefaultView>
    </DefaultScrollView>
  );
}
