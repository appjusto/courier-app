import { CircledView } from '@/common/components/containers/CircledView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors, { ColorName } from '@/common/styles/colors';
import { ViewProps } from 'react-native';

interface Props extends ViewProps {
  value?: number;
  selected: boolean;
  version?: string;
  variant: 'small' | 'large';
}

export const NPSValue = ({ value, selected, version, variant, style, ...props }: Props) => {
  const backgroundColor = () => {
    if (!selected || !value) return colors.neutral50;
    if (version === '10') {
      if (value <= 6) return colors.error100;
      else if (value >= 9) return colors.primary100;
      return colors.warning100;
    } else {
      if (value <= 3) return colors.error100;
      else if (value === 5) return colors.primary100;
      return colors.warning100;
    }
  };
  const color = (): ColorName => {
    if (!selected || !value) return 'neutral700';
    if (version === '10') {
      if (value <= 6) return 'error500';
      else if (value >= 9) return 'primary500';
      return 'warning500';
    } else {
      if (value <= 3) return 'error500';
      else if (value === 5) return 'primary500';
      return 'warning500';
    }
  };

  // UI
  return (
    <CircledView
      size={variant === 'small' ? 24 : 50}
      style={[
        {
          backgroundColor: backgroundColor(),
          borderWidth: 0,
        },
        style,
      ]}
      {...props}
    >
      <DefaultText size={variant === 'small' ? 'xs' : 'lg'} color={color()}>
        {value ?? '-'}
      </DefaultText>
    </CircledView>
  );
};
