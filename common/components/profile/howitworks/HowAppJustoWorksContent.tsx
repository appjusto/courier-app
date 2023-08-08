import { IconApprovalProcess } from '@/common/components/profile/howitworks/approval/icon';
import { IconBlocks } from '@/common/components/profile/howitworks/blocks/icon';
import { IconFleets } from '@/common/components/profile/howitworks/fleets/icon';
import { IconFreshdesk } from '@/common/components/profile/howitworks/freshdesk/icon';
import { IconSafety } from '@/common/components/profile/howitworks/safety/icon';
import { URL_APPJUSTO_FRESHDESK_COURIERS } from '@/common/constants/urls';
import paddings from '@/common/styles/paddings';
import { useRouter } from 'expo-router';
import { Linking, Pressable } from 'react-native';
import { DefaultView } from '../../containers/DefaultView';
import { DefaultText } from '../../texts/DefaultText';
import DefaultCard from '../../views/DefaultCard';
import { IconRevenue } from './revenue/icon';

export const HowAppJustoWorksContent = () => {
  // context
  const router = useRouter();
  // UI
  return (
    <DefaultView style={{ padding: paddings.lg }}>
      <DefaultText size="2xl">Entenda mais sobre o AppJusto</DefaultText>
      <DefaultText
        size="sm"
        color="gray700"
        style={{
          marginTop: paddings.lg,
        }}
      >
        Tire suas dúvidas e entenda os principais benefícios do AppJusto para o entregador
      </DefaultText>
      <Pressable
        onPress={() => router.push('/profile/howitworks/approval')}
        style={{ marginTop: paddings.lg }}
      >
        <DefaultCard
          icon={<IconApprovalProcess />}
          title="Aprovação de cadastro"
          subtitle="Entenda como funciona o processo de aprovação de cadastro"
        />
      </Pressable>
      <Pressable
        onPress={() => router.push('/profile/howitworks/revenue')}
        style={{ marginTop: paddings.sm }}
      >
        <DefaultCard
          icon={<IconRevenue />}
          title="Recebimento"
          subtitle="Entenda como funciona o fluxo de recebimento do AppJusto"
        />
      </Pressable>
      <Pressable
        onPress={() => router.push('/profile/howitworks/fleets')}
        style={{ marginTop: paddings.sm }}
      >
        <DefaultCard
          icon={<IconFleets />}
          title="Frotas"
          subtitle="Entenda nossa proposta para de autonomia no delivery"
        />
      </Pressable>
      <Pressable
        onPress={() => router.push('/profile/howitworks/blocks')}
        style={{ marginTop: paddings.sm }}
      >
        <DefaultCard
          icon={<IconBlocks />}
          title="Bloqueios"
          subtitle="Entenda como funciona o processo de bloqueios no AppJusto"
        />
      </Pressable>
      <Pressable
        onPress={() => router.push('/profile/howitworks/safety')}
        style={{ marginTop: paddings.sm }}
      >
        <DefaultCard
          icon={<IconSafety />}
          title="Segurança"
          subtitle="Conheça as condições de segurança forncecidas pelo AppJusto"
        />
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL(URL_APPJUSTO_FRESHDESK_COURIERS)}
        style={{ marginTop: paddings.sm }}
      >
        <DefaultCard
          icon={<IconFreshdesk />}
          title="Ainda tem dúvidas?"
          subtitle="Acesse a nossa base de conhecimento no Freshdesk"
        />
      </Pressable>
    </DefaultView>
  );
};
