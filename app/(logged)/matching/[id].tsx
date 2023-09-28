import { useContextApi } from '@/api/ApiContext';
import { useObserveOrderRequest } from '@/api/couriers/requests/useObserveOrderRequest';
import { useMapRoute } from '@/api/maps/useMapRoute';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { ConfirmButton } from '@/common/components/buttons/swipeable/ConfirmButton';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { RoundedView } from '@/common/components/containers/RoundedView';
import { DefaultMap } from '@/common/components/map/DefaultMap';
import { ErrorModal } from '@/common/components/modals/error/error-modal';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { useToast } from '@/common/components/views/toast/ToastContext';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import { formatTimestamp } from '@/common/formatters/timestamp';
import { useRouterAccordingOrderStatus } from '@/common/screens/orders/useRouterAccordingOrderStatus';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { round } from 'lodash';
import { Zap } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

export default function MatchingScreen() {
  // context
  const api = useContextApi();
  const { showToast } = useToast();
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const requestId = params.id;
  // state
  const request = useObserveOrderRequest(requestId);
  const situation = request?.situation;
  const route = useMapRoute(request?.origin);
  const [confirmed, setConfirmed] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const order = useObserveOrder(request?.orderId, confirmed);
  console.log('requestId', requestId);
  // console.log('orderId', orderId);
  console.log('request', request);
  // console.log('route', route);
  // side effects
  useRouterAccordingOrderStatus(request?.orderId, order?.status);
  useEffect(() => {
    if (!requestId) return;
    api
      .couriers()
      .viewOrderRequest(requestId)
      .catch((error: unknown) => {
        console.error(error);
      });
  }, [api, requestId]);
  useEffect(() => {
    if (!situation) return;
    if (situation === 'expired') {
      setModalShown(true);
    }
  }, [situation]);
  // handlers
  const matchOrder = useCallback(() => {
    if (!request?.orderId) return;
    api
      .orders()
      .matchOrder(request.orderId, route?.distance)
      .then(() => setConfirmed(true))
      .catch((error: unknown) => {
        if (error instanceof Error) showToast(error.message, 'error');
      });
  }, [api, request?.orderId, route?.distance, showToast]);
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
  const totalDistance = distance + routeDistanceToOrigin;
  const fee = netValue + locationFee;
  const feePerKm = round(fee / (totalDistance / 1000), 2);
  return (
    <DefaultView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Nova corrida pra você!' }} />
      <DefaultMap origin={origin} destination={destination} polyline={route?.polyline} />
      <ErrorModal
        title="Ooops! :("
        text="Este pedido já foi aceito por outro entregador"
        visible={modalShown}
        onDismiss={() => {
          router.back();
        }}
      />
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
        <ConfirmButton
          style={{ marginTop: paddings.lg }}
          text="Aceitar"
          trackText="Arraste para aceitar"
          onConfirm={matchOrder}
        />
        <DefaultButton
          style={{ marginTop: paddings.lg }}
          variant="outline"
          title="Passar"
          onPress={() => null}
        />
      </View>
    </DefaultView>
  );
}
