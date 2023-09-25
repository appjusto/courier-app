import { View } from 'react-native';

import { useObserveOrderRequest } from '@/api/couriers/requests/useObserveOrderRequest';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultMap } from '@/common/components/map/DefaultMap';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { HR } from '@/common/components/views/HR';
import { Loading } from '@/common/components/views/Loading';
import { ConfirmDelivery } from '@/common/screens/orders/confirmation/ConfirmDelivery';
import { DispatchingStateControl } from '@/common/screens/orders/dispatching-state/DispatchingStateControl';
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
  const request = useObserveOrderRequest(orderId);
  const orderStatus = order?.status;
  const dispatchingState = order?.dispatchingState;
  // console.log('orderId', orderId);
  // console.log('orderStatus', orderStatus);
  // side effects
  useRouterAccordingOrderStatus(orderId, orderStatus, true);
  // UI
  if (!order) return <Loading title="Pedido em andamento" />;
  const origin = order.origin?.location;
  const destination = order.destination?.location;
  const polyline =
    dispatchingState === 'going-pickup' && request?.routePolylineToOrigin
      ? request.routePolylineToOrigin
      : order.route?.polyline;
  const navigationTo =
    dispatchingState === 'going-destination' || dispatchingState === 'arrived-destination'
      ? order.destination?.location
      : order.origin?.location;
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: `Pedido #${order.code}` }} />
      {dispatchingState !== 'arrived-destination' ? (
        <DefaultMap
          origin={origin}
          destination={destination}
          polyline={polyline}
          navigationTo={navigationTo}
        />
      ) : null}
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
            <DefaultText size="xs">Pedido de</DefaultText>
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
              onPress={() => null}
            />
          </View>
        </View>
        <HR style={{ marginTop: paddings.lg }} />
        {/* address */}
        {/* controls */}
        {/* <View style={{ flex: 1 }} /> */}
        <DispatchingStateControl order={order} key={order.dispatchingState} />
        <ConfirmDelivery order={order} />
      </View>
    </DefaultView>
  );
}
