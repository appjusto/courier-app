import { CircledView } from '@/common/components/containers/CircledView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Pressable, View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  value?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

const TOTAL = 5;

export const NPS = ({ style, value, disabled, onChange, ...props }: Props) => {
  // state

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
        {new Array(TOTAL).fill('').map((_, i) => (
          <Pressable
            key={i}
            onPress={() => {
              if (onChange && !disabled) onChange(i + 1);
            }}
          >
            <CircledView
              style={{
                backgroundColor:
                  value === i + 1
                    ? i < Math.ceil(TOTAL / 2)
                      ? colors.warning100
                      : colors.primary100
                    : colors.neutral50,
                borderWidth: 0,
              }}
            >
              <DefaultText
                size="md"
                color={
                  value === i + 1
                    ? i < Math.ceil(TOTAL / 2)
                      ? 'warning500'
                      : 'primary500'
                    : 'neutral700'
                }
              >
                {i + 1}
              </DefaultText>
            </CircledView>
          </Pressable>
        ))}
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
