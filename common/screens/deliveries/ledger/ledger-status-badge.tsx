import { getLedgerStatusAsText } from '@/api/ledger/status/getLedgerStatusAsText';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors, { ColorName } from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { LedgerEntryStatus } from '@appjusto/types';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface Props extends ViewProps {
  status: LedgerEntryStatus;
}

export const LedgerEntryStatusBadge = ({ status, style, ...props }: Props) => {
  const backgroundColor = () => {
    if (status === 'paid') return colors.success100;
    else if (status === 'canceled' || status === 'rejected') return colors.error100;
    return colors.info100;
  };
  const textColor = (): ColorName => {
    if (status === 'paid') return 'success900';
    else if (status === 'canceled' || status === 'rejected') return 'error900';
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
      <DefaultText color={textColor()}>{getLedgerStatusAsText(status)}</DefaultText>
    </View>
  );
};
