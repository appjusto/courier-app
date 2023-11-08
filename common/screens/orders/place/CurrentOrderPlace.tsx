import { getDispatchingStateFocus } from '@/api/orders/dispatching-state/getDispatchingStateFocus';
import { DefaultText } from '@/common/components/texts/DefaultText';
import paddings from '@/common/styles/paddings';
import { Order, WithId } from '@appjusto/types';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  order: WithId<Order>;
}

export const CurrentOrderPlace = ({ order, style, ...props }: Props) => {
  const { dispatchingState, origin, destination, business } = order;
  const [currentPlace, currentPlaceLabel] = (() => {
    if (!dispatchingState || dispatchingState === 'going-pickup') return [origin, 'Retirada'];
    if (dispatchingState === 'arrived-pickup') return [origin, 'Retirada'];
    return [destination, 'Entrega'];
  })();
  // UI
  if (!currentPlace) return null;
  return (
    <View style={[{ padding: paddings.lg }, style]} {...props}>
      <DefaultText size="xs">{currentPlaceLabel}</DefaultText>
      {business?.name && getDispatchingStateFocus(dispatchingState) === 'pickup' ? (
        <DefaultText size="md" color="black">
          {business.name}
        </DefaultText>
      ) : null}
      <DefaultText size="sm" color="black">
        {`${currentPlace.address.main}${
          currentPlace.additionalInfo ? ' - ' + currentPlace.additionalInfo : ''
        }`}
      </DefaultText>
      {currentPlace.instructions ? (
        <DefaultText size="xs" color="neutral800">
          {currentPlace.instructions}
        </DefaultText>
      ) : null}
    </View>
  );
};
