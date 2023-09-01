import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Order, WithId } from '@appjusto/types';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { DeliveryItem } from './item';

interface Props {
  orders: WithId<Order>[];
}

export const DeliveryList = ({ orders }: Props) => {
  // context
  const router = useRouter();
  // UI
  return (
    <View style={{ padding: paddings.lg, ...borders.default, borderColor: colors.neutral100 }}>
      <View>
        {orders.map((order) => (
          <DeliveryItem key={order.id} order={order} />
        ))}
      </View>
      <DefaultButton
        variant="outline"
        title="Ver histórico de corridas"
        onPress={() => router.push('/deliveries/history')}
      ></DefaultButton>
    </View>
  );
};
