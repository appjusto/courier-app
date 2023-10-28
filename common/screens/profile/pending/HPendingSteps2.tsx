import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { forwardRef } from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { PendingStep } from './PendingStep';

interface Props extends ViewProps {
  steps: string[];
  index: number;
}

export const HPendingSteps2 = forwardRef(
  ({ steps, index, style, ...props }: Props, externalRef) => {
    return (
      <View style={[{ padding: paddings.lg }, style]} {...props}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          ref={externalRef ? (externalRef as React.RefObject<ScrollView>) : null}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flex: 1, borderWidth: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              {steps.map((step, i) => (
                <View
                  style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
                  key={step}
                >
                  <PendingStep
                    index={i}
                    variant={i < index ? 'past' : i > index ? 'next' : 'current'}
                    flexDirection="column"
                    icon="check"
                  />
                  {i + 1 < steps.length ? (
                    <View
                      style={{
                        minWidth: 50,
                        flex: 1,
                        height: 2,
                        top: 13,
                        backgroundColor: i < index ? colors.success900 : colors.neutral200,
                      }}
                    />
                  ) : null}
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {steps.map((step, i) => (
                <DefaultText key={step}>{step}</DefaultText>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
);
