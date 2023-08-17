import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { View, ViewProps } from 'react-native';
import { CircledView } from '../containers/CircledView';

interface Props extends ViewProps {
  size: number;
  index: number;
}
export const BulletsSteps = ({ size, index, style, ...props }: Props) => {
  return (
    <View style={[style, { flexDirection: 'row' }]} {...props}>
      {new Array(size).fill('').map((_, i) => {
        const selected = i <= index;
        return (
          <CircledView
            key={`${i}`}
            size={16}
            style={{
              marginLeft: i > 0 ? paddings.md : 0,
              borderWidth: 0,
              backgroundColor: selected ? colors.primary300 : undefined,
            }}
          >
            <CircledView
              size={8}
              style={{
                borderWidth: 0,
                backgroundColor: selected ? colors.black : colors.neutral200,
              }}
            />
          </CircledView>
        );
      })}
    </View>
  );
};
