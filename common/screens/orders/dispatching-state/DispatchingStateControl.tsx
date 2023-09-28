import { useContextApi } from '@/api/ApiContext';
import { getNextDispatchingState } from '@/api/orders/dispatching-state/getNextDispatchingState';
import { ConfirmButton } from '@/common/components/buttons/swipeable/ConfirmButton';
import { Order, WithId } from '@appjusto/types';
import { useCallback } from 'react';
import { ViewProps } from 'react-native';
import { useDispatchingStateControlDisabled } from './useDispatchingStateControlDisabled';

interface Props extends ViewProps {
  order: WithId<Order>;
}

export const DispatchingStateControl = ({ order, style, ...props }: Props) => {
  const { dispatchingState } = order;
  const orderId = order.id;
  const nextDispatchingState = getNextDispatchingState(order);
  // context
  const api = useContextApi();
  // state
  const disabled = useDispatchingStateControlDisabled(order);
  // handlers
  const confirmHandler = useCallback(() => {
    if (nextDispatchingState) {
      api.orders().updateOrder(orderId, { dispatchingState: nextDispatchingState });
    } else {
      // TODO:
      api.orders().completeDelivery({ orderId, deliveredTo: 'me' });
    }
  }, [api, orderId, nextDispatchingState]);
  // UI
  const trackText = () => {
    if (!dispatchingState || dispatchingState === 'going-pickup') return 'Cheguei para retirada';
    if (dispatchingState === 'arrived-pickup') return 'Saí para entrega';
    return 'Cheguei para entrega';
  };
  return (
    <ConfirmButton
      text="Arrastar"
      trackText={trackText()}
      disabled={disabled}
      confirmDelay={1000}
      onConfirm={confirmHandler}
    />
  );
};
