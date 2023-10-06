import { View } from 'react-native';

import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { unreadMessages } from '@/api/chats/unreadMessages';
import { useObserveChat } from '@/api/chats/useObserveOrderChat';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { HR } from '@/common/components/views/HR';
import { Loading } from '@/common/components/views/Loading';
import { ConfirmDelivery } from '@/common/screens/orders/confirmation/ConfirmDelivery';
import { DispatchingStateControl } from '@/common/screens/orders/dispatching-state/DispatchingStateControl';
import { OrderMap } from '@/common/screens/orders/map/order-map';
import { CurrentOrderPlace } from '@/common/screens/orders/place/CurrentOrderPlace';
import { useRouterAccordingOrderStatus } from '@/common/screens/orders/useRouterAccordingOrderStatus';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router, useLocalSearchParams } from 'expo-router';

export default function OngoingOrderScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const order = useObserveOrder(orderId);
  const chat = useObserveChat(orderId);
  const consumerUnreadMessages = unreadMessages(chat, order?.consumer.id);
  const businessUnreadMessages = unreadMessages(chat, order?.business?.id);
  const orderStatus = order?.status;
  const dispatchingState = order?.dispatchingState;
  // console.log('orderId', orderId);
  // console.log('orderStatus', orderStatus);
  // tracking
  useTrackScreenView('Pedido em andamento');
  // side effects
  useRouterAccordingOrderStatus(orderId, orderStatus, true);
  // UI
  if (!order) return <Loading title="Pedido em andamento" />;
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: `Pedido #${order.code}` }} />
      <OrderMap order={order} />
      {/* ongoing alerts: recebe identificador para cada tipo e */}
      <View style={{}}></View>
      <View
        style={{
          flex: dispatchingState === 'arrived-destination' ? 1 : undefined,
          marginTop: paddings.lg,
        }}
      >
        {/* header */}
        <View
          style={{
            padding: paddings.lg,
            flexDirection: 'row',
          }}
        >
          {/* consumer name */}
          <View>
            <DefaultText size="xs">{`Pedido #${order.code} de`}</DefaultText>
            <DefaultText size="md" color="black">
              {order.consumer.name}
            </DefaultText>
          </View>
          {/* controls */}
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row' }}>
            <DefaultButton
              title="Iniciar chat"
              variant="outline"
              onPress={() => {
                router.push({
                  pathname: '/(logged)/order/[id]/chat/[counterpart]',
                  params: { id: orderId, counterpart: order.consumer.id },
                });
              }}
            />
            <DefaultButton
              style={{ marginLeft: paddings.sm }}
              title="Ajuda"
              variant="destructive"
              onPress={() => {
                router.push({
                  pathname: '/(logged)/order/[id]/support',
                  params: { id: orderId },
                });
              }}
            />
          </View>
        </View>
        <HR style={{ marginTop: paddings.lg }} />
        {/* address */}
        <CurrentOrderPlace order={order} />
        {/* controls */}
        {/* <View style={{ flex: 1 }} /> */}
        <DispatchingStateControl order={order} key={order.dispatchingState} />
        <ConfirmDelivery order={order} />
      </View>
    </DefaultView>
  );
}
