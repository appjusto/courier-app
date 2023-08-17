import colors from '@/common/styles/colors';
import React, { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { DefaultInput } from '../default/DefaultInput';

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const DigitInput = React.forwardRef(
  ({ value, onChangeText, ...props }: Props, externalRef) => {
    // state
    const [focused, setFocused] = useState(false);
    const borderColor = () => {
      if (focused) return colors.black;
      if (!value) return colors.neutral200;
      return colors.neutral700;
    };
    // UI
    return (
      <DefaultInput
        ref={externalRef ? (externalRef as React.RefObject<TextInput>) : null}
        size="2xl"
        style={{ width: 60, height: 60 }}
        containerStyle={[
          {
            borderColor: borderColor(),
          },
        ]}
        inputStyle={[
          {
            textAlign: 'center',
            color: colors.black,
          },
        ]}
        maxLength={1}
        keyboardType="number-pad"
        selectTextOnFocus
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyPress={(ev) => {
          if (ev.nativeEvent.key === 'Backspace') onChangeText('');
        }}
        {...props}
      />
    );
  }
);
