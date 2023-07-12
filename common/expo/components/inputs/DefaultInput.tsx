import borders from '@/common/constants/borders';
import colors from '@/common/constants/colors';
import paddings from '@/common/constants/paddings';
import typography from '@/common/constants/typography';
import { forwardRef, useRef } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { DefaultText } from '../texts/DefaultText';
import { DefaultInputProps } from './types';

export const DefaultInput = forwardRef(
  ({ title, style, size, ...props }: DefaultInputProps, forwardedRef) => {
    const internalRef = useRef<TextInput>(null);
    const ref = (forwardedRef as React.RefObject<TextInput>) ?? internalRef;
    return (
      <Pressable
        onPress={() => {
          ref?.current?.focus();
        }}
      >
        <View
          style={[
            {
              ...borders.default,
              padding: paddings.md,
              backgroundColor: colors.white,
            },
            style,
          ]}
        >
          {title ? (
            <DefaultText style={{ color: colors.green600 }}>
              {title}
            </DefaultText>
          ) : null}
          <TextInput
            ref={ref}
            style={[{ ...typography[size ?? 'md'] }, style]}
            {...props}
          />
        </View>
      </Pressable>
    );
  }
);
