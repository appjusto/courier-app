import { getOrderStatusAsText } from '@/api/orders/status/getOrderStatusAsText';
import { useObserveOngoingOrders } from '@/api/orders/useObserveOngoingOrders';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import paddings from '@/common/styles/paddings';
import { router } from 'expo-router';
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
      {orders.map((order) => (
        <Pressable
          key={order.id}
          style={{ marginBottom: paddings.lg }}
          onPress={() => {
            router.push({ pathname: '/(logged)/order/[id]/ongoing', params: { id: order.id } });
          }}
        >
          <DefaultCard
            variant="dark"
            icon={<DefaultCardIcon iconName="helmet" variant="dark" />}
            title={`#${order.code} Pedido ${getOrderStatusAsText(order.status)}`}
            subtitle="Aguardando..."
          />
        </Pressable>
      ))}
    </View>
  );
};
