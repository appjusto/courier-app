import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';
interface Props extends ViewProps {
  title?: string;
  variant?: 'white' | 'yellow';
  description: string;
}

export function AlertBox({
  title,
  description,
  variant = 'yellow',
  children,
  style,
  ...props
}: Props) {
  return (
    <View
      style={[
        style,
        {
          backgroundColor: variant === 'yellow' ? colors.yellowLight : colors.white,
          borderWidth: 1,
          borderRadius: 8,
          padding: paddings.lg,
        },
      ]}
      {...props}
    >
      {title ? (
        <Text
          style={{
            ...typography.sm,
            marginBottom: paddings.xs,
          }}
        >
          {title}
        </Text>
      ) : null}
      <Text
        style={{
          ...typography.xs,
          color: colors.black,
        }}
      >
        {description}
      </Text>
      {children ? <View style={{ marginTop: paddings.sm }}>{children}</View> : null}
    </View>
  );
}
