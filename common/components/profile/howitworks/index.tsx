import { URL_APPJUSTO_FRESHDESK_COURIERS } from '@/common/constants/urls';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Linking, Pressable } from 'react-native';
import { DefaultView } from '../../containers/DefaultView';
import { DefaultText } from '../../texts/DefaultText';
import DefaultCard from '../../views/DefaultCard';
import { HowItWorksIcon } from './icon';

export type HowAppJustoWorksContentType = 'approval' | 'revenue' | 'fleets' | 'blocks' | 'safety';

interface Props {
  onSelect: (screen: HowAppJustoWorksContentType) => void;
}

export default function HowAppJustoWorksContent({ onSelect }: Props) {
  // UI
  return (
    <DefaultView style={{ padding: paddings.lg, backgroundColor: colors.neutral50 }}>
      <DefaultText size="lg" bold>
        Entenda mais sobre o AppJusto
      </DefaultText>
      <DefaultText size="md" style={{ marginTop: paddings.sm }}>
        Tire suas dúvidas e entenda os principais benefícios do AppJusto para o entregador
      </DefaultText>
      <Pressable onPress={() => onSelect('approval')} style={{ marginTop: paddings.lg }}>
        <DefaultCard
          icon={<HowItWorksIcon iconName="approval" />}
          title="Aprovação de cadastro"
          subtitle="Entenda como funciona o processo de aprovação de cadastro"
        />
      </Pressable>
      <Pressable onPress={() => onSelect('revenue')} style={{ marginTop: paddings.sm }}>
        <DefaultCard
          icon={<HowItWorksIcon iconName="revenue" />}
          title="Recebimento"
          subtitle="Entenda como funciona o fluxo de recebimento do AppJusto"
        />
      </Pressable>
      <Pressable onPress={() => onSelect('fleets')} style={{ marginTop: paddings.sm }}>
        <DefaultCard
          icon={<HowItWorksIcon iconName="fleets" />}
          title="Frotas"
          subtitle="Entenda nossa proposta para de autonomia no delivery"
        />
      </Pressable>
      <Pressable onPress={() => onSelect('blocks')} style={{ marginTop: paddings.sm }}>
        <DefaultCard
          icon={<HowItWorksIcon iconName="blocks" />}
          title="Bloqueios"
          subtitle="Entenda como funciona o processo de bloqueios no AppJusto"
        />
      </Pressable>
      <Pressable onPress={() => onSelect('safety')} style={{ marginTop: paddings.sm }}>
        <DefaultCard
          icon={<HowItWorksIcon iconName="safety" />}
          title="Segurança"
          subtitle="Conheça as condições de segurança forncecidas pelo AppJusto"
        />
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL(URL_APPJUSTO_FRESHDESK_COURIERS)}
        style={{ marginTop: paddings.sm }}
      >
        <DefaultCard
          icon={<HowItWorksIcon iconName="help" />}
          title="Ainda tem dúvidas?"
          subtitle="Acesse a nossa base de conhecimento no Freshdesk"
        />
      </Pressable>
    </DefaultView>
  );
}
