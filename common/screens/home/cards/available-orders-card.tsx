import { useObserveActiveRequests } from '@/api/couriers/requests/useObserveActiveRequests';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import paddings from '@/common/styles/paddings';
import { useRouter } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const AvailableOrdersCards = ({ style, ...props }: Props) => {
  // context
  const router = useRouter();
  // state
  const requests = useObserveActiveRequests();
  // UI
  if (!requests?.length) return null;
  // console.log(request.orderId);
  return (
    <View style={[{}, style]} {...props}>
      {requests.map((request) => (
        <Pressable
          key={request.id}
          style={{ marginBottom: paddings.lg }}
          onPress={() =>
            router.push({ pathname: '/matching/[id]', params: { id: request.orderId } })
          }
        >
          <DefaultCard
            variant="dark"
            icon={<DefaultCardIcon iconName="helmet" variant="dark" />}
            title="Corrida disponível"
            subtitle="Clique aqui para visualizar a corrida"
          />
        </Pressable>
      ))}
    </View>
  );
};
