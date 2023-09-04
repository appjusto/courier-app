import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Order, WithId } from '@appjusto/types';
import { View, ViewProps } from 'react-native';
import { DeliveryItem } from './item';

interface Props extends ViewProps {
  orders: WithId<Order>[];
}

export const DeliveryList = ({ orders, style, ...props }: Props) => {
  // UI
  if (!orders.length) return null;
  return (
    <View
      style={[{ padding: paddings.lg, ...borders.default, borderColor: colors.neutral100 }, style]}
      {...props}
    >
      <View>
        {orders.map((order) => (
          <DeliveryItem key={order.id} order={order} />
        ))}
      </View>
    </View>
  );
};
