import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { forwardRef, useRef } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';
import { DefaultInputProps } from './types';

export const DefaultInput = forwardRef(
  ({ title, editable, style, size, onPress, ...props }: DefaultInputProps, forwardedRef) => {
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
          <View
            style={[
              {
                ...borders.default,
                padding: paddings.md,
                backgroundColor: colors.white,
              },
            ]}
          >
            {title ? <DefaultText color="green600">{title}</DefaultText> : null}
            <TextInput
              ref={ref}
              style={[
                { ...typography[size ?? 'md'], color: editable ? colors.gray700 : colors.gray500 },
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