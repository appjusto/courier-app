import { useObserveOrderRequest } from '@/api/couriers/requests/useObserveOrderRequest';
import { getDispatchingStateFocus } from '@/api/orders/dispatching-state/getDispatchingStateFocus';
import { DefaultMap } from '@/common/components/map/DefaultMap';
import { Order, WithId } from '@appjusto/types';
import { ViewProps } from 'react-native';

interface Props extends ViewProps {
  order: WithId<Order>;
}

export const OrderMap = ({ order }: Props) => {
  // state
  const request = useObserveOrderRequest(order.id);
  const dispatchingState = order?.dispatchingState;
  const origin = order.origin?.location;
  const destination = order.destination?.location;
  const polyline =
    dispatchingState === 'going-pickup' && request?.route?.polyline
      ? request?.route?.polyline
      : order.route?.polyline;
  const navigationTo =
    getDispatchingStateFocus(dispatchingState) === 'destination'
      ? order.destination?.location
      : order.origin?.location;
  // UI
  if (dispatchingState === 'arrived-destination') return null;
  return (
    <DefaultMap
      origin={origin}
      destination={destination}
      polyline={polyline}
      navigationTo={navigationTo}
    />
  );
};
