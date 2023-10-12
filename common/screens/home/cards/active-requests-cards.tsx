import { useObserveActiveRequests } from '@/api/couriers/requests/useObserveActiveRequests';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { HelmetIcon } from '@/common/icons/helmet';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { useRouter } from 'expo-router';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const ActiveRequestsCards = ({ style, ...props }: Props) => {
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
            router.push({ pathname: '/(logged)/matching/[id]', params: { id: request.id } })
          }
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: paddings.lgg,
              backgroundColor: colors.info100,
              borderRadius: 8,
              borderColor: colors.info300,
              borderWidth: 1,
            }}
          >
            <HelmetIcon color={colors.info500} />
            <View style={{ marginLeft: paddings.lg, width: '75%' }}>
              <DefaultText size="md" color="black">
                Corrida disponível
              </DefaultText>
              <DefaultText
                size="xs"
                color="neutral800"
                style={{
                  flexWrap: 'wrap',
                  width: '95%',
                  marginTop: 2,
                }}
              >
                Clique aqui para visualizar a corrida
              </DefaultText>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};
