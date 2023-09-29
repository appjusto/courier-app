import colors from '@/common/styles/colors';
import { isLargeScreen, percentOfWidth } from '@/common/version/device';
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { DefaultInput } from '../default/DefaultInput';

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const DigitInput = React.forwardRef(
  ({ value, style, onChangeText, ...props }: Props, externalRef) => {
    // UI
    return (
      <DefaultInput
        ref={externalRef ? (externalRef as React.RefObject<TextInput>) : null}
        size={isLargeScreen() ? '2xl' : 'xl'}
        style={[{ width: percentOfWidth(12) }, style]}
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
        onKeyPress={(ev) => {
          if (ev.nativeEvent.key === 'Backspace') onChangeText('');
        }}
        {...props}
      />
    );
  }
);
