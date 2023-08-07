import paddings from '@/common/styles/paddings';
import { Pressable, PressableProps, View } from 'react-native';
import { DefaultText } from '../texts/DefaultText';

interface Props extends PressableProps {
  title: string;
  subtitles?: string[];
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
  bottomView?: React.ReactNode;
}

export const DefaultListItem = ({
  title,
  subtitles,
  leftView,
  bottomView,
  rightView,
  ...props
}: Props) => {
  return (
    <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })} {...props}>
      <View style={{ flexDirection: 'row', padding: paddings.lg }}>
        {/* leftView */}
        {leftView ? <View style={{ marginRight: paddings.sm }}>{leftView}</View> : null}
        {/* main */}
        <View style={{ flex: 1 }}>
          <DefaultText size="sm">{title}</DefaultText>
          {subtitles?.length ? (
            <View>
              <DefaultText size="sm" color="gray700" style={{ marginTop: paddings.sm }}>
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
