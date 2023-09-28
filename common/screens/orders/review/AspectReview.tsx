import { OnlyIconButton } from '@/common/components/buttons/icon/OnlyIconButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { ReviewType } from '@appjusto/types';
import { ThumbsDown, ThumbsUp } from 'lucide-react-native';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  label: string;
  type?: ReviewType;
  disabled?: boolean;
  onChange?: (type: ReviewType) => void;
}

export const AspectReview = ({ label, type, disabled, style, onChange, ...props }: Props) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: paddings.sm,
          paddingHorizontal: paddings.lg,
        },
        style,
      ]}
      {...props}
    >
      <DefaultText size="md">{label}</DefaultText>
      <View style={{ flexDirection: 'row' }}>
        <OnlyIconButton
          variant="circle"
          iconStyle={{
            backgroundColor: type === 'positive' ? colors.primary100 : colors.neutral50,
            borderWidth: 0,
          }}
          icon={<ThumbsUp color={type === 'positive' ? colors.primary500 : colors.neutral700} />}
          onPress={() => {
            if (onChange && !disabled && type !== 'positive') onChange('positive');
          }}
        />
        <OnlyIconButton
          style={{ marginLeft: paddings.lg }}
          variant="circle"
          iconStyle={{
            backgroundColor: type === 'negative' ? colors.warning100 : colors.neutral50,
            borderWidth: 0,
          }}
          icon={<ThumbsDown color={type === 'negative' ? colors.warning500 : colors.neutral700} />}
          onPress={() => {
            if (onChange && !disabled && type !== 'negative') onChange('negative');
          }}
        />
      </View>
    </View>
  );
};
