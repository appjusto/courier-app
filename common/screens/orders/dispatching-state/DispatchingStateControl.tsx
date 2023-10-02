import { useContextApi } from '@/api/ApiContext';
import { getNextDispatchingState } from '@/api/orders/dispatching-state/getNextDispatchingState';
import { ConfirmButton } from '@/common/components/buttons/swipeable/ConfirmButton';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import paddings from '@/common/styles/paddings';
import { Order, WithId } from '@appjusto/types';
import { useCallback } from 'react';
import { View, ViewProps } from 'react-native';
import { useDispatchingStateControlDisabled } from './useDispatchingStateControlDisabled';

interface Props extends ViewProps {
  order: WithId<Order>;
}

export const DispatchingStateControl = ({ order, style, ...props }: Props) => {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // params
  const { dispatchingState } = order;
  const orderId = order.id;
  // state
  const nextDispatchingState = getNextDispatchingState(order);
  const disabled = useDispatchingStateControlDisabled(order);

  // handlers
  const advanceHandler = useCallback(() => {
    if (!nextDispatchingState) return;
    api
      .orders()
      .updateOrder(orderId, { dispatchingState: nextDispatchingState })
      .then(null)
      .catch((error: unknown) => {
        if (error instanceof Error) {
          showToast(error.message, 'error');
        }
      });
  }, [orderId, nextDispatchingState, api, showToast]);
  // UI
  const trackText = () => {
    if (!dispatchingState || dispatchingState === 'going-pickup') return 'Cheguei para retirada';
    if (dispatchingState === 'arrived-pickup') return 'Saí para entrega';
    return 'Cheguei para entrega';
  };
  if (dispatchingState === 'arrived-destination') return null;
  return (
    <View style={{ padding: paddings.lg }}>
      <ConfirmButton
        text="Arrastar"
        trackText={trackText()}
        disabled={disabled}
        confirmDelay={1000}
        onConfirm={advanceHandler}
      />
    </View>
  );
};
