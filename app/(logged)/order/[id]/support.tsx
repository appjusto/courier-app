import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveOrder } from '@/api/orders/useObserveOrder';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { SelectIssueModal } from '@/common/components/modals/issues/select-issue-modal';
import { useOngoingIssueType } from '@/common/components/modals/issues/useOngoingIssueType';
import { Loading } from '@/common/components/views/Loading';
import DefaultCard from '@/common/components/views/cards/DefaultCard';
import { DefaultCardIcon } from '@/common/components/views/cards/icon';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { URL_APPJUSTO_WHATSAPP } from '@/common/constants/urls';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Issue } from '@appjusto/types';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Linking, Pressable, View } from 'react-native';

export default function OrderSupportScreen() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // params
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;
  // state
  const order = useObserveOrder(orderId);
  const businessId = order?.business?.id;
  const [loading, setLoading] = useState(false);
  const issueType = useOngoingIssueType(order);
  const [reportIssueModalShown, setReportIssueModalShown] = useState(false);
  const [dropOrderModalShown, setDropOderModalShown] = useState(false);
  // tracking
  useTrackScreenView('Ajuda com a corrida');
  // handlers
  const createIncident = (issue: Issue, comment: string) => {
    trackEvent('Problema relatado');
    setLoading(true);
    api
      .incidents()
      .createIncident(issue, comment, orderId)
      .catch((error: unknown) => {
        if (error instanceof Error) showToast(error.message, 'error');
      })
      .finally(() => {
        setReportIssueModalShown(false);
        setLoading(false);
      });
  };
  const dropOrder = (issue: Issue, comment: string) => {
    trackEvent('Corrida recusada');
    setLoading(true);
    api
      .orders()
      .dropOrder(orderId, issue, comment)
      .then(() => {
        setDropOderModalShown(false);
        setLoading(false);
        router.replace('/home/');
      })
      .catch((error: unknown) => {
        setDropOderModalShown(false);
        setLoading(false);
        if (error instanceof Error) showToast(error.message, 'error');
      });
  };
  // UI
  if (!order) return <Loading title="Ajuda com a corrida" />;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Ajuda com a corrida' }} />
      {/* modals */}
      <SelectIssueModal
        title="Qual o problema que você quer relatar?"
        issueType={issueType}
        visible={reportIssueModalShown}
        onConfirm={createIncident}
        loading={loading}
        onDismiss={() => setReportIssueModalShown(false)}
      />
      <SelectIssueModal
        title="Por que você precisa desistir da entrega?"
        issueType="courier-cancel"
        visible={dropOrderModalShown}
        onConfirm={dropOrder}
        loading={loading}
        onDismiss={() => setDropOderModalShown(false)}
      />
      {/* */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.neutral50,
          paddingVertical: paddings.xl,
          paddingHorizontal: paddings.lg,
        }}
      >
        <Pressable onPress={() => setDropOderModalShown(true)}>
          {() => (
            <DefaultCard
              icon={<DefaultCardIcon iconName="cancel" variant="warning" />}
              title="Desistir da corrida"
              subtitle="Você pode desistir da corrida até coletar o pedido"
            />
          )}
        </Pressable>
        <Pressable onPress={() => setReportIssueModalShown(true)}>
          {() => (
            <DefaultCard
              style={{ marginTop: paddings.lg }}
              icon={<DefaultCardIcon iconName="alert" variant="warning" />}
              title="Tive um problema"
              subtitle="Abrir uma ocrrência para relatar algum problema durante a corrida"
            />
          )}
        </Pressable>
        {businessId ? (
          <Pressable
            onPress={() => {
              router.push({
                pathname: '/(logged)/order/[id]/chat/[counterpart]',
                params: { id: orderId, counterpart: businessId },
              });
            }}
          >
            {() => (
              <DefaultCard
                style={{ marginTop: paddings.lg }}
                icon={<DefaultCardIcon iconName="chat" variant="warning" />}
                title="Preciso falar com o restaurante"
                subtitle="Abrir chat direto com o restaurante"
              />
            )}
          </Pressable>
        ) : null}
        <Pressable onPress={() => Linking.openURL(URL_APPJUSTO_WHATSAPP)}>
          {() => (
            <DefaultCard
              style={{ marginTop: paddings.lg }}
              icon={<DefaultCardIcon iconName="chat" variant="warning" />}
              title="Preciso falar com o AppJusto"
              subtitle="Fale com a gente através do nosso WhatsApp"
            />
          )}
        </Pressable>
      </View>
    </DefaultScrollView>
  );
}
