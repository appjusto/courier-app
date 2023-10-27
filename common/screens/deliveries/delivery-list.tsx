import { EmptyIcon } from '@/common/components/modals/error/icon';
import { DefaultText } from '@/common/components/texts/DefaultText';
import paddings from '@/common/styles/paddings';
import { Order, WithId } from '@appjusto/types';
import { router } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';
import { DeliveryItem } from './item';

interface Props extends ViewProps {
  title?: string;
  emptyText?: string;
  orders: WithId<Order>[];
}

export const DeliveryList = ({ orders, title, emptyText, style, ...props }: Props) => {
  return (
    <View style={[{ padding: paddings.lg }, style]} {...props}>
      {title ? (
        <DefaultText style={{ marginBottom: paddings.lg }} size="lg">
          {title}
        </DefaultText>
      ) : null}
      <View>
        {orders.length ? (
          orders.map((order) => (
            <Pressable
              key={order.id}
              onPress={() =>
                router.push({
                  pathname: '/(logged)/order/[id]/detail',
                  params: { id: order.id },
                })
              }
            >
              <DeliveryItem order={order} />
            </Pressable>
          ))
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <EmptyIcon />
            {emptyText ? (
              <DefaultText
                style={{ marginTop: paddings.lg, textAlign: 'center' }}
                color="neutral800"
              >
                {emptyText}
              </DefaultText>
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
};
