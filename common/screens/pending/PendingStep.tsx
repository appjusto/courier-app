import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Check, Pencil } from 'lucide-react-native';
import { forwardRef } from 'react';
import { View, ViewProps } from 'react-native';
import { CircledView } from '../../components/containers/CircledView';

interface Props extends ViewProps {
  index: number;
  title: string;
  variant: 'current' | 'past' | 'next';
  icon?: 'pencil' | 'check';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
}

export const PendingStep = forwardRef(
  (
    { index, title, variant, style, flexDirection = 'row', icon = 'pencil', ...props }: Props,
    externalRef
  ) => {
    const past = variant === 'past';
    const current = variant === 'current';
    const backgroundColor = () => {
      if (past) return colors.success900;
      if (current) return colors.black;
      return colors.neutral200;
    };
    return (
      <View
        ref={externalRef ? (externalRef as React.RefObject<View>) : null}
        style={[
          {
            flexDirection,
            alignItems: 'center',
            minWidth: 80,
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
        <DefaultText
          style={{
            marginLeft: flexDirection === 'row' ? paddings.sm : 0,
            marginTop: flexDirection === 'row' ? 0 : paddings.md,
          }}
        >
          {title}
        </DefaultText>
      </View>
    );
  }
);
