import React from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  size?: number;
}

export function CircledView({ size = 48, children, style, ...props }: Props) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
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
