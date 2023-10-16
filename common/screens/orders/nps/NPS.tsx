import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Pressable, View, ViewProps } from 'react-native';
import { NPSValue } from './NPSValue';

interface Props extends ViewProps {
  value?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

const TOTAL = 10;

export const NPS = ({ style, value, disabled, onChange, ...props }: Props) => {
  // UI
  return (
    <View
      style={[{ backgroundColor: colors.white, padding: paddings.lg, borderRadius: 8 }, style]}
      {...props}
    >
      <DefaultText size="lg">Qual a probabilidade de indicar o AppJusto?</DefaultText>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: paddings['2xl'],
        }}
      >
        {new Array(TOTAL).fill('').map((_, i) => {
          const index = i + 1;
          return (
            <Pressable
              key={i}
              onPress={() => {
                if (onChange && !disabled) onChange(index);
              }}
            >
              <NPSValue value={index} selected={value === index} variant="small" version="10" />
            </Pressable>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: paddings.lg,
        }}
      >
        <DefaultText size="xs" color="neutral700">
          Pouco proável
        </DefaultText>
        <DefaultText size="xs" color="neutral700">
          Muito proável
        </DefaultText>
      </View>
    </View>
  );
};
