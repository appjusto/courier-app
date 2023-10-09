import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveRequest } from '@/api/couriers/requests/useObserveRequest';
import { useMapRoute } from '@/api/maps/useMapRoute';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { useContextProfile } from '@/common/auth/AuthContext';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { ConfirmButton } from '@/common/components/buttons/swipeable/ConfirmButton';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { RoundedView } from '@/common/components/containers/RoundedView';
import { DefaultMap } from '@/common/components/map/DefaultMap';
import { ErrorModal } from '@/common/components/modals/error/error-modal';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import { formatDate } from '@/common/formatters/timestamp';
import { stopOrderRequestSound } from '@/common/notifications/sound';
import { RejectOrderModal } from '@/common/screens/matching/reject-order-modal';
import { useRouterAccordingOrderStatus } from '@/common/screens/orders/useRouterAccordingOrderStatus';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Issue } from '@appjusto/types';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { round } from 'lodash';
import { Zap } from 'lucide-react-native';
import { Skeleton } from 'moti/skeleton';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

export default function MatchingScreen() {
  // context
  const profile = useContextProfile();
  const api = useContextApi();
  const showToast = useShowToast();
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const requestId = params.id;
  // state
  const request = useObserveRequest(requestId);
  const situation = request?.situation;
  const route = useMapRoute(request?.origin, profile?.mode);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expiredModalShown, setExpiredModalShown] = useState(false);
  const [rejectModalShown, setRejectModalShown] = useState(false);
  const order = useObserveOrder(request?.orderId, confirmed);
  console.log('requestId', requestId);
  // console.log('orderId', orderId);
  // console.log('request', request);
  // console.log('route', route);
  // tracking
  useTrackScreenView('Matching');
  // side effects
  useRouterAccordingOrderStatus(request?.orderId, order?.status);
  // update request to viewed
  // stop sound and update request as viewed
  useEffect(() => {
    if (!requestId) return;
    stopOrderRequestSound().then(null).catch(null);
    api.couriers().viewOrderRequest(requestId).catch(console.error);
  }, [api, requestId]);
  // update route polyline
  useEffect(() => {
    if (!route) return;
    api.couriers().updateRoutePolylineToOrigin(requestId, route.polyline).catch(console.error);
  }, [route, requestId, api]);
  // open modal if request expired
  useEffect(() => {
    if (!situation) return;
    if (situation === 'expired') {
      setExpiredModalShown(true);
    }
  }, [situation]);
  // handlers
  const matchOrder = useCallback(() => {
    if (!request?.orderId) return;
    trackEvent('Corrida aceita');
    api
      .orders()
      .matchOrder(request.orderId, route?.distance)
      .then(() => {
        setConfirmed(true);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) showToast(error.message, 'error');
      });
  }, [api, request?.orderId, route?.distance, showToast]);
  const rejectOrder = (issue: Issue, comment: string) => {
    if (!request?.orderId) return;
    trackEvent('Corrida recusada');
    setRejectModalShown(false);
    setLoading(true);
    api
      .orders()
      .rejectOrder(request.orderId, issue, comment)
      .then(() => {
        setLoading(false);
        router.back();
      })
      .catch((error: unknown) => {
        setLoading(false);
        if (error instanceof Error) showToast(error.message, 'error');
      });
  };
  console.log(requestId);
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
        visible={expiredModalShown}
        onDismiss={() => {
          setExpiredModalShown(false);
          router.back();
        }}
      />
      <RejectOrderModal
        visible={rejectModalShown}
        onConfirm={rejectOrder}
        onDismiss={() => setRejectModalShown(false)}
      />
      <View style={{ paddingVertical: paddings.xl, paddingHorizontal: paddings.lg }}>
        {/* tags */}
        <View style={{ flexDirection: 'row', marginBottom: paddings.lg }}>
          <RoundedView
            style={{
              paddingHorizontal: paddings.sm,
              paddingVertical: paddings.xs,
              backgroundColor: colors.neutral50,
              borderWidth: 0,
            }}
          >
            <DefaultText color="black" size="xs">
              {readyAt ? `Pronto às ${formatDate(readyAt, 'HH:mm')}` : 'Pronto para coleta'}
            </DefaultText>
          </RoundedView>
          {locationFee ? (
            <RoundedView
              style={{
                flexDirection: 'row',
                marginLeft: paddings.sm,
                paddingHorizontal: paddings.sm,
                paddingVertical: paddings.xs,
                backgroundColor: colors.primary300,
                borderWidth: 0,
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
        <View
          style={{ flexDirection: 'row', marginTop: paddings.lg, justifyContent: 'space-between' }}
        >
          <Skeleton.Group show={!route}>
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
              <Skeleton colors={[colors.neutral50, colors.neutral100]} width={90}>
                <DefaultText size="xl" color={route ? 'black' : 'error300'}>
                  {formatDistance(totalDistance)}
                </DefaultText>
              </Skeleton>
            </View>
            <View>
              <DefaultText size="xs" color="neutral800">
                Valor por KM
              </DefaultText>
              <Skeleton colors={[colors.neutral50, colors.neutral100]} width={90}>
                <DefaultText size="xl" color="black">
                  {formatCurrency(feePerKm)}
                </DefaultText>
              </Skeleton>
            </View>
          </Skeleton.Group>
        </View>
        {/* button */}
        <ConfirmButton
          style={{ marginTop: paddings['2xl'] }}
          text="Aceitar"
          trackText="Arraste para aceitar"
          onConfirm={matchOrder}
        />
        <LinkButton
          style={{ marginTop: paddings.lg, alignSelf: 'center' }}
          variant="ghost"
          onPress={() => {
            trackEvent('Passar corrida');
            setRejectModalShown(true);
          }}
        >
          Passar corrida
        </LinkButton>
      </View>
    </DefaultView>
  );
}
