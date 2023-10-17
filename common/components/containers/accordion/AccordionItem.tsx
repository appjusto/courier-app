import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
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
            borderColor: collpased ? colors.neutral500 : colors.neutral200,
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
              <DefaultText size="xs" color="neutral700">
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
                    style={{ marginTop: index === 0 ? paddings.sm : paddings.xl }}
                  >
                    {item.title ? (
                      <DefaultText size="sm-overline" color="black" bold>
                        {item.title}
                      </DefaultText>
                    ) : null}
                    {item.text ? (
                      <DefaultText style={{ ...lineHeight.sm }} size="sm">
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
