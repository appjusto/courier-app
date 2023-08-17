import React from 'react';
import { Keyboard, TextInput, View, ViewProps } from 'react-native';
import { DigitInput } from './DigitInput';
import { useRefs } from './useRefs';

interface Props extends ViewProps {
  value: string;
  onChange: (text: string) => void;
  length?: number;
}

export const CodeInput = ({ value, onChange, length = 3, style, ...props }: Props) => {
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
          // alignItems: 'center',
          justifyContent: 'space-between',
          // width: '100%',
          // height: 60,
          // borderWidth: 1,
        },
        style,
      ]}
      {...props}
    >
      {refs.map((ref, index) => (
        <View style={{ flexDirection: 'row' }} key={`input-${index}`}>
          <DigitInput
            ref={ref}
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
