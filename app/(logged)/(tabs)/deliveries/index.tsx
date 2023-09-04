import { useContextApi } from '@/api/ApiContext';
import { useObserveOrdersOfLast24h } from '@/api/orders/useObserveOrdersOfLast24h';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { Loading } from '@/common/components/views/Loading';
import { DeliveryList } from '@/common/screens/deliveries/delivery-list';
import { AccountSummary } from '@/common/screens/deliveries/history/account/account-summary';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function DeliveriesIndex() {
  // context
  const api = useContextApi();
  const router = useRouter();
  // state
  const orders = useObserveOrdersOfLast24h();
  // UI
  if (!orders) return <Loading />;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <DefaultView style={{ ...screens.headless, padding: paddings.lg }}>
        <AccountSummary />
        <DeliveryList orders={orders} />
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
