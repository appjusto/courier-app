import borders from '@/common/styles/borders';
import colors, { ColorName } from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { View } from 'react-native';
import { DefaultText } from '../texts/DefaultText';

interface Props {
  title: string;
  backgroundColor: ColorName;
  color?: ColorName;
  borderColor?: ColorName;
}

export const DefaultBadge = ({
  title,
  backgroundColor,
  color = 'black',
  borderColor = 'black',
}: Props) => {
  return (
    <View
      style={{
        backgroundColor: colors[backgroundColor],
        ...borders.badge,
        borderColor: colors[borderColor],
        padding: paddings.sm,
      }}
    >
      <DefaultText size="xs" color={color}>
        {title}
      </DefaultText>
    </View>
  );
};
