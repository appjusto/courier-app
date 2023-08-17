import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { forwardRef, useRef } from 'react';
import { Pressable, StyleProp, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';
import { ThemeProps } from '../../themes';

type DefaultInputProps = TextInput['props'] &
  ThemeProps & {
    title?: string;
    size?: keyof typeof typography;
    containerStyle?: StyleProp<ViewStyle> | undefined;
    inputStyle?: StyleProp<TextStyle> | undefined;
    onPress?: () => void;
  };

export const DefaultInput = forwardRef(
  (
    {
      title,
      editable,
      style,
      containerStyle,
      inputStyle,
      size,
      onPress,
      ...props
    }: DefaultInputProps,
    forwardedRef
  ) => {
    const internalRef = useRef<TextInput>(null);
    const ref = (forwardedRef as React.RefObject<TextInput>) ?? internalRef;
    return (
      <View style={style}>
        <Pressable
          onPress={() => {
            ref?.current?.focus();
            if (onPress) onPress();
          }}
        >
          {title ? <DefaultText color="black">{title}</DefaultText> : null}
          <View
            style={[
              {
                marginTop: paddings.xs,
                ...borders.default,
                padding: paddings.md,
                backgroundColor: colors.white,
              },
              containerStyle,
            ]}
          >
            <TextInput
              ref={ref}
              style={[
                {
                  ...typography[size ?? 'md'],
                  color: editable ? colors.black : colors.neutral700,
                },
                inputStyle,
              ]}
              editable={editable}
              onPressOut={() => {
                if (onPress) onPress();
              }}
              {...props}
            />
          </View>
        </Pressable>
      </View>
    );
  }
);
