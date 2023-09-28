import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { Loading } from '@/common/components/views/Loading';
import { useRouterAccordingOrderStatus } from '@/common/screens/orders/useRouterAccordingOrderStatus';
import { useLocalSearchParams } from 'expo-router';

export default function OrderScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const order = useObserveOrder(orderId);
  const orderStatus = order?.status;
  console.log('OrderScreen orderId', orderId);
  console.log('OrderScreen orderStatus', orderStatus);
  // side effects
  useRouterAccordingOrderStatus(orderId, orderStatus);
  // UI
  if (!order) return <Loading title="Pedido em andamento" />;
  return null;
  // return (
  //   <View style={{ ...screens.default, justifyContent: 'center', alignItems: 'center' }}>
  //     <DefaultButton
  //       title="Andamento"
  //       onPress={() =>
  //         router.replace({ pathname: '/(logged)/order/[id]/ongoing', params: { id: orderId } })
  //       }
  //     />
  //   </View>
  // );
}
