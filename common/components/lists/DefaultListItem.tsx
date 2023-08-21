import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Pressable, PressableProps, View } from 'react-native';
import { DefaultText } from '../texts/DefaultText';

interface Props extends PressableProps {
  title: string;
  subtitles?: string[];
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
  bottomView?: React.ReactNode;
  borderless?: boolean;
}

export const DefaultListItem = ({
  title,
  subtitles,
  leftView,
  bottomView,
  borderless = false,
  rightView,
  ...props
}: Props) => {
  return (
    <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })} {...props}>
      <View
        style={[
          {
            flexDirection: 'row',
            padding: paddings.lg,
            alignItems: 'center',
          },
          !borderless
            ? { borderBottomColor: colors.neutral50, borderStyle: 'solid', borderBottomWidth: 1 }
            : {},
        ]}
      >
        {/* leftView */}
        {leftView ? <View style={{ marginRight: paddings.md }}>{leftView}</View> : null}
        {/* main */}
        <View style={{ flex: 1 }}>
          <DefaultText size="md" color="black">
            {title}
          </DefaultText>
          {subtitles?.length ? (
            <View>
              <DefaultText size="sm" color="neutral800" style={{ marginTop: paddings.xs }}>
                {subtitles.join('\n')}
              </DefaultText>
            </View>
          ) : null}
          {bottomView ? <View style={{ marginTop: paddings.sm }}>{bottomView}</View> : null}
        </View>
        {/* rightView */}
        {rightView ? <View style={{ marginLeft: paddings.sm }}>{rightView}</View> : null}
      </View>
    </Pressable>
  );
};
