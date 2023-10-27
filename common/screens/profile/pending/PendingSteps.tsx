import colors from '@/common/styles/colors';
import { View, ViewProps } from 'react-native';
import { PendingStep } from './PendingStep';

interface Props extends ViewProps {
  steps: string[];
  index: number;
}

export const PendingSteps = ({ steps, index, style, ...props }: Props) => {
  return (
    <View style={[style]} {...props}>
      {steps.map((step, i) => (
        <View key={step}>
          <PendingStep
            index={i}
            title={step}
            variant={i < index ? 'past' : i > index ? 'next' : 'current'}
            icon="check"
          />
          {i + 1 < steps.length ? (
            <View
              style={{
                width: 2,
                height: 20,
                left: 13,
                backgroundColor: i < index ? colors.success900 : colors.neutral200,
              }}
            />
          ) : null}
        </View>
      ))}
    </View>
  );
};
