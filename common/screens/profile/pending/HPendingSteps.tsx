import { useRefs } from '@/common/components/inputs/code-input/useRefs';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { useEffect, useState } from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { PendingStep } from './PendingStep';

interface Props extends ViewProps {
  steps: { title: string }[];
  index: number;
}

type Measure = { x: number; y: number; width: number; height: number };

export const HPendingSteps = ({ steps, index, style, ...props }: Props) => {
  // refs
  const stepsRefs = useRefs<View>().slice(0, steps.length);
  const [measures, setMeasures] = useState<Measure[]>([]);
  const [linesMeasures, setLinesMeasures] = useState<Measure[]>([]);
  // side effects
  const measure = () => {
    Promise.all(
      stepsRefs.map(
        (ref) =>
          new Promise<Measure>((resolve) => {
            ref.current?.measure((x, y, width, height) => {
              // console.log('a', x, y, width, height);
              resolve({ x, y, width, height });
            });
          })
      )
    ).then(setMeasures);
  };
  useEffect(() => {
    let values: Measure[] = [];
    for (let i = 0; i < measures.length - 1; i++) {
      values = [
        ...values,
        {
          x: measures[i].x + measures[i].width * 0.5,
          y: 13,
          width: measures[i + 1].x - measures[i].x,
          height: 2,
        },
      ];
      // console.log(values);
    }
    setLinesMeasures(values);
  }, [measures]);
  // UI
  return (
    <View style={[{ padding: paddings.lg }, style]} {...props} onLayout={() => measure()}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {linesMeasures.map((measure, i) => {
          console.log(measure);
          return (
            <View
              key={`line-${i}`}
              style={{
                position: 'absolute',
                top: measure.y,
                left: measure.x,
                width: measure.width,
                height: measure.height,
                backgroundColor: i < index ? colors.success900 : colors.neutral200,
              }}
            />
          );
        })}
        {steps.map((step, i) => (
          <PendingStep
            key={`step-${i}`}
            ref={stepsRefs[i]}
            // https://github.com/facebook/react-native/issues/29712
            collapsable={false}
            index={i}
            title={step.title}
            variant={i < index ? 'past' : i > index ? 'next' : 'current'}
            style={{ marginLeft: i > 0 ? paddings.xl : 0 }}
            icon="check"
            flexDirection="column"
          />
        ))}
      </ScrollView>
    </View>
  );
};
