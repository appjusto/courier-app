import borders from '@/common/styles/borders';
import colors, { ColorName } from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { AlertOctagon, CheckCircle2, Info, XCircle } from 'lucide-react-native';
import React from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import { DefaultText } from '../texts/DefaultText';

type MessageBoxProps = Text['props'] & {
  title?: string;
  variant?: 'info' | 'success' | 'error' | 'warning';
  iconless?: boolean;
  textStyle?: StyleProp<TextStyle>;
};

export function MessageBox({
  title,
  variant = 'info',
  iconless,
  children,
  style,
  textStyle,
  ...props
}: MessageBoxProps) {
  // UI
  const backgroundColor = () => {
    if (variant === 'info') return colors.info100;
    if (variant === 'success') return colors.success100;
    if (variant === 'error') return colors.error100;
    if (variant === 'warning') return colors.warning100;
  };
  const borderColor = () => {
    if (variant === 'info') return colors.info300;
    if (variant === 'success') return colors.success300;
    if (variant === 'error') return colors.error300;
    if (variant === 'warning') return colors.warning300;
  };
  const icon = () => {
    if (variant === 'info') return <Info color={colors.info500} size={16} />;
    if (variant === 'success') return <CheckCircle2 color={colors.success500} size={16} />;
    if (variant === 'error') return <XCircle color={colors.error500} size={16} />;
    if (variant === 'warning') return <AlertOctagon color={colors.warning500} size={16} />;
  };
  const textColor = (): ColorName => {
    if (variant === 'info') return 'info900';
    if (variant === 'success') return 'success900';
    if (variant === 'error') return 'error900';
    if (variant === 'warning') return 'warning900';
    return 'black';
  };
  return (
    <View
      style={[
        style,
        {
          padding: paddings.lg,
          backgroundColor: backgroundColor(),
          ...borders.default,
          borderColor: borderColor(),
        },
      ]}
      {...props}
    >
      <View style={{ flexDirection: 'row' }}>
        {!iconless ? <View style={{ marginRight: paddings.sm }}>{icon()}</View> : null}
        <View>
          {title ? (
            <DefaultText style={{ marginBottom: paddings.xs }} size="md" color="black">
              {title}
            </DefaultText>
          ) : null}
          <DefaultText
            color={textColor()}
            size="sm"
            style={[
              {
                ...lineHeight.sm,
                flexWrap: 'wrap',
                marginRight: iconless ? undefined : paddings.lg,
              },
              textStyle,
            ]}
          >
            {children}
          </DefaultText>
        </View>
      </View>
    </View>
  );
}
