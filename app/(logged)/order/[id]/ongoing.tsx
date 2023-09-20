import { View } from 'react-native';

import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultMap } from '@/common/components/map/DefaultMap';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { HR } from '@/common/components/views/HR';
import { Loading } from '@/common/components/views/Loading';
import { DispatchingStateControl } from '@/common/screens/orders/dispatching-state/DispatchingStateControl';
import { useRouterAccordingOrderStatus } from '@/common/screens/orders/useRouterAccordingOrderStatus';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function OngoingOrderScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const order = useObserveOrder(orderId);
  const orderStatus = order?.status;
  console.log('orderId', orderId);
  console.log('orderStatus', orderStatus);
  // side effects
  useRouterAccordingOrderStatus(orderId);
  // UI
  if (!order) return <Loading title="Pedido em andamento" />;
  const origin = order.origin?.location;
  const destination = order.destination?.location;
  const polyline = order.route?.polyline;
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: `Pedido #${order.code}` }} />
      <DefaultMap origin={origin} destination={destination} polyline={polyline} />
      <View style={{ padding: paddings.lg, marginTop: paddings.lg }}>
        {/* header */}
        <View style={{ flexDirection: 'row' }}>
          {/* consumer name */}
          <View>
            <DefaultText size="xs">Pedido de</DefaultText>
            <DefaultText size="md" color="black">
              {order.consumer.name}
            </DefaultText>
          </View>
          {/* controls */}
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row' }}>
            <DefaultButton title="Iniciar chat" variant="outline" onPress={() => null} />
            <DefaultButton
              style={{ marginLeft: paddings.sm }}
              title="Ajuda"
              variant="destructive"
              onPress={() => null}
            />
          </View>
        </View>
        <HR style={{ marginTop: paddings.lg }} />
        {/* address */}
        {/* control */}
        <DispatchingStateControl order={order} key={order.dispatchingState} />
      </View>
    </DefaultView>
  );
}