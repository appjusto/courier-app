import paddings from '@/common/styles/paddings';
import { View, ViewProps } from 'react-native';
import { PendingStep } from './PendingStep';

interface Props extends ViewProps {
  steps: { title: string }[];
  index: number;
}

export const PendingSteps = ({ steps, index, style, ...props }: Props) => {
  return (
    <View style={[style]} {...props}>
      {steps.map((step, i) => (
        <PendingStep
          key={`${i}`}
          index={i}
          title={step.title}
          variant={i < index ? 'past' : i > index ? 'next' : 'current'}
          style={{ marginTop: i > 0 ? paddings.xl : 0 }}
        />
      ))}
    </View>
  );
};
