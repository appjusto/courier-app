import { useObserveOrderReview } from '@/api/orders/reviews/useObserveOrderReview';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { ReviewType } from '@appjusto/types';
import { useEffect } from 'react';
import { View, ViewProps } from 'react-native';
import { NPS } from '../nps/NPS';
import { AspectReview } from './aspect-review';

interface Props extends ViewProps {
  orderId?: string;
  consumerReview: ReviewType | undefined;
  businessReview: ReviewType | undefined;
  platformReview: ReviewType | undefined;
  nps?: number;
  disabled?: boolean;
  setConsumerReview: (type: ReviewType) => void;
  setBusinessReview?: (type: ReviewType) => void;
  setPlatformReview: (type: ReviewType) => void;
  setNPS: (value: number) => void;
}

export const OrderReviewView = ({
  orderId,
  consumerReview,
  businessReview,
  platformReview,
  nps,
  disabled,
  setConsumerReview,
  setBusinessReview,
  setPlatformReview,
  setNPS,
  style,
  ...props
}: Props) => {
  // state
  const review = useObserveOrderReview(orderId);
  console.log(review);
  // side effects
  useEffect(() => {
    if (!review) return;
    if (review.consumerReview) setConsumerReview(review.consumerReview.rating);
    if (review.business && setBusinessReview) setBusinessReview(review.business.rating);
    if (review.platform) setPlatformReview(review.platform.rating);
    if (review.nps) setNPS(review.nps);
  }, [review, setPlatformReview, setBusinessReview, setConsumerReview, setNPS]);
  // UI
  const reallyDisabled = disabled || Boolean(review);
  const showReviewBox = !review || consumerReview || businessReview || platformReview;
  return (
    <View>
      {showReviewBox ? (
        <View
          style={[{ backgroundColor: colors.white, padding: paddings.lg, borderRadius: 8 }, style]}
          {...props}
        >
          <DefaultText size="lg">Avalie sua experiência</DefaultText>
          {!review || consumerReview ? (
            <AspectReview
              style={{ marginTop: paddings.lg }}
              label="Consumidor"
              type={consumerReview}
              disabled={reallyDisabled}
              onChange={setConsumerReview}
            />
          ) : null}
          {(!review && setBusinessReview) || businessReview ? (
            <AspectReview
              style={{ marginTop: paddings.lg }}
              label="Restaurante"
              type={businessReview}
              disabled={reallyDisabled}
              onChange={setBusinessReview}
            />
          ) : null}
          {!review || platformReview ? (
            <AspectReview
              style={{ marginTop: paddings.lg }}
              label="AppJusto"
              type={platformReview}
              disabled={reallyDisabled}
              onChange={setPlatformReview}
            />
          ) : null}
        </View>
      ) : null}
      {!review || nps ? (
        <NPS
          style={{ marginTop: showReviewBox ? paddings.lg : 0 }}
          value={nps}
          disabled={reallyDisabled}
          onChange={setNPS}
        />
      ) : null}
    </View>
  );
};
