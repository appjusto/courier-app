import { getWithdrawStatusAsText } from '@/api/couriers/withdraws/getWithdrawStatusAsText';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors, { ColorName } from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { WithdrawStatus } from '@appjusto/types';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface Props extends ViewProps {
  status: WithdrawStatus;
}

export const WithdrawStatusBadge = ({ status, style, ...props }: Props) => {
  const backgroundColor = () => {
    if (status === 'accepted') return colors.success100;
    else if (status === 'rejected') return colors.error100;
    return colors.info100;
  };
  const textColor = (): ColorName => {
    if (status === 'accepted') return 'success900';
    else if (status === 'rejected') return 'error900';
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
      <DefaultText color={textColor()}>{getWithdrawStatusAsText(status)}</DefaultText>
    </View>
  );
};
