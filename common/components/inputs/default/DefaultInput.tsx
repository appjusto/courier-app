import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { forwardRef, useRef, useState } from 'react';
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
      value,
      onPress,
      ...props
    }: DefaultInputProps,
    forwardedRef
  ) => {
    // refs
    const internalRef = useRef<TextInput>(null);
    const ref = (forwardedRef as React.RefObject<TextInput>) ?? internalRef;
    // state
    const [focused, setFocused] = useState(false);
    // UI
    const borderColor = () => {
      if (focused) return colors.black;
      if (!value) return colors.neutral200;
      return colors.neutral700;
    };
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
                borderColor: borderColor(),
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
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              value={value}
              {...props}
            />
          </View>
        </Pressable>
      </View>
    );
  }
);
