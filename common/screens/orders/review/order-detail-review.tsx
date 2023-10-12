import { useObserveOrderReview } from '@/api/orders/reviews/useObserveOrderReview';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Order, WithId } from '@appjusto/types';
import { router } from 'expo-router';
import { View, ViewProps } from 'react-native';
import { NPSValue } from '../nps/NPSValue';

interface Props extends ViewProps {
  order: WithId<Order>;
}

export const OrderDetailReview = ({ order, style, ...props }: Props) => {
  // params
  const { status } = order;
  const orderId = order.id;
  // state
  const review = useObserveOrderReview(orderId);
  // UI
  if (status !== 'delivered') return null;
  return (
    <View
      style={[
        {
          padding: paddings.lg,
          ...borders.default,
          borderColor: colors.neutral100,
        },
        style,
      ]}
      {...props}
    >
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <DefaultText size="md">Avaliação da corrida</DefaultText>
          <View
            style={{
              backgroundColor: review ? colors.success100 : colors.warning100,
              paddingVertical: paddings.sm,
              paddingHorizontal: paddings.md,
            }}
          >
            <DefaultText size="xs" color={review ? 'success900' : 'warning900'}>
              {review ? 'Realizada' : 'Pendente'}
            </DefaultText>
          </View>
        </View>

        {review === null ? (
          <View style={{ marginTop: paddings.lg }}>
            <DefaultButton
              title="Avaliar corrida"
              onPress={() =>
                router.push({
                  pathname: '/(logged)/order/[id]/delivered',
                  params: { id: order.id },
                })
              }
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: paddings.lg,
            }}
          >
            {/* consumer */}
            <View style={{ alignItems: 'center' }}>
              {review?.consumerReview?.rating === 'positive' ? (
                <DefaultCardIcon iconName="thumbs-up" />
              ) : null}
              {review?.consumerReview?.rating === 'negative' ? (
                <DefaultCardIcon iconName="thumbs-down" variant="warning" />
              ) : null}
              {!review?.consumerReview?.rating ? (
                <DefaultCardIcon iconName="thumbs-up" variant="neutral" />
              ) : null}
              <DefaultText style={{ marginTop: paddings.xs }} size="xs" color="neutral700">
                Consumidor
              </DefaultText>
            </View>
            {/* business */}
            {order.type === 'food' ? (
              <View style={{ alignItems: 'center' }}>
                {review?.business?.rating === 'positive' ? (
                  <DefaultCardIcon iconName="thumbs-up" />
                ) : null}
                {review?.business?.rating === 'negative' ? (
                  <DefaultCardIcon iconName="thumbs-down" variant="warning" />
                ) : null}
                {!review?.business?.rating ? (
                  <DefaultCardIcon iconName="thumbs-up" variant="neutral" />
                ) : null}
                <DefaultText style={{ marginTop: paddings.xs }} size="xs" color="neutral700">
                  Restaurante
                </DefaultText>
              </View>
            ) : null}
            {/* platform */}
            <View style={{ alignItems: 'center' }}>
              {review?.platform?.rating === 'positive' ? (
                <DefaultCardIcon iconName="thumbs-up" />
              ) : null}
              {review?.platform?.rating === 'negative' ? (
                <DefaultCardIcon iconName="thumbs-down" variant="warning" />
              ) : null}
              {!review?.platform?.rating ? (
                <DefaultCardIcon iconName="thumbs-up" variant="neutral" />
              ) : null}
              <DefaultText style={{ marginTop: paddings.xs }} size="xs" color="neutral700">
                AppJusto
              </DefaultText>
            </View>
            {/* nps */}
            <View style={{ alignItems: 'center' }}>
              <NPSValue
                value={review?.nps}
                selected={true}
                variant="large"
                version={review?.npsVersion}
              />
              <DefaultText style={{ marginTop: paddings.xs }} size="xs" color="neutral700">
                NPS
              </DefaultText>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
