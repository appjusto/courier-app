import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';

export interface DefaultCardProps extends ViewProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  variant?: 'default' | 'dark';
}

export default function DefaultCard({
  title,
  subtitle,
  icon,
  variant = 'default',
  style,
  ...props
}: DefaultCardProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: paddings.lg,
          ...borders.default,
          borderColor: variant === 'default' ? colors.neutral100 : colors.neutral600,
          backgroundColor: variant === 'default' ? colors.white : colors.black,
        },
        style,
      ]}
      {...props}
    >
      {icon}
      <View style={{ marginLeft: paddings.lg, width: '75%' }}>
        <DefaultText size="sm" color={variant === 'default' ? 'black' : 'white'}>
          {title}
        </DefaultText>
        {subtitle ? (
          <DefaultText
            size="xs"
            color={variant === 'default' ? 'neutral800' : 'white'}
            style={{
              flexWrap: 'wrap',
              width: '95%',
              marginTop: 2,
            }}
          >
            {subtitle}
          </DefaultText>
        ) : null}
      </View>
    </View>
  );
}
