import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Check, Pencil } from 'lucide-react-native';
import { View, ViewProps } from 'react-native';
import { CircledView } from '../../components/containers/CircledView';

interface Props extends ViewProps {
  index: number;
  title: string;
  variant: 'current' | 'past' | 'next';
  icon?: 'pencil' | 'check';
}

export const PendingStep = ({ index, title, variant, style, icon = 'pencil', ...props }: Props) => {
  const past = variant === 'past';
  const current = variant === 'current';
  const backgroundColor = () => {
    if (past) return colors.success900;
    if (current) return colors.black;
    return colors.neutral200;
  };
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}
      {...props}
    >
      <CircledView
        size={28}
        style={{
          borderWidth: 0,
          backgroundColor: backgroundColor(),
        }}
      >
        {past ? (
          icon === 'pencil' ? (
            <Pencil color={colors.white} size={16} />
          ) : (
            <Check color={colors.white} size={16} />
          )
        ) : (
          <DefaultText size="md-overline" color={current ? 'white' : 'black'}>
            {index + 1}
          </DefaultText>
        )}
      </CircledView>
      <DefaultText style={{ marginLeft: paddings.sm }}>{title}</DefaultText>
    </View>
  );
};
