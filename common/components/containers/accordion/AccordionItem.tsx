import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';

export interface AccordionItemData {
  title: string;
  subtitle?: string;
  body?: { title?: string; text: string }[];
  children?: React.ReactNode | React.ReactNode[];
}

interface Props extends ViewProps {
  data: AccordionItemData;
  collpased?: boolean;
  onPress: () => void;
}

export const AccordionItem = ({ data, collpased, style, onPress, ...props }: Props) => {
  const { title, subtitle, body, children } = data;
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          {
            padding: paddings.lg,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: collpased ? colors.gray500 : colors.gray200,
          },
          style,
        ]}
        {...props}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ maxWidth: '90%' }}>
            <DefaultText size="sm">{title}</DefaultText>
            {subtitle ? (
              <DefaultText size="xs" color="gray700">
                {subtitle}
              </DefaultText>
            ) : null}
          </View>
          <Feather size={28} name={collpased ? 'chevron-up' : 'chevron-down'} />
        </View>
        <View>
          <View>
            {collpased && body
              ? body.map((item, index) => (
                  <View
                    key={item.text}
                    style={{ marginTop: index === 0 ? paddings.lg : paddings['2xl'] }}
                  >
                    {item.title ? (
                      <DefaultText size="sm" color="gray700" bold>
                        {item.title}
                      </DefaultText>
                    ) : null}
                    {item.text ? (
                      <DefaultText size="sm" color="gray700">
                        {item.text}
                      </DefaultText>
                    ) : null}
                  </View>
                ))
              : null}
          </View>
          {collpased && children ? children : null}
        </View>
      </View>
    </Pressable>
  );
};
