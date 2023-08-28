import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { Pressable, Text, View } from 'react-native';
import { DefaultText, DefaultTextProps } from './DefaultText';

export type LabeledTextProps = DefaultTextProps & {
  title: string;
  value?: string;
  placeholder?: string;
};

export function LabeledText({
  style,
  title,
  value,
  placeholder,
  color,
  size,
  onPress,
  ...props
}: LabeledTextProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={style}>
        {title ? <DefaultText>{title}</DefaultText> : null}
        <View
          style={[
            {
              marginTop: paddings.xs,
              ...borders.default,
              padding: paddings.md,
              backgroundColor: colors.white,
            },
          ]}
        >
          <Text
            style={[
              {
                marginTop: paddings.xs,
                color: colors[color ?? 'black'],
                ...typography[size ?? 'md'],
              },
            ]}
            {...props}
          >
            {value ?? placeholder}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
