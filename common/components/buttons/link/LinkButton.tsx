import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { Pressable, StyleProp, TextStyle, View, ViewProps } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';

type LinkButtonProps = ViewProps & {
  size?: 'small' | 'medium';
  disabled?: boolean;
  variant?: 'default' | 'ghost';
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};

export const LinkButton = ({
  size = 'small',
  disabled,
  variant = 'default',
  style,
  textStyle,
  children,
  ...props
}: LinkButtonProps) => {
  return (
    <View style={[style]}>
      <Pressable disabled={disabled} {...props}>
        {({ pressed }) => (
          <View
            style={[
              {
                padding: paddings.md,
              },
            ]}
          >
            <DefaultText
              style={[
                size === 'small' ? { ...typography.sm } : { ...typography.md },
                {
                  color: pressed ? colors.neutral900 : colors.black,
                  textDecorationLine: variant === 'ghost' ? 'none' : 'underline',
                },
                textStyle,
              ]}
            >
              {children}
            </DefaultText>
          </View>
        )}
      </Pressable>
    </View>
  );
};
