import { useContextApi } from '@/api/ApiContext';
import { useObserveOrdersFromPeriod } from '@/api/orders/useObserveOrdersFromPeriod';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DeliveryList } from '@/common/screens/deliveries/delivery-list';
import { PeriodControl } from '@/common/screens/deliveries/history/period-control';
import screens from '@/common/styles/screens';
import { useEffect, useState } from 'react';

export default function DeliveriesHistory() {
  // context
  const api = useContextApi();
  // state
  const [from, setFrom] = useState<Date>(new Date());
  const [to, setTo] = useState<Date>(new Date());
  const orders = useObserveOrdersFromPeriod(from, to);
  // side effects
  useEffect(() => {
    api
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
      <DefaultView style={screens.headless}>
        <PeriodControl
          onChange={(from, to) => {
            console.log('onChange', from, to);
            setFrom(from);
            setTo(to);
          }}
        />
        <DeliveryList orders={orders ?? []} />
      </DefaultView>
    </DefaultScrollView>
  );
}
