import { View } from 'react-native';

import { useContextApi } from '@/api/ApiContext';
import { useObserveOrderRequests } from '@/api/couriers/requests/useObserveOrderRequests';
import { useMapRoute } from '@/api/maps/useMapRoute';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { RoundedView } from '@/common/components/containers/RoundedView';
import { DefaultMap } from '@/common/components/map/DefaultMap';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { useToast } from '@/common/components/views/toast/ToastContext';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import { formatTimestamp } from '@/common/formatters/timestamp';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, useLocalSearchParams } from 'expo-router';
import { round } from 'lodash';
import { Zap } from 'lucide-react-native';
import { useEffect } from 'react';

export default function MatchingScreen() {
  // context
  const api = useContextApi();
  const { showToast } = useToast();
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const requests = useObserveOrderRequests(orderId);
  const request = requests?.find(() => true);
  const route = useMapRoute(request?.origin);
  console.log('orderId', orderId);
  console.log('request', request);
  // side effects
  useEffect(() => {
    if (!request) return;
    api
      .couriers()
      .viewOrderRequest(request.id)
      .catch((error: unknown) => {
        console.error(error);
      });
  }, [api, request]);
  // UI
  if (!request) return <Loading title="Nova corrida pra você!" />;
  const {
    origin,
    destination,
    readyAt,
    netValue,
    locationFee = 0,
    distance,
    distanceToOrigin,
  } = request;
  const routeDistanceToOrigin = route?.distance ?? distanceToOrigin;
  const totalDistance = (distance + routeDistanceToOrigin) / 1000;
  const fee = netValue + locationFee;
  const feePerKm = round(fee / 100 / totalDistance, 2);
  // handlers
  const matchOrder = () => {
    api
      .orders()
      .matchOrder(orderId, route?.distance)
      .catch((error: unknown) => {
        if (error instanceof Error) showToast(error.message, 'error');
      });
  };
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Nova corrida pra você!' }} />
      <DefaultMap origin={origin} destination={destination} route={route ?? undefined} />
      <View style={{ paddingVertical: paddings.xl, paddingHorizontal: paddings.lg }}>
        {/* tags */}
        <View style={{ flexDirection: 'row' }}>
          <RoundedView
            style={{
              marginBottom: paddings.lg,
              paddingHorizontal: paddings.sm,
              paddingVertical: paddings.xs,
              backgroundColor: colors.neutral50,
              borderColor: colors.neutral50,
            }}
          >
            <DefaultText color="black" size="xs">
              {readyAt ? `Pronto às ${formatTimestamp(readyAt, 'HH:mm')}` : 'Pronto para coleta'}
            </DefaultText>
          </RoundedView>
          {locationFee ? (
            <RoundedView
              style={{
                flexDirection: 'row',
                marginLeft: paddings.sm,
                backgroundColor: colors.primary300,
              }}
            >
              <Zap size={16} color={colors.black} />
              <DefaultText style={{ marginLeft: paddings.xs }} color="black" size="xs">
                Alta demanda
              </DefaultText>
            </RoundedView>
          ) : null}
        </View>
        {/* values */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <DefaultText size="xs" color="neutral800">
              Valor da corrida
            </DefaultText>
            <DefaultText size="xl" color="black">
              {formatCurrency(fee)}
            </DefaultText>
          </View>
          <View>
            <DefaultText size="xs" color="neutral800">
              Distância total
            </DefaultText>
            <DefaultText size="xl" color={route ? 'black' : 'error300'}>
              {formatDistance(totalDistance)}
            </DefaultText>
          </View>
          <View>
            <DefaultText size="xs" color="neutral800">
              Valor por km
            </DefaultText>
            <DefaultText size="xl" color="black">
              {formatCurrency(feePerKm)}
            </DefaultText>
          </View>
        </View>
        {/* button */}
        <DefaultButton
          style={{ marginTop: paddings['2xl'] }}
          title="Aceitar corrida"
          onPress={matchOrder}
        />
      </View>
    </DefaultView>
  );
}
