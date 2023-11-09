import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { Pressable, StyleProp, TextStyle, View, ViewProps } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';

type LinkButtonProps = ViewProps & {
  size?: keyof typeof typography;
  disabled?: boolean;
  variant?: 'default' | 'ghost';
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};

export const LinkButton = ({
  size = 'sm',
  disabled,
  variant = 'default',
  style,
  textStyle,
  children,
  ...props
}: LinkButtonProps) => {
  return (
    <View
      style={[
        {
          padding: paddings.md,
        },
        style,
      ]}
    >
      <Pressable disabled={disabled} {...props}>
        {({ pressed }) => (
          <DefaultText
            style={[
              { ...typography[size] },
              {
                color: pressed ? colors.neutral900 : colors.black,
                textDecorationLine: variant === 'ghost' ? 'none' : 'underline',
              },
              textStyle,
            ]}
          >
            {children}
          </DefaultText>
        )}
      </Pressable>
    </View>
  );
};
