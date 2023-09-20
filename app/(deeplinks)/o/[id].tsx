import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { ShowToast } from '@/common/components/toast/Toast';
import { Loading } from '@/common/components/views/Loading';
import { replaceRouteAccordingOrderStatus } from '@/common/screens/orders/replaceRouteAccordingOrderStatus';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

export default function OrderDeeplinkScreen() {
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  const order = useObserveOrder(orderId);
  const status = order?.status;
  // UI
  useEffect(() => {
    ShowToast('/o/' + orderId + '; status: ' + status);
    if (!status) return;
    replaceRouteAccordingOrderStatus(orderId, status);
  }, [orderId, status]);
  return <Loading />;
}
