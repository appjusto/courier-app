import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveApprovedEntries } from '@/api/ledger/useObserveApprovedEntries';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { Loading } from '@/common/components/views/Loading';
import { AccountSummary } from '@/common/screens/deliveries/history/account/account-summary';
import { LedgerEntriesList } from '@/common/screens/deliveries/ledger/ledger-entries-list';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function DeliveriesIndex() {
  // context
  const router = useRouter();
  // state
  const entries = useObserveApprovedEntries();
  // tracking
  useTrackScreenView('Suas corridas');
  // UI
  if (!entries) return <Loading />;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={{ ...screens.headless, padding: paddings.lg }}>
        <AccountSummary />
        <LedgerEntriesList
          style={{ marginTop: paddings.lg }}
          entries={entries}
          title="Seus últimos ganhos"
          emptyText="Ops! Não encontramos nenhuma corrida nas últimas 24hs. Bora ficar disponível e
          pegar umas corridas?"
        >
          <DefaultButton
            style={{ marginTop: paddings.lg }}
            title="Ver histórico de ganhos"
            variant="outline"
            onPress={() => router.push('/deliveries/ledger')}
          />
        </LedgerEntriesList>
        <View style={{ flex: 1 }} />
        <DefaultButton
          variant="outline"
          title="Ver histórico de corridas"
          onPress={() => router.push('/deliveries/history')}
        />
      </DefaultView>
    </DefaultScrollView>
  );
}
