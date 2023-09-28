import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function OngoingOrderScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const order = useObserveOrder(orderId);
  // side effects
  // UI
  if (!order) return <Loading title="Pedido entregue!" />;
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: `Pedido #${order.code}` }} />
      <FeedbackHeader title="Corrida finalizada!" text={['Valor recebido']} variant="success">
        <DefaultText style={{ marginTop: paddings.xs }} size="lg">
          R$ 10,50
        </DefaultText>
      </FeedbackHeader>
    </DefaultView>
  );
}
