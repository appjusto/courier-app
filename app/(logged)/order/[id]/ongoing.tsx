import { Pressable, View } from 'react-native';

import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { unreadMessagesIds } from '@/api/chats/unreadMessagesIds';
import { useObserveChat } from '@/api/chats/useObserveOrderChat';
import { getDispatchingStateFocus } from '@/api/orders/dispatching-state/getDispatchingStateFocus';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { CircledView } from '@/common/components/containers/CircledView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { HR } from '@/common/components/views/HR';
import { Loading } from '@/common/components/views/Loading';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { openChat } from '@/common/screens/orders/chat/openChat';
import { ConfirmDelivery } from '@/common/screens/orders/confirmation/confirm-delivery';
import { DispatchingStateControl } from '@/common/screens/orders/dispatching-state/DispatchingStateControl';
import { OrderMap } from '@/common/screens/orders/map/order-map';
import { CurrentOrderPlace } from '@/common/screens/orders/place/CurrentOrderPlace';
import { RestaurantProofCard } from '@/common/screens/orders/proof/restaurant-proof-card';
import { RestaurantOrderProofModal } from '@/common/screens/orders/restaurant-order-proof-modal';
import { useRouterAccordingOrderStatus } from '@/common/screens/orders/useRouterAccordingOrderStatus';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';
import { useEffect, useState } from 'react';

export default function OngoingOrderScreen() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const order = useObserveOrder(orderId);
  const orderType = order?.type;
  const orderStatus = order?.status;
  const dispatchingState = order?.dispatchingState;
  const dispatchByCourier = order?.tags?.includes('dispatch-by-courier') === true;
  const showConsumerName =
    !dispatchByCourier || getDispatchingStateFocus(dispatchingState) === 'destination';
  const [proofModalShown, setProofModalShown] = useState(false);
  const chatWithConsumer = useObserveChat(orderId, order?.consumer.id);
  const chatWithBusiness = useObserveChat(orderId, order?.business?.id);
  const hasUnreadMessagesFromConsumer = Boolean(
    unreadMessagesIds(chatWithConsumer, order?.consumer.id, 'consumer')?.length
  );
  const hasUnreadMessagesFromBusiness = Boolean(
    unreadMessagesIds(chatWithBusiness, order?.business?.id, 'business')?.length
  );
  const hasUnreadMessages = hasUnreadMessagesFromConsumer || hasUnreadMessagesFromBusiness;
  // tracking
  useTrackScreenView('Pedido em andamento');
  // side effects
  const view = useRouterAccordingOrderStatus(orderId, orderStatus, true);
  useEffect(() => {
    if (orderType === 'food' && dispatchingState === 'arrived-pickup') {
      setProofModalShown(true);
    }
  }, [orderType, dispatchingState]);
  // handlers
  const advanceHandler = () => {
    api
      .orders()
      .updateOrder(orderId, { dispatchingState: 'going-destination' })
      .then(null)
      .catch((error: unknown) => {
        if (error instanceof Error) {
          showToast(error.message, 'error');
        }
      });
  };
  // UI
  if (!order) return <Loading title="Pedido em andamento" />;
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: `Pedido #${order.code}` }} />
      <RestaurantOrderProofModal
        visible={proofModalShown}
        order={order}
        onDismiss={() => {
          setProofModalShown(false);
        }}
        onConfirm={() => {
          setProofModalShown(false);
          if (dispatchByCourier) advanceHandler();
        }}
      />
      {view}
      <OrderMap order={order} />
      <Pressable onPress={() => setProofModalShown(true)}>
        <RestaurantProofCard order={order} />
      </Pressable>
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
            <DefaultText size="xs">{`Pedido #${order.code}${
              showConsumerName ? ' de' : ''
            }`}</DefaultText>
            {showConsumerName ? (
              <DefaultText size="md" color="black">
                {order.consumer.name}
              </DefaultText>
            ) : null}
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
              onPress={() =>
                openChat(order, hasUnreadMessagesFromConsumer, hasUnreadMessagesFromBusiness)
              }
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
