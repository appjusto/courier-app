import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { Fleet } from '@appjusto/types';
import { View, ViewProps } from 'react-native';
import { FleetDetail } from '../fleet-detail';

interface Props extends ViewProps {
  fleet: Fleet;
  loading: boolean;
  onSave: () => void;
}

export const CreateFleetReviewParams = ({ fleet, loading, onSave, style, ...props }: Props) => {
  // UI
  return (
    <DefaultScrollView style={[{}, style]} {...props}>
      <View style={{ paddingHorizontal: paddings.lg, marginTop: paddings.lg }}>
        <DefaultText style={{ ...lineHeight.lg }} size="lg">
          Revise as informações da sua frota antes de criá-la
        </DefaultText>
      </View>
      <FleetDetail fleet={fleet} showDescription={false} />
      <View style={{ flex: 1 }} />
      <View style={{ padding: paddings.lg }}>
        <DefaultButton
          title="Criar frota"
          disabled={!fleet.name.length || !fleet.description.length || loading}
          onPress={onSave}
        />
      </View>
    </DefaultScrollView>
  );
};
