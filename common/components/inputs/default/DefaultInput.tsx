import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { forwardRef, useRef, useState } from 'react';
import { Pressable, StyleProp, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';
import { ThemeProps } from '../../themes';

export type DefaultInputProps = TextInput['props'] &
  ThemeProps & {
    title?: string;
    subtitle?: string;
    size?: keyof typeof typography;
    limit?: number;
    containerStyle?: StyleProp<ViewStyle> | undefined;
    inputStyle?: StyleProp<TextStyle> | undefined;
    titleStyle?: StyleProp<TextStyle> | undefined;
    subtitleStyle?: StyleProp<TextStyle> | undefined;
    onPress?: () => void;
  };

export const DefaultInput = forwardRef(
  (
    {
      title,
      subtitle,
      value,
      editable,
      size,
      limit,
      style,
      containerStyle,
      inputStyle,
      titleStyle,
      subtitleStyle,
      onFocus,
      onBlur,
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
          {title ? (
            <DefaultText style={titleStyle} color="neutral900">
              {title}
            </DefaultText>
          ) : null}
          {subtitle ? (
            <DefaultText
              size="xs"
              style={[{ marginTop: paddings.sm }, subtitleStyle]}
              color="neutral700"
            >
              {subtitle}
            </DefaultText>
          ) : null}
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
              maxLength={limit}
              editable={editable}
              onPressOut={() => {
                if (onPress) onPress();
              }}
              onFocus={(e) => {
                setFocused(true);
                if (onFocus) onFocus(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                if (onBlur) onBlur(e);
              }}
              value={value}
              {...props}
            />
          </View>
        </Pressable>
        {limit ? (
          <DefaultText style={{ marginTop: paddings['2xs'] }} color="neutral800">{`${
            value?.length ?? 0
          }/${limit} caracteres`}</DefaultText>
        ) : null}
      </View>
    );
  }
);
