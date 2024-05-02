import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveRequest } from '@/api/couriers/requests/useObserveRequest';
import { useObserveFleet } from '@/api/fleets/useObserveFleet';
import { getPartialAddress } from '@/api/maps/getPartialAddress';
import { useMapRoute } from '@/api/maps/useMapRoute';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { useContextProfile } from '@/common/auth/AuthContext';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { ConfirmButton } from '@/common/components/buttons/swipeable/ConfirmButton';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { RoundedView } from '@/common/components/containers/RoundedView';
import { DefaultMap } from '@/common/components/map/DefaultMap';
import { DestinationMarker } from '@/common/components/map/markers/destination-marker';
import { PackageMarker } from '@/common/components/map/markers/package-marker';
import { ErrorModal } from '@/common/components/modals/error/error-modal';
import { SelectIssueModal } from '@/common/components/modals/issues/select-issue-modal';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { RoundedText } from '@/common/components/texts/RoundedText';
import { Loading } from '@/common/components/views/Loading';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { formatCurrency } from '@/common/formatters/currency';
import { formatDistance } from '@/common/formatters/distance';
import { formatDate } from '@/common/formatters/timestamp';
import { stopOrderRequestSound } from '@/common/notifications/sound';
import { useDismissNotifications } from '@/common/notifications/useDismissNotifications';
import { useRouterAccordingOrderStatus } from '@/common/screens/orders/useRouterAccordingOrderStatus';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Issue } from '@appjusto/types';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { round } from 'lodash';
import { Package, Utensils, Zap } from 'lucide-react-native';
import { Skeleton } from 'moti/skeleton';
import { nanoid } from 'nanoid/non-secure';
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
  const [matchKey, setMatchKey] = useState(nanoid());
  const request = useObserveRequest(requestId);
  const fleet = useObserveFleet(request?.fleetId);
  const requestDistanceToOrigin = request?.distanceToOrigin;
  const situation = request?.situation;
  const route = useMapRoute(request?.origin, profile?.mode);
  const routeDistanceToOrigin = route?.distance ?? 0;
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expiredModalShown, setExpiredModalShown] = useState(false);
  const [rejectModalShown, setRejectModalShown] = useState(false);
  const [distanceExceedsModalShwon, setDistanceExceedsModalShwon] = useState(false);
  const order = useObserveOrder(request?.orderId, confirmed);
  // tracking
  useTrackScreenView('Matching');
  // side effects
  useDismissNotifications();
  useRouterAccordingOrderStatus(request?.orderId, order?.status);
  // update request to viewed
  // stop sound and update request as viewed
  useEffect(() => {
    if (!requestId) return;
    api.couriers().viewOrderRequest(requestId).catch(console.error);
  }, [api, requestId]);
  // update route polyline
  useEffect(() => {
    if (!route) return;
    api.couriers().updateOrderRequestRoute(requestId, route).catch(console.error);
  }, [route, requestId, api]);
  // track distane
  useEffect(() => {
    if (!requestDistanceToOrigin) return;
    if (!routeDistanceToOrigin) return;
    trackEvent('Rota para origem', { requestDistanceToOrigin, routeDistanceToOrigin });
  }, [requestDistanceToOrigin, routeDistanceToOrigin]);
  // open modal if request expired
  useEffect(() => {
    if (!situation) return;
    if (situation === 'expired') {
      setExpiredModalShown(true);
    }
  }, [situation]);
  useEffect(() => {
    if (!fleet) return;
    if (!routeDistanceToOrigin) return;
    const distanceExceeds = routeDistanceToOrigin > 2 * (fleet.maxDistanceToOrigin ?? 0);
    if (!distanceExceeds) return;
    setDistanceExceedsModalShwon(true);
    trackEvent('Distância passou limite');
  }, [routeDistanceToOrigin, fleet]);
  // handlers
  const matchOrder = useCallback(() => {
    if (!request?.orderId) return;
    trackEvent('Aceitou corrida');
    api
      .orders()
      .matchOrder(request.orderId, route?.distance)
      .then(() => {
        setConfirmed(true);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) showToast(error.message, 'error');
        setMatchKey(nanoid());
      });
  }, [api, request?.orderId, route?.distance, showToast]);
  const rejectOrder = (issue: Issue, comment: string) => {
    if (!request?.orderId) return;
    trackEvent('Recusou corrida');
    setLoading(true);
    api
      .orders()
      .rejectOrder(request.orderId, issue, comment)
      .then(() => {
        setRejectModalShown(false);
        setLoading(false);
        router.back();
      })
      .catch((error: unknown) => {
        setRejectModalShown(false);
        setLoading(false);
        if (error instanceof Error) showToast(error.message, 'error');
      });
  };
  stopOrderRequestSound().then(null).catch(null);
  // UI
  if (!request) return <Loading title="Nova corrida pra você!" />;
  if (!fleet) return <Loading title="Nova corrida pra você!" />;
  const {
    origin,
    destination,
    readyAt,
    netValue,
    locationFee = 0,
    distance,
    fleetName,
    type,
  } = request;
  const totalDistance = distance + routeDistanceToOrigin;
  const fee = netValue + locationFee;
  const feePerKm = round(fee / (totalDistance / 1000), 2);
  const originAddress = getPartialAddress(request.originAddress);
  const destinationAddress = getPartialAddress(request.destinationAddress);
  const hideValues = !route;
  // logs
  console.log('/matching/[id]', requestId);
  // console.log(route);
  // console.log('orderId', orderId);
  // console.log('request', request);
  // console.log('route', route);
  // console.log('hideValues', hideValues);
  return (
    <DefaultView style={{ ...screens.default, padding: paddings.lg }}>
      <Stack.Screen options={{ title: 'Nova corrida pra você!' }} />
      <ErrorModal
        text="Este pedido já foi aceito por outra pessoa"
        visible={expiredModalShown}
        onDismiss={() => {
          setExpiredModalShown(false);
          router.back();
        }}
      />
      <ErrorModal
        text="Com sua localização atual, a distância para coleta é maior que o permitido pela sua frota."
        visible={distanceExceedsModalShwon}
        onDismiss={() => {
          setDistanceExceedsModalShwon(false);
        }}
      />
      <SelectIssueModal
        title="Por que você passou a corrida?"
        issueType="courier-rejects-matching"
        visible={rejectModalShown}
        loading={loading}
        onConfirm={rejectOrder}
        onDismiss={() => setRejectModalShown(false)}
      />
      <View
        style={{
          padding: paddings.lg,
          alignItems: 'center',
          ...borders.default,
          borderColor: colors.neutral100,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <RoundedText
            style={{ marginBottom: paddings.sm, backgroundColor: colors.neutral50 }}
            size="xs"
            color="black"
          >
            {`Frota ${fleetName}`}
          </RoundedText>
          {/* location fee */}
          {locationFee ? (
            <RoundedText
              style={{
                marginBottom: paddings.sm,
                marginLeft: paddings.sm,
                backgroundColor: colors.primary300,
              }}
              icon={<Zap style={{ marginRight: paddings.xs }} size={16} color={colors.black} />}
              size="xs"
              color="black"
            >
              Alta demanda
            </RoundedText>
          ) : null}
        </View>
        <Skeleton.Group show={hideValues}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center' }}>
              <Skeleton colors={[colors.neutral50, colors.neutral100]} width={110}>
                <DefaultText>{formatCurrency(feePerKm)} por KM</DefaultText>
              </Skeleton>
              <Skeleton colors={[colors.neutral50, colors.neutral100]} width={140}>
                <DefaultText style={{ marginTop: paddings.xs }} size="2xl" color="black">
                  {formatCurrency(fee)}
                </DefaultText>
              </Skeleton>
            </View>
            <View style={{ marginLeft: paddings['2xl'], alignItems: 'center' }}>
              <Skeleton colors={[colors.neutral50, colors.neutral100]} width={110}>
                <DefaultText>Distância total</DefaultText>
              </Skeleton>
              <Skeleton colors={[colors.neutral50, colors.neutral100]} width={90}>
                <DefaultText style={{ marginTop: paddings.xs }} size="2xl" color="black">
                  {formatDistance(totalDistance)}
                </DefaultText>
              </Skeleton>
            </View>
          </View>
        </Skeleton.Group>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: paddings.md,
          ...borders.default,
          borderColor: colors.neutral100,
          overflow: 'hidden',
        }}
      >
        <DefaultMap origin={origin} destination={destination} polyline={route?.polyline} />
        <View style={{ padding: paddings.lg }}>
          <View style={{ flexDirection: 'row' }}>
            <RoundedText
              style={{ marginBottom: paddings.sm, backgroundColor: colors.primary100 }}
              icon={
                type === 'food' ? (
                  <Utensils
                    style={{ marginRight: paddings.xs }}
                    size={12}
                    color={colors.primary900}
                  />
                ) : (
                  <Package
                    style={{ marginRight: paddings.xs }}
                    size={12}
                    color={colors.primary900}
                  />
                )
              }
              size="xs"
              color="primary900"
            >
              {type === 'food' ? 'Restaurante' : 'Encomenda'}
            </RoundedText>
            {type === 'food' ? (
              <RoundedText
                style={{
                  marginBottom: paddings.sm,
                  marginLeft: paddings.sm,
                  backgroundColor: colors.info100,
                }}
                size="xs"
                color="info900"
              >
                {readyAt ? `Pronto às ${formatDate(readyAt, 'HH:mm')}` : 'Pedido pronto!'}
              </RoundedText>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: paddings.lg,
            }}
          >
            <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <PackageMarker />
              <View style={{ flex: 1, width: 1, backgroundColor: colors.black }} />
              <DestinationMarker style={{ marginBottom: 18 }} />
            </View>
            <View style={{ flex: 1, marginLeft: paddings.sm }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <DefaultText size="xs" color="black">
                      Retirada
                    </DefaultText> */}
                    <View>
                      <Skeleton.Group show={hideValues}>
                        <Skeleton colors={[colors.neutral50, colors.neutral100]} width={120}>
                          <RoundedView
                            style={{
                              paddingHorizontal: paddings.sm,
                              paddingVertical: paddings.xs,
                              backgroundColor: colors.neutral50,
                              // marginLeft: paddings.sm,
                              borderWidth: 0,
                            }}
                          >
                            <DefaultText color="black" size="xs">
                              {`${formatDistance(routeDistanceToOrigin)} até retirada`}
                            </DefaultText>
                          </RoundedView>
                        </Skeleton>
                      </Skeleton.Group>
                    </View>
                  </View>
                  <DefaultText style={{ marginTop: paddings.xs }} size="md">
                    {originAddress}
                  </DefaultText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: paddings.lg,
                }}
              >
                <View style={{}}>
                  <View>
                    <RoundedView
                      style={{
                        paddingHorizontal: paddings.sm,
                        paddingVertical: paddings.xs,
                        backgroundColor: colors.neutral50,
                        // marginLeft: paddings.sm,
                        borderWidth: 0,
                      }}
                    >
                      <DefaultText color="black" size="xs">
                        {`+ ${formatDistance(distance)} até entrega`}
                      </DefaultText>
                    </RoundedView>
                  </View>
                  <DefaultText style={{ marginTop: paddings.xs }} size="md">
                    {destinationAddress}
                  </DefaultText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ padding: paddings.lg }}>
        {/* button */}
        <ConfirmButton
          key={matchKey}
          style={{ marginTop: 0 }}
          text="Aceitar"
          trackText="Arraste para aceitar"
          onConfirm={matchOrder}
        />
        <LinkButton
          style={{ marginTop: paddings.lg, alignSelf: 'center' }}
          variant="ghost"
          size="md"
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
