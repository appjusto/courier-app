import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import React from 'react';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { DefaultText } from '../../texts/DefaultText';

interface Props extends ViewProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function DefaultCard({ title, subtitle, icon, style, ...props }: Props) {
  return (
    <View
      style={[
        {
          ...borders.default,
          borderColor: colors.neutral50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: colors.white,
          padding: paddings.lg,
        },
        style,
      ]}
      {...props}
    >
      {icon}
      <View style={{ marginLeft: paddings.lg, width: '75%' }}>
        <DefaultText size="sm" color="black">
          {title}
        </DefaultText>
        <DefaultText
          size="xs"
          color="neutral800"
          style={{
            flexWrap: 'wrap',
            width: '95%',
            marginTop: 2,
          }}
        >
          {subtitle}
        </DefaultText>
      </View>
    </View>
  );
}
