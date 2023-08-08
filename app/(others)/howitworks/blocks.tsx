import { BlockProcessContent } from '@/common/components/profile/howitworks/BlockProcessContent';
import { ScrollView } from 'react-native';

export default function BlockProcess() {
  return (
    <ScrollView scrollIndicatorInsets={{ right: 1 }}>
      <BlockProcessContent variant="how-it-works" />
    </ScrollView>
  );
}
