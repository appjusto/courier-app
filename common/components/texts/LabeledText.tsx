import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { Pressable, Text, View } from 'react-native';
import { DefaultText } from './DefaultText';
import { LabeledTextProps } from './types';

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
        <View
          style={[
            {
              ...borders.default,
              padding: paddings.md,
              backgroundColor: colors.white,
            },
          ]}
        >
          <DefaultText color="green600">{title}</DefaultText>
          <Text
            style={[
              {
                marginTop: paddings.xs,
                ...typography[size ?? 'sm'],
                color: colors[color ?? 'black'],
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
