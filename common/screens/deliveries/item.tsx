import { getOrderRevenue } from '@/api/orders/revenue/getOrderRevenue';
import { getOrderTimestamp } from '@/api/orders/timestamp/getOrderTime';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import { formatTimestamp } from '@/common/formatters/timestamp';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { isLargeScreen } from '@/common/version/device';
import { Order, WithId } from '@appjusto/types';
import { ChevronRight, Package, Utensils } from 'lucide-react-native';
import { View, ViewProps } from 'react-native';
import { OrderStatusBadge } from './history/order-status-badge';

interface Props extends ViewProps {
  order: WithId<Order>;
}

export const DeliveryItem = ({ order, style, ...props }: Props) => {
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
      {/* info */}
      <View style={{ marginLeft: paddings.lg }}>
        {/* title */}
        <DefaultText size="sm">{`Corrida #${order.code}`}</DefaultText>
        {/* subtitle */}
        <View style={{ flexDirection: 'row' }}>
          <DefaultText style={{ marginTop: paddings.xs }} size="xs" color="neutral800">
            {formatTimestamp(getOrderTimestamp(order))}
          </DefaultText>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: paddings.xs }} />
      <OrderStatusBadge status={status} />
      <View style={{ flex: 1, marginTop: paddings.xs }} />
      <DefaultText size={isLargeScreen() ? 'md' : 'sm'} color="black">
        {formatCurrency(getOrderRevenue(order))}
      </DefaultText>
      <ChevronRight size={16} color={colors.neutral800} style={{ marginLeft: paddings.sm }} />
    </View>
  );
};
