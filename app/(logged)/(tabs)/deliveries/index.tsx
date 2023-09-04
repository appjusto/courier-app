import { useContextApi } from '@/api/ApiContext';
import { useObserveOrdersOfLast24h } from '@/api/orders/useObserveOrdersOfLast24h';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { Loading } from '@/common/components/views/Loading';
import { DeliveryList } from '@/common/screens/deliveries/delivery-list';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function DeliveriesIndex() {
  // context
  const api = useContextApi();
  const router = useRouter();
  // state
  const orders = useObserveOrdersOfLast24h();
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
  if (!orders) return <Loading />;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={{ ...screens.headless, padding: paddings.lg }}>
        <DeliveryList orders={orders} />
        <DefaultButton
          variant="outline"
          title="Ver histórico de corridas"
          onPress={() => router.push('/deliveries/history')}
        />
      </DefaultView>
    </DefaultScrollView>
  );
}
