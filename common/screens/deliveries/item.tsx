import { getOrderRevenue } from '@/api/orders/revenue/getOrderRevenue';
import { getOrderTime } from '@/api/orders/timestamp/getOrderTime';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { formatCurrency } from '@/common/formatters/currency';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Dayjs } from '@appjusto/dates';
import { Order, WithId } from '@appjusto/types';
import { Bike, ChevronRight, Utensils } from 'lucide-react-native';
import { View, ViewProps } from 'react-native';
import { OrderStatusBadge } from './history/order-status-badge';

interface Props extends ViewProps {
  order: WithId<Order>;
}

export const DeliveryItem = ({ order, style, ...props }: Props) => {
  const time = Dayjs(getOrderTime(order)).format('DD/MM • HH:mm');
  const { status } = order;
  // UI
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: paddings.md,
          paddingHorizontal: paddings.lg,
        },
        style,
      ]}
      {...props}
    >
      {/* icon */}
      {order.type === 'food' ? (
        <Utensils size={20} color={colors.neutral800} />
      ) : (
        <Bike size={20} color={colors.neutral800} />
      )}
      <View style={{ marginLeft: paddings.lg }}>
        <DefaultText>{order.type === 'food' ? order.business?.name : 'Entrega rápida'}</DefaultText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: paddings.xs }}>
          <DefaultText size="xs" color="neutral800">
            {time}
          </DefaultText>
          <OrderStatusBadge status={status} style={{ marginLeft: paddings.lg }} />
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <DefaultText color="black">{formatCurrency(getOrderRevenue(order))}</DefaultText>
      <ChevronRight size={16} color={colors.neutral800} style={{ marginLeft: paddings.sm }} />
    </View>
  );
};
