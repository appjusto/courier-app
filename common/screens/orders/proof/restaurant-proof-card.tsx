import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import paddings from '@/common/styles/paddings';
import { Order } from '@appjusto/types';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  order: Order;
}

export const RestaurantProofCard = ({ order, style, ...props }: Props) => {
  const { type, status, dispatchingState } = order;
  if (type !== 'food') return null;
  if (dispatchingState !== 'arrived-pickup') return null;
  if (status === 'dispatching') return null;
  return (
    <View
      style={[{ position: 'absolute', padding: paddings.lg, bottom: 0, left: 0, right: 0 }, style]}
      {...props}
    >
      <DefaultCard
        icon={<DefaultCardIcon iconName="package" />}
        title="Liberação do pedido"
        subtitle="Clique aqui para mostrar comprovante de retirada"
      />
    </View>
  );
};
