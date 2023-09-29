import React from 'react';
import { Keyboard, StyleProp, TextInput, TextStyle, View, ViewProps } from 'react-native';
import { DigitInput } from './DigitInput';
import { useRefs } from './useRefs';

interface Props extends ViewProps {
  value: string;
  onChange: (text: string) => void;
  length?: number;
  digitStyle?: StyleProp<TextStyle>;
}

export const CodeInput = ({ value, length = 3, style, digitStyle, onChange, ...props }: Props) => {
  // state
  const values = value.split('');
  // refs
  const refs = useRefs<TextInput>().slice(0, length);
  // UI handlers
  const updateValues = (
    char: string,
    index: number,
    nextInputRef?: React.RefObject<TextInput>,
    previousInputRef?: React.RefObject<TextInput>
  ) => {
    if (!char && values[index] === ' ') {
      previousInputRef?.current?.focus();
      return;
    }
    onChange([...values.slice(0, index), char ? char : ' ', ...values.slice(index + 1)].join(''));
    if (char) {
      if (nextInputRef?.current) nextInputRef.current.focus();
      else Keyboard.dismiss();
    }
  };
  React.useEffect(() => {
    refs.find(() => true)?.current?.focus();
  }, []);
  // UI
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        style,
      ]}
      {...props}
    >
      {refs.map((ref, index) => (
        <View style={{ flexDirection: 'row' }} key={`input-${index}`}>
          <DigitInput
            ref={ref}
            style={digitStyle}
            value={value[index] === ' ' ? '' : value[index]}
            blurOnSubmit={false}
            returnKeyType={index + 1 === refs.length ? 'done' : 'next'}
            onChangeText={(char) => updateValues(char, index, refs[index + 1], refs[index - 1])}
            onSubmitEditing={() => {
              if (index + 1 < refs.length) refs[index + 1]?.current?.focus();
              else Keyboard.dismiss();
            }}
            importantForAutofill="no"
            maxLength={1}
          />
        </View>
      ))}
    </View>
  );
};
