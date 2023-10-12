import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { getOrderRevenue } from '@/api/orders/revenue/getOrderRevenue';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { openWhatsAppSupportURL } from '@/common/constants/openWhatsAppSupportURL';
import { formatCurrency } from '@/common/formatters/currency';
import { OrderReviewView } from '@/common/screens/orders/review/order-review-view';
import { FeedbackHeader } from '@/common/screens/profile/situation-header';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { OrderReview, ReviewType } from '@appjusto/types';
import crashlytics from '@react-native-firebase/crashlytics';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

export default function OngoingOrderScreen() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const order = useObserveOrder(orderId);
  const [consumerReview, setConsumerReview] = useState<ReviewType>();
  const [businessReview, setBusinessReview] = useState<ReviewType>();
  const [platformReview, setPlatformReview] = useState<ReviewType>();
  const [nps, setNPS] = useState<number>();
  const [loading, setLoading] = useState(false);
  // tracking
  useTrackScreenView('Pedido entregue');
  // handlers
  // update review
  const setReviewHandler = () => {
    // TODO: tags
    if (!order) return;
    let review: Partial<OrderReview> = { npsVersion: '10' };
    if (consumerReview) {
      review = { ...review, consumerReview: { id: order.consumer.id, rating: consumerReview } };
    }
    if (businessReview && order.business?.id) {
      review = { ...review, business: { id: order.business.id, rating: businessReview } };
    }
    if (platformReview) {
      review = { ...review, platform: { rating: platformReview } };
    }
    if (nps) {
      review = { ...review, nps };
    }
    console.log('to update:', review);

    if (isEmpty(review)) {
      router.back();
    } else {
      setLoading(true);
      api
        .orders()
        .setOrderReview(orderId, review)
        .then(() => {
          setLoading(false);
          router.back();
        })
        .catch((error: unknown) => {
          setLoading(false);
          console.error(error);
          if (error instanceof Error) crashlytics().recordError(error);
          showToast('Não foi possível enviar a avaliação.', 'error');
          router.back();
        });
    }
  };
  // UI
  if (!order) return <Loading title="Pedido entregue!" />;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: `Pedido #${order.code}` }} />
      <FeedbackHeader title="Corrida finalizada!" text={['Valor recebido']} variant="success">
        <DefaultText style={{ marginTop: paddings.xs }} size="lg">
          {formatCurrency(getOrderRevenue(order))}
        </DefaultText>
      </FeedbackHeader>
      <View
        style={{
          flex: 1,
          marginTop: paddings['2xl'],
          padding: paddings.lg,
          backgroundColor: colors.neutral50,
        }}
      >
        <OrderReviewView
          consumerReview={consumerReview}
          businessReview={businessReview}
          platformReview={platformReview}
          nps={nps}
          disabled={!order}
          orderId={orderId}
          setConsumerReview={setConsumerReview}
          setBusinessReview={order.business?.id ? setBusinessReview : undefined}
          setPlatformReview={setPlatformReview}
          setNPS={setNPS}
        />
        <View
          style={{
            backgroundColor: colors.white,
            marginTop: paddings.lg,
            padding: paddings.lg,
            borderRadius: 8,
          }}
        >
          <View style={{ marginTop: paddings.lg }}>
            <DefaultText size="lg">Teve algum problema com a corrida?</DefaultText>
            <DefaultText style={{ marginTop: paddings.xs }}>
              Fale com um de nossos atendentes ou realize uma denúncia
            </DefaultText>
            <Pressable onPress={() => openWhatsAppSupportURL('Pedido entregue')}>
              <DefaultCard
                style={{ marginTop: paddings.lg }}
                icon={<DefaultCardIcon iconName="chat" />}
                title="Suporte AppJusto"
                subtitle="Fale com a gente através do nosso WhatsApp"
              />
            </Pressable>
            <Pressable onPress={() => router.replace('/complaint/')}>
              <DefaultCard
                style={{ marginTop: paddings.sm }}
                icon={<DefaultCardIcon iconName="alert" variant="warning" />}
                title="Denunciar"
                subtitle="Realize uma denúncia através do AppJusto"
              />
            </Pressable>
          </View>
        </View>
        <DefaultButton
          style={{ marginVertical: paddings.xl }}
          title="Finalizar"
          disabled={!order || loading}
          onPress={setReviewHandler}
        />
      </View>
    </DefaultScrollView>
  );
}
