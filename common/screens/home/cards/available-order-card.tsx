import { useObserveActiveRequests } from '@/api/couriers/requests/useObserveActiveRequests';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { useRouter } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const AvailableOrderCard = ({ style, ...props }: Props) => {
  // context
  const router = useRouter();
  // state
  const requests = useObserveActiveRequests();
  const request = requests?.find(() => true);
  // UI
  if (!request) return null;
  return (
    <View style={[{}, style]} {...props}>
      <Pressable
        onPress={() => router.push({ pathname: '/matching/[id]', params: { id: request.orderId } })}
      >
        <DefaultCard
          variant="dark"
          icon={<DefaultCardIcon iconName="helmet" variant="dark" />}
          title="Corrida disponível"
          subtitle="Clique aqui para visualizar a corrida"
        />
      </Pressable>
    </View>
  );
};
