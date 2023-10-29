import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { getOrderBaseRevenue } from '@/api/orders/revenue/getOrderBaseRevenue';
import { getOrderExtraRevenue } from '@/api/orders/revenue/getOrderExtraRevenue';
import { getOrderTipRevenue } from '@/api/orders/revenue/getOrderTip';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { formatCurrency } from '@/common/formatters/currency';
import { formatTimestamp } from '@/common/formatters/timestamp';
import { OrderStatusBadge } from '@/common/screens/deliveries/history/order-status-badge';
import { OrderDetailReview } from '@/common/screens/orders/review/order-detail-review';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function OrderDetailScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const order = useObserveOrder(orderId);
  // tracking
  useTrackScreenView('Detalhe do Pedido');
  // side effects
  // UI
  if (!order) return <Loading title="Detalhe da corrida" />;
  const { status, code } = order;
  const baseRevenue = getOrderBaseRevenue(order);
  const tipRevenue = getOrderTipRevenue(order);
  const extraRevenue = getOrderExtraRevenue(order);

  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: `Corrida #${code}` }} />
      <DefaultView style={{ padding: paddings.lg }}>
        <DefaultView>
          <View style={{ padding: paddings.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <DefaultText size="lg" color="black">
                {`Corrida #${code}`}
              </DefaultText>
              <OrderStatusBadge style={{ marginLeft: paddings.md }} status={status} />
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="sm" color="neutral800">
                Entrega
              </DefaultText>
              <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                {formatCurrency(baseRevenue)}
              </DefaultText>
            </View>
            {tipRevenue ? (
              <View style={{ marginTop: paddings.lg }}>
                <DefaultText size="sm" color="neutral800">
                  Caixinha
                </DefaultText>
                <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                  {formatCurrency(tipRevenue)}
                </DefaultText>
              </View>
            ) : null}
            {extraRevenue ? (
              <View style={{ marginTop: paddings.lg }}>
                <DefaultText size="sm" color="neutral800">
                  Extras
                </DefaultText>
                <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                  {formatCurrency(extraRevenue)}
                </DefaultText>
              </View>
            ) : null}
            {order.dispatchingTimestamps.confirmed ? (
              <View style={{ marginTop: paddings.lg }}>
                <DefaultText size="sm" color="neutral800">
                  Aceito em
                </DefaultText>
                <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                  {formatTimestamp(order.dispatchingTimestamps.confirmed)}
                </DefaultText>
              </View>
            ) : null}
            {order.timestamps.delivered ? (
              <View style={{ marginTop: paddings.lg }}>
                <DefaultText size="sm" color="neutral800">
                  Entregue em
                </DefaultText>
                <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                  {formatTimestamp(order.timestamps.delivered)}
                </DefaultText>
              </View>
            ) : null}
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="sm" color="neutral800">
                Retirada
              </DefaultText>
              <DefaultText
                size="md"
                style={{ marginTop: paddings['2xs'] }}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {`${order.business?.name ? `${order.business.name} - ` : ''}${order.origin?.address
                  .main}`}
              </DefaultText>
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="sm" color="neutral800">
                Entrega
              </DefaultText>
              <DefaultText
                size="md"
                style={{ marginTop: paddings['2xs'] }}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {order.destination?.address.main}
              </DefaultText>
            </View>
          </View>
          {/* review */}
          <OrderDetailReview style={{ marginTop: paddings.xl }} order={order} />
        </DefaultView>
      </DefaultView>
    </DefaultScrollView>
  );
}
