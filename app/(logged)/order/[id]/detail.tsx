import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { getOrderBaseRevenue } from '@/api/orders/revenue/getOrderBaseRevenue';
import { getOrderExtraRevenue } from '@/api/orders/revenue/getOrderExtraRevenue';
import { getOrderTipRevenue } from '@/api/orders/revenue/getOrderTip';
import { useObserveOrderReview } from '@/api/orders/reviews/useObserveOrderReview';
import { getOrderTimestamp } from '@/api/orders/timestamp/getOrderTime';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { formatCurrency } from '@/common/formatters/currency';
import { formatTimestamp } from '@/common/formatters/timestamp';
import { OrderStatusBadge } from '@/common/screens/deliveries/history/order-status-badge';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
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
  const review = useObserveOrderReview(orderId);
  // tracking
  useTrackScreenView('Detalhe do Pedido');
  // side effects
  // UI
  if (!order) return <Loading title="Detalhe da corrida" />;
  const { status, code, type, business, tip } = order;
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
                {business?.name ?? 'Entrega rápida'}
              </DefaultText>
              <OrderStatusBadge style={{ marginLeft: paddings.md }} status={status} />
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="sm" color="neutral800">
                Corrida
              </DefaultText>
              <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                {formatCurrency(baseRevenue)}
              </DefaultText>
            </View>
            {tipRevenue ? (
              <View style={{ marginTop: paddings.lg }}>
                <DefaultText size="sm" color="neutral800">
                  Total
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
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="sm" color="neutral800">
                Realizada em
              </DefaultText>
              <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                {formatTimestamp(getOrderTimestamp(order))}
              </DefaultText>
            </View>
            <View style={{ marginTop: paddings.lg }}>
              <DefaultText size="sm" color="neutral800">
                Código da corrida
              </DefaultText>
              <DefaultText size="md" style={{ marginTop: paddings['2xs'] }}>
                {`#${code}`}
              </DefaultText>
            </View>
          </View>
          <View style={{ padding: paddings.lg }}>
            <View
              style={{
                padding: paddings.lg,
                ...borders.default,
                borderColor: colors.neutral100,
              }}
            ></View>
          </View>
        </DefaultView>
      </DefaultView>
    </DefaultScrollView>
  );
}
