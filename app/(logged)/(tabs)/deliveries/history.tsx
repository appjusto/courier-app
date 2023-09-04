import { useContextApi } from '@/api/ApiContext';
import { useObserveOrdersFromPeriod } from '@/api/orders/useObserveOrdersFromPeriod';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DeliveryList } from '@/common/screens/deliveries/delivery-list';
import { PeriodControl } from '@/common/screens/deliveries/history/period-control';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useCallback, useEffect, useState } from 'react';

export default function DeliveriesHistory() {
  // context
  const api = useContextApi();
  // state
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();
  const orders = useObserveOrdersFromPeriod(from, to);
  // handlers
  const changeHandler = useCallback((from: Date, to: Date) => {
    // console.log('onChange', from, to);
    setFrom(from);
    setTo(to);
  }, []);

  // side effects
  useEffect(() => {
    api
      .platform()
      .getServerTime()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [api]);
  // UI

  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={{ padding: paddings.lg }}>
        <PeriodControl onChange={changeHandler} />
        <DeliveryList style={{ marginTop: paddings.lg }} orders={orders ?? []} />
      </DefaultView>
    </DefaultScrollView>
  );
}
