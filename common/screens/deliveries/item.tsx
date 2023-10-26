import { getOrderRevenue } from '@/api/orders/revenue/getOrderRevenue';
import { getOrderTimestamp } from '@/api/orders/timestamp/getOrderTime';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatTimestamp } from '@/common/formatters/timestamp';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Order, WithId } from '@appjusto/types';
import { ChevronRight, Package, Utensils } from 'lucide-react-native';
import { View, ViewProps } from 'react-native';
import { OrderStatusBadge } from './history/order-status-badge';

interface Props extends ViewProps {
  order: WithId<Order>;
}

export const DeliveryItem = ({ order, style, ...props }: Props) => {
  const subtitle = `${formatCurrency(getOrderRevenue(order))} • ${formatTimestamp(
    getOrderTimestamp(order)
  )}`;
  const { status } = order;
  // UI
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: paddings.md,
          paddingHorizontal: paddings.xs,
        },
        style,
      ]}
      {...props}
    >
      {/* icon */}
      {order.type === 'food' ? (
        <Utensils size={20} color={colors.neutral800} />
      ) : (
        <Package size={20} color={colors.neutral800} />
      )}
      <View style={{ marginLeft: paddings.lg }}>
        {/* title */}
        <View style={{ flexDirection: 'row' }}>
          <DefaultText>
            {order.type === 'food' ? order.business?.name : 'Entrega rápida'}
          </DefaultText>
        </View>
        {/* subtitle */}
        <DefaultText style={{ marginTop: paddings.xs }} size="xs" color="neutral800">
          {subtitle}
        </DefaultText>
        {/* order code */}
        <DefaultText style={{ marginTop: paddings.xs }} size="xs" color="neutral800">
          {`#${order.code}`}
        </DefaultText>
      </View>
      <View style={{ flex: 1 }} />
      <OrderStatusBadge status={status} style={{ marginRight: paddings.sm }} />
      <ChevronRight size={16} color={colors.neutral800} style={{ marginLeft: paddings.sm }} />
    </View>
  );
};
