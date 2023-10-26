import { getDispatchingStateAsText } from '@/api/orders/dispatching-state/getDispatchingStateAsText';
import { getDispatchingStateFocus } from '@/api/orders/dispatching-state/getDispatchingStateFocus';
import { getOrderStatusAsText } from '@/api/orders/status/getOrderStatusAsText';
import { useObserveOngoingOrders } from '@/api/orders/useObserveOngoingOrders';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { router } from 'expo-router';
import { CheckCircle2 } from 'lucide-react-native';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const OngoingOrdersCards = ({ style, ...props }: Props) => {
  // state
  const orders = useObserveOngoingOrders();
  // UI
  if (!orders?.length) return null;
  // console.log(request.orderId);
  return (
    <View style={[{}, style]} {...props}>
      {orders.map((order) => {
        const {
          id,
          code,
          type,
          status,
          dispatchingState,
          consumer,
          business,
          origin,
          destination,
        } = order;
        const dispatchingStateFocus = getDispatchingStateFocus(dispatchingState);
        const focusOnDestination = type === 'p2p' || dispatchingStateFocus === 'destination';
        const goingToAddress = focusOnDestination ? destination : origin;
        return (
          <Pressable
            key={order.id}
            style={{ marginBottom: paddings.sm }}
            onPress={() => {
              router.push({ pathname: '/(logged)/order/[id]/ongoing', params: { id } });
            }}
          >
            <View style={{ padding: paddings.lg, backgroundColor: colors.white, borderRadius: 8 }}>
              {/* status */}
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: paddings.sm,
                    paddingVertical: paddings.sm,
                    backgroundColor: colors.info100,
                    borderRadius: 8,
                  }}
                >
                  <CheckCircle2 color={colors.info500} size={16} />
                  <View style={{ flexDirection: 'row' }}>
                    <DefaultText style={{ marginLeft: paddings.xs }}>
                      {focusOnDestination
                        ? getDispatchingStateAsText(dispatchingState)
                        : 'Pedido ' + getOrderStatusAsText(status).toLocaleLowerCase()}
                    </DefaultText>
                  </View>
                </View>
              </View>
              {/* infos */}
              <View style={{ flexDirection: 'row' }}>
                {/* going to */}
                <View style={{ padding: paddings.sm, width: '50%' }}>
                  <DefaultText size="xs" color="neutral700">
                    {focusOnDestination ? 'Pedido de' : `#${code}`}
                  </DefaultText>
                  <DefaultText size="md" color="black" numberOfLines={1} adjustsFontSizeToFit>
                    {focusOnDestination ? consumer.name : `${business?.name}`}
                  </DefaultText>
                </View>
                <View style={{ padding: paddings.sm, width: '50%' }}>
                  <DefaultText size="xs" color="neutral700">
                    {focusOnDestination ? 'Entregar em' : 'Retirar em'}
                  </DefaultText>
                  <DefaultText size="md" color="black" numberOfLines={1} adjustsFontSizeToFit>
                    {`${goingToAddress?.address.main}`}
                  </DefaultText>
                </View>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
