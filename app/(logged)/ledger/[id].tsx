import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { getLedgerStatusAsText } from '@/api/ledger/status/getLedgerStatusAsText';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { formatCurrency } from '@/common/formatters/currency';
import { formatTimestamp } from '@/common/formatters/timestamp';
import { LedgerEntryStatusBadge } from '@/common/screens/deliveries/ledger/ledger-status-badge';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { LedgerEntry } from '@appjusto/types';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function LedgerEntryScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const entryId = params.id;
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // state
  const [entry, setEntry] = useState<LedgerEntry | null>();
  // tracking
  useTrackScreenView('Detalhe de ganho');
  // side effects
  useEffect(() => {
    api
      .ledger()
      .fetchLedgerEntry(entryId)
      .then(setEntry)
      .catch((error: Error) => {
        setEntry(null);
        showToast(error.message, 'error');
      });
  }, [api, entryId, showToast]);
  // UI
  // console.log('withdraw', withdrawId, withdraw);
  if (!entry) return <Loading />;
  const { status, value, orderId, orderCode, createdOn, updatedOn } = entry;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: `Ganho ${getLedgerStatusAsText(status)}` }} />
      <DefaultView style={{ padding: paddings.lg }}>
        <DefaultView style={{ padding: paddings.lg }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <DefaultText size="lg" color="black">
                Ganho
              </DefaultText>
              <LedgerEntryStatusBadge style={{ marginLeft: paddings.md }} status={entry.status} />
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="sm" color="neutral800">
                Valor
              </DefaultText>
              <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                {formatCurrency(value)}
              </DefaultText>
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="sm" color="neutral800">
                Criado em
              </DefaultText>
              <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                {formatTimestamp(createdOn)}
              </DefaultText>
            </View>
            {status === 'paid' && updatedOn ? (
              <View style={{ marginTop: paddings.lg }}>
                <DefaultText size="sm" color="neutral800">
                  Pago em
                </DefaultText>
                <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                  {formatTimestamp(updatedOn)}
                </DefaultText>
              </View>
            ) : null}
            {orderCode ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: paddings.lg,
                }}
              >
                <View>
                  <DefaultText size="sm" color="neutral800">
                    Corrida
                  </DefaultText>
                  <View
                    style={{
                      marginTop: paddings['2xs'],
                    }}
                  >
                    {orderCode ? <DefaultText size="md">{`#${orderCode}`}</DefaultText> : null}
                  </View>
                </View>
                {orderId ? (
                  <LinkButton
                    variant="ghost"
                    onPress={() =>
                      router.push({
                        pathname: '/(logged)/order/[id]/detail',
                        params: { id: orderId },
                      })
                    }
                  >
                    Ver mais
                  </LinkButton>
                ) : null}
              </View>
            ) : null}
          </View>
        </DefaultView>
      </DefaultView>
    </DefaultScrollView>
  );
}
