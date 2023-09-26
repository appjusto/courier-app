import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Order, WithId } from '@appjusto/types';
import { router } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';
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
          <Pressable
            key={order.id}
            onPress={() =>
              router.push({ pathname: '/(logged)/order/[id]/delivered', params: { id: order.id } })
            }
          >
            <DeliveryItem order={order} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};
