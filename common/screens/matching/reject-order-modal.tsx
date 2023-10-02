import { useIssues } from '@/api/platform/issues/useIssues';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Issue } from '@appjusto/types';
import { Modal, ModalProps, Pressable, View } from 'react-native';

interface Props extends ModalProps {
  onConfirm: (issue: Issue) => void;
  onDismiss: () => void;
}
export const RejectOrderModal = ({ onConfirm, onDismiss, ...props }: Props) => {
  // state
  const issues = useIssues('courier-rejects-matching');
  // UI
  return (
    <Modal animationType="slide" {...props}>
      <Pressable style={{ flex: 1 }} onPress={onDismiss}>
        {() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            <View style={{ padding: paddings.lg, backgroundColor: colors.white }}>
              {issues ? (
                issues.map((issue) => (
                  <Pressable key={issue.id} onPress={() => onConfirm(issue)}>
                    <View>
                      <DefaultText
                        style={{ marginVertical: paddings.lg, textAlign: 'center' }}
                        size="md"
                      >
                        {issue.title}
                      </DefaultText>
                    </View>
                  </Pressable>
                ))
              ) : (
                <View style={{ flex: 1 }}>
                  <Loading />
                </View>
              )}
              <DefaultButton
                style={{ marginVertical: paddings.md }}
                variant="outline"
                title="Cancelar"
                onPress={onDismiss}
              />
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
