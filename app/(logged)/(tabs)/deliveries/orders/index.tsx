import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveOrdersFromPeriod } from '@/api/orders/useObserveOrdersFromPeriod';
import { useOrdersSummary } from '@/api/orders/useOrdersSummary';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { Loading } from '@/common/components/views/Loading';
import { getEndOfDay, getStartOfDay } from '@/common/date';
import { DeliveryList } from '@/common/screens/deliveries/delivery-list';
import { PeriodControl } from '@/common/screens/deliveries/history/period-control';
import { ActivitySummary } from '@/common/screens/home/activity/activity-summary';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { isEqual } from 'lodash';
import { useCallback, useRef, useState } from 'react';

export default function DeliveriesHistory() {
  // state
  const startOfDay = useRef(getStartOfDay())?.current;
  const endOfDay = useRef(getEndOfDay())?.current;
  const [from, setFrom] = useState(startOfDay);
  const [to, setTo] = useState(endOfDay);
  const orders = useObserveOrdersFromPeriod(from, to);
  const ordersSummary = useOrdersSummary(orders);
  // tracking
  useTrackScreenView('Histórico de corridas');
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
  if (!orders) return <Loading title="Histórico de corridas" />;
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={{ padding: paddings.lg }}>
        <PeriodControl onChange={changeHandler} />
        <ActivitySummary
          style={{ marginTop: paddings.lg }}
          title="Resumo de corridas"
          // entriesSummary={entriesSummary}
          ordersSummary={ordersSummary}
        />
        <DeliveryList
          style={{ marginTop: paddings.lg }}
          emptyText="Não encontramos nenhuma corrida neste período."
          orders={orders}
        />
      </DefaultView>
    </DefaultScrollView>
  );
}
