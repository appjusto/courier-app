import { View } from 'react-native';

import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { CircledView } from '@/common/components/containers/CircledView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { HR } from '@/common/components/views/HR';
import { Loading } from '@/common/components/views/Loading';
import { useChatHandler } from '@/common/screens/orders/chat/useChatHandler';
import { ConfirmDelivery } from '@/common/screens/orders/confirmation/ConfirmDelivery';
import { DispatchingStateControl } from '@/common/screens/orders/dispatching-state/DispatchingStateControl';
import { OrderMap } from '@/common/screens/orders/map/order-map';
import { CurrentOrderPlace } from '@/common/screens/orders/place/CurrentOrderPlace';
import { useRouterAccordingOrderStatus } from '@/common/screens/orders/useRouterAccordingOrderStatus';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';

export default function OngoingOrderScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const order = useObserveOrder(orderId);
  const orderStatus = order?.status;
  const dispatchingState = order?.dispatchingState;
  const { hasUnreadMessages, openChat } = useChatHandler(order);
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
              title="Chat"
              buttonStyle={{
                borderColor: hasUnreadMessages ? colors.primary100 : undefined,
                backgroundColor: hasUnreadMessages ? colors.primary100 : colors.white,
              }}
              variant="outline"
              rightView={
                <View style={{ marginLeft: paddings.sm }}>
                  <MessageCircle size={16} color="black" />
                  {hasUnreadMessages ? (
                    <CircledView
                      style={{
                        position: 'absolute',
                        right: 0,
                        backgroundColor: colors.primary500,
                        borderColor: colors.primary500,
                      }}
                      size={8}
                    />
                  ) : null}
                </View>
              }
              onPress={openChat}
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
