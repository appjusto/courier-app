import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveLedgerFromPeriod } from '@/api/ledger/useObserveLedgerFromPeriod';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { Loading } from '@/common/components/views/Loading';
import { getEndOfDay, getStartOfDay } from '@/common/date';
import { PeriodControl } from '@/common/screens/deliveries/history/period-control';
import { LedgerEntriesList } from '@/common/screens/deliveries/ledger/ledger-entries-list';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { isEqual } from 'lodash';
import { useCallback, useRef, useState } from 'react';

export default function DeliveriesLedger() {
  // state
  const startOfDay = useRef(getStartOfDay())?.current;
  const endOfDay = useRef(getEndOfDay())?.current;
  const [from, setFrom] = useState(startOfDay);
  const [to, setTo] = useState(endOfDay);
  const entries = useObserveLedgerFromPeriod(from, to);
  // const orders = useObserveOrdersFromPeriod(from, to);
  // const entriesSummary = useEntriesSummary(entries);
  // const ordersSummary = useOrdersSummary(orders);
  // tracking
  useTrackScreenView('Histórico de ganhos');
  // side effects
  // handlers
  const changeHandler = useCallback(
    (_from: Date, _to: Date) => {
      // console.log('changeHandler', _from, _to);
      if (!isEqual(from, _from)) {
        setFrom(_from);
      }
      if (!isEqual(to, _to)) {
        setTo(_to);
      }
    },
    [from, to]
  );
  // UI
  if (!entries) return <Loading title="Histórico de ganhos" />;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={{ padding: paddings.lg }}>
        <PeriodControl onChange={changeHandler} initialFrom={startOfDay} />
        {/* <ActivitySummary
          style={{ marginTop: paddings.lg }}
          title="Resumo de ganhos"
          // entriesSummary={entriesSummary}
          ordersSummary={ordersSummary}
        /> */}
        <LedgerEntriesList
          style={{ marginTop: paddings.lg }}
          emptyText="Não encontramos nenhum ganho neste período."
          entries={entries}
        />
      </DefaultView>
    </DefaultScrollView>
  );
}
