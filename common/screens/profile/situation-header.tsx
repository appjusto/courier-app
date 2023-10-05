import { CircledView } from '@/common/components/containers/CircledView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { Check, Search, X } from 'lucide-react-native';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  title: string;
  text: string[];
  variant: 'success' | 'warning' | 'error';
}

export const FeedbackHeader = ({ variant, title, text, children, style, ...props }: Props) => {
  const backgroundColor = () => {
    if (variant === 'success') return colors.success500;
    if (variant === 'warning') return colors.warning500;
    if (variant === 'error') return colors.error500;
    return colors.white;
  };
  return (
    <View style={[{}, style]} {...props}>
      <View>
        <View style={{ height: 120, backgroundColor: backgroundColor() }}></View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircledView
            size={70}
            style={{
              top: -35,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.white,
              borderColor: backgroundColor(),
              borderWidth: 4,
            }}
          >
            {variant === 'success' ? <Check size={32} color={colors.success900} /> : null}
            {variant === 'warning' ? <Search size={32} color={colors.warning500} /> : null}
            {variant === 'error' ? <X size={32} color={colors.error500} /> : null}
          </CircledView>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: paddings.lg,
          paddingTop: 60,
          paddingBottom: paddings.xl,
          alignItems: 'center',
        }}
      >
        <DefaultText
          size="lg"
          style={{ marginBottom: paddings.lg, textAlign: 'center', ...lineHeight.lg }}
        >
          {title}
        </DefaultText>
        <View style={{ paddingHorizontal: paddings.lg }}>
          {text.map((value) => (
            <DefaultText key={value} size="md" style={{ ...lineHeight.md, textAlign: 'center' }}>
              {value}
            </DefaultText>
          ))}
        </View>
        {children}
      </View>
    </View>
  );
};
