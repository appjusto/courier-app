import { isOrderOngoing } from '@/api/orders/status';
import { ErrorModal } from '@/common/components/modals/error/error-modal';
import { OrderStatus } from '@appjusto/types';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export const useRouterAccordingOrderStatus = (
  orderId?: string,
  status?: OrderStatus | null,
  ongoing = false
) => {
  console.log('useRouterAccordingOrderStatus', status);
  // state
  const [modalShown, setModalShown] = useState(false);
  const [modalText, setModalText] = useState('');
  // side effects
  useEffect(() => {
    console.log(orderId, status, status ? isOrderOngoing(status) : '-');
    if (!orderId) return;
    if (status === undefined) return;
    if (status === null) {
      setModalText('Você saiu desta corrida');
      setModalShown(true);
    } else if (isOrderOngoing(status) && !ongoing) {
      router.replace({ pathname: '/(logged)/order/[id]/ongoing', params: { id: orderId } });
    } else if (status === 'delivered') {
      router.replace({ pathname: '/(logged)/order/[id]/delivered', params: { id: orderId } });
    } else if (status === 'canceled') {
      setModalText('Esta corrida foi cancelada');
      setModalShown(true);
    }
  }, [orderId, status, ongoing]);
  // result
  if (modalShown) {
    return (
      <ErrorModal
        text={modalText}
        visible={modalShown}
        onDismiss={() => {
          setModalShown(false);
          router.back();
        }}
      />
    );
  }
  return null;
};
