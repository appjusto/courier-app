import React from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export function RoundedView({ children, style, ...props }: Props) {
  return (
    <View
      style={[
        {
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          overflow: 'hidden',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
