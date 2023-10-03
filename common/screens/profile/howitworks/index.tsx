import { URL_APPJUSTO_FRESHDESK_COURIERS } from '@/common/constants/urls';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Linking, Pressable } from 'react-native';
import { DefaultView } from '../../../components/containers/DefaultView';
import { DefaultText } from '../../../components/texts/DefaultText';
import DefaultCard from '../../../components/views/cards/DefaultCard';
import { DefaultCardIcon } from '../../../components/views/cards/icon';

export type HowAppJustoWorksContentType = 'approval' | 'revenue' | 'fleets' | 'blocks' | 'safety';

interface Props {
  title: string;
  onSelect: (screen: HowAppJustoWorksContentType) => void;
}

export default function HowAppJustoWorksContent({ title, onSelect }: Props) {
  // UI
  return (
    <DefaultView style={{ padding: paddings.lg, backgroundColor: colors.neutral50 }}>
      <DefaultText size="lg" style={{ marginTop: paddings.sm }}>
        {title}
      </DefaultText>
      <Pressable onPress={() => onSelect('approval')} style={{ marginTop: paddings.lg }}>
        <DefaultCard
          icon={<DefaultCardIcon iconName="approval" />}
          title="Aprovação de cadastro"
          subtitle="Entenda como funciona o processo de aprovação de cadastro"
        />
      </Pressable>
      <Pressable onPress={() => onSelect('revenue')} style={{ marginTop: paddings.sm }}>
        <DefaultCard
          icon={<DefaultCardIcon iconName="revenue" />}
          title="Recebimento"
          subtitle="Entenda como funciona o fluxo de recebimento do AppJusto"
        />
      </Pressable>
      <Pressable onPress={() => onSelect('fleets')} style={{ marginTop: paddings.sm }}>
        <DefaultCard
          icon={<DefaultCardIcon iconName="fleets" />}
          title="Frotas"
          subtitle="Entenda nossa proposta para de autonomia no delivery"
        />
      </Pressable>
      <Pressable onPress={() => onSelect('blocks')} style={{ marginTop: paddings.sm }}>
        <DefaultCard
          icon={<DefaultCardIcon iconName="blocks" />}
          title="Bloqueios"
          subtitle="Entenda como funciona o processo de bloqueios no AppJusto"
        />
      </Pressable>
      <Pressable onPress={() => onSelect('safety')} style={{ marginTop: paddings.sm }}>
        <DefaultCard
          icon={<DefaultCardIcon iconName="safety" />}
          title="Segurança"
          subtitle="Conheça as condições de segurança forncecidas pelo AppJusto"
        />
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL(URL_APPJUSTO_FRESHDESK_COURIERS)}
        style={{ marginTop: paddings.sm }}
      >
        <DefaultCard
          icon={<DefaultCardIcon iconName="help" />}
          title="Ainda tem dúvidas?"
          subtitle="Acesse a nossa base de conhecimento no Freshdesk"
        />
      </Pressable>
    </DefaultView>
  );
}
