import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveApprovedEntries } from '@/api/ledger/useObserveApprovedEntries';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { Loading } from '@/common/components/views/Loading';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { AccountSummary } from '@/common/screens/deliveries/history/account/account-summary';
import { LedgerEntriesList } from '@/common/screens/deliveries/ledger/ledger-entries-list';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

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
          style={{ marginTop: paddings.sm }}
          title="Seus últimos ganhos"
          emptyText="Ops! Não encontramos nenhum ganho recente. Bora ficar disponível e
          pegar umas corridas?"
          entries={entries}
        >
          <DefaultButton
            style={{ marginTop: paddings.lg }}
            title="Ver histórico de ganhos"
            size="sm"
            variant="outline"
            onPress={() => router.push('/deliveries/ledger')}
          />
          <LinkButton
            style={{ marginTop: paddings.sm, alignSelf: 'center' }}
            variant="ghost"
            onPress={() => router.push('/deliveries/orders')}
          >
            Ver histórico de corridas
          </LinkButton>
        </LedgerEntriesList>
        <Pressable onPress={() => router.push('/calculator/')}>
          <DefaultCard
            style={{ marginTop: paddings.md }}
            icon={<DefaultCardIcon iconName="file" />}
            title="Calculadora de ganhos"
            subtitle="Calcule seus ganhos por corrida e por hora"
          />
        </Pressable>
      </DefaultView>
    </DefaultScrollView>
  );
}
