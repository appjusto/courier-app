import { forwardRef, useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { DefaultInput } from '../default/DefaultInput';
import patterns from './patterns';
import { PatternInputProps } from './types';

export const PatternInput = forwardRef(
  (
    {
      value,
      pattern,
      patternObject,
      placeholder: unfocusedPlaceholder,
      onChangeText,
      onBlur,
      onFocus,
      ...props
    }: PatternInputProps,
    forwardedRef
  ) => {
    const { mask, parser, formatter } = patternObject ?? (pattern ? patterns[pattern] : {});
    // state
    const [placeholder, setPlaceholder] = useState(unfocusedPlaceholder);
    const [error, setError] = useState<string>();
    const formattedValue = value ? (formatter ? formatter(String(value)) : value) : value;
    // handlers
    const onChangeHandler = (text: string) => {
      if (onChangeText) onChangeText(parser ? parser(text) : text);
    };
    const onFocusHandler = (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (mask) setPlaceholder(mask);
      setError('');
      if (onFocus) onFocus(ev);
    };
    const onBlurHandler = (ev: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setPlaceholder(unfocusedPlaceholder);
      // setError(errorMessage);
      if (onBlur) onBlur(ev);
    };
    // UI
    return (
      <DefaultInput
        value={formattedValue}
        placeholder={placeholder}
        onChangeText={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        maxLength={mask ? mask.length : undefined}
        // errorMessage={error}
        ref={forwardedRef}
        {...props}
      />
    );
  }
);