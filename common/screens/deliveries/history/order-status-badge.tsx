import { getStatusAsText } from '@/api/orders/status/getStatusAsText';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors, { ColorName } from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { OrderStatus } from '@appjusto/types';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface Props extends ViewProps {
  status: OrderStatus;
}

export const OrderStatusBadge = ({ status, style, ...props }: Props) => {
  const backgroundColor = () => {
    if (status === 'delivered') return colors.success100;
    else if (status === 'canceled') return colors.error100;
    return colors.info100;
  };
  const textColor = (): ColorName => {
    if (status === 'delivered') return 'success900';
    else if (status === 'canceled') return 'error900';
    return 'info900';
  };
  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor(),
          paddingHorizontal: paddings.xs,
          paddingVertical: paddings['2xs'],
        },
        style,
      ]}
      {...props}
    >
      <DefaultText color={textColor()}>{getStatusAsText(status)}</DefaultText>
    </View>
  );
};
