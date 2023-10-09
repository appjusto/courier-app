import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const ModalHandle = ({ style, ...props }: Props) => {
  return (
    <View
      style={[
        {
          alignSelf: 'center',
          marginTop: paddings.md,
          height: 6,
          width: 50,
          borderRadius: 100,
          backgroundColor: colors.neutral100,
        },
        style,
      ]}
      {...props}
    />
  );
};
