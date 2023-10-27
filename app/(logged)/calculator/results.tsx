import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { processCourierCosts } from '@/api/couriers/costs/processCourierCosts';
import { useObserveCourierCosts } from '@/api/couriers/costs/useObserveCourierCosts';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { Loading } from '@/common/components/views/Loading';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { formatCurrency } from '@/common/formatters/currency';
import borders from '@/common/styles/borders';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { CourierCosts } from '@appjusto/types';
import crashlytics from '@react-native-firebase/crashlytics';
import { Stack, router } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { RefObject, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import ViewShot from 'react-native-view-shot';

export default function CalculatorResultsScreen() {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // refs
  const ref = useRef<ViewShot>() as RefObject<ViewShot>;
  // tracking
  useTrackScreenView('Calculadora Resultados');
  // state
  const costs = useObserveCourierCosts();
  const [updatedCosts, setUpdatedCosts] = useState<Partial<CourierCosts>>();
  // side effects
  useEffect(() => {
    if (!costs) return;
    if (updatedCosts) return;
    console.log('processing...');
    const result = processCourierCosts(costs);
    if (result) setUpdatedCosts(result);
    else {
      router.back();
      showToast('Não foi possível calcular os ganhos. Verifique suas respostas.', 'error');
    }
  }, [costs, updatedCosts, showToast]);
  useEffect(() => {
    if (!updatedCosts) return;
    console.log('updating...');
    api.couriers().updateCourierCosts(updatedCosts);
  }, [updatedCosts, api]);
  // handlers
  const shareResults = () => {
    if (!ref.current?.capture) {
      showToast('Não foi possível criar a imagem com seus resultados.', 'error');
      return;
    }
    ref.current
      .capture()
      .then((uri) => {
        console.log('do something with ', uri);
        Sharing.shareAsync(`file://${uri}`, { mimeType: 'image/jpeg' }).catch((error) => {
          console.error(error);
          if (error instanceof Error) crashlytics().recordError(error);
          showToast('Não foi possível compartilhar a imagem dos seus resultados.', 'error');
        });
      })
      .catch((error) => {
        console.error(error);
        if (error instanceof Error) crashlytics().recordError(error);
        showToast('Não foi possível criar a imagem com seus resultados.', 'error');
      });
  };
  // UI
  if (!updatedCosts) return <Loading title="Calculadora de ganhos" />;
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Calculadora de ganhos' }} />
      <DefaultView style={{ padding: paddings.lg }}>
        <DefaultText style={{ ...lineHeight.lg }} size="lg">
          Aqui estão os seus custos e ganhos por corrida e por hora:
        </DefaultText>
        <DefaultText style={{ marginTop: paddings.lg, ...lineHeight.md }} size="md">
          {`Trabalhando ${updatedCosts.hoursPerDay} horas e fazendo ${updatedCosts.ordersPerDay} corridas por dia`}
          <DefaultText
            style={{ ...lineHeight.md }}
            size="md"
            bold
          >{`, você ganhará, em média, ${formatCurrency(
            updatedCosts.processing?.hourRevenue ?? 0
          )} por hora `}</DefaultText>
          já descontado os custos de trabalho.
        </DefaultText>
        <DefaultText style={{ marginTop: paddings.lg, ...lineHeight.md }} size="md">
          Esse valor é
          <DefaultText style={{ ...lineHeight.md }} size="md" bold>
            {` ${updatedCosts.processing?.minimumWageComparison.toFixed(
              2
            )}x do valor proporcional `}
          </DefaultText>
          do salário mínimo por hora e
          <DefaultText style={{ ...lineHeight.md }} size="md" bold>
            {` ${Math.round(updatedCosts.processing?.livingWageComparison ?? 0)}% do valor ideal `}
          </DefaultText>
          calculado pelo DIEESE, considerando uma jornada de 220 horas por mês.
        </DefaultText>
        <View style={{ marginTop: paddings.lg }}>
          <ViewShot
            style={{ backgroundColor: colors.white }}
            ref={ref}
            options={{ fileName: 'meus-ganhos', format: 'jpg', quality: 0.9 }}
          >
            <View
              style={{
                padding: paddings.lg,
                ...borders.default,
                borderColor: colors.neutral100,
              }}
            >
              <DefaultText size="lg">Custos fixos</DefaultText>
              <DefaultText style={{ marginTop: paddings.xs }} size="md" color="neutral700">
                Não diretamente relacionados ao número de pedidos
              </DefaultText>
              <View
                style={{
                  marginTop: paddings.lg,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: paddings.lg,
                }}
              >
                <View>
                  <DefaultText>Por dia</DefaultText>
                  <DefaultText style={{ marginTop: paddings.xs }} size="lg" color="black">
                    {formatCurrency(updatedCosts.processing?.dailyCosts ?? 0)}
                  </DefaultText>
                </View>
                <View>
                  <DefaultText>Por mês</DefaultText>
                  <DefaultText style={{ marginTop: paddings.xs }} size="lg" color="black">
                    {formatCurrency(updatedCosts.processing?.monthlyCosts ?? 0)}
                  </DefaultText>
                </View>
                <View>
                  <DefaultText>Por ano</DefaultText>
                  <DefaultText style={{ marginTop: paddings.xs }} size="lg" color="black">
                    {formatCurrency(updatedCosts.processing?.yearlyCosts ?? 0)}
                  </DefaultText>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: paddings.lg,
                padding: paddings.lg,
                ...borders.default,
                borderColor: colors.neutral100,
              }}
            >
              <DefaultText size="lg">Custos por pedidos</DefaultText>
              <View
                style={{
                  marginTop: paddings.lg,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: paddings.lg,
                }}
              >
                <View>
                  <DefaultText>Combustível</DefaultText>
                  <DefaultText style={{ marginTop: paddings.xs }} size="lg" color="black">
                    {formatCurrency(updatedCosts.processing?.orderGasCost ?? 0)}
                  </DefaultText>
                </View>
                <View>
                  <DefaultText>Proporcional diário</DefaultText>
                  <DefaultText style={{ marginTop: paddings.xs }} size="lg" color="black">
                    {formatCurrency(updatedCosts.processing?.dailyCostsPerOrder ?? 0)}
                  </DefaultText>
                </View>
              </View>
              <View
                style={{
                  marginTop: paddings.lg,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: paddings.lg,
                }}
              >
                <View>
                  <DefaultText>Propocional mensal</DefaultText>
                  <DefaultText style={{ marginTop: paddings.xs }} size="lg" color="black">
                    {formatCurrency(updatedCosts.processing?.monthlyCostsPerOrder ?? 0)}
                  </DefaultText>
                </View>
                <View>
                  <DefaultText>Proporcional anual</DefaultText>
                  <DefaultText style={{ marginTop: paddings.xs }} size="lg" color="black">
                    {formatCurrency(updatedCosts.processing?.yearlyCostsPerOrder ?? 0)}
                  </DefaultText>
                </View>
              </View>
              <View
                style={{
                  marginTop: paddings.lg,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: paddings.lg,
                }}
              >
                <View>
                  <DefaultText>Total de custos por pedido</DefaultText>
                  <DefaultText style={{ marginTop: paddings.xs }} size="lg" color="black">
                    {formatCurrency(updatedCosts.processing?.costsPerOrder ?? 0)}
                  </DefaultText>
                </View>
              </View>
            </View>
          </ViewShot>
        </View>
        <DefaultButton
          style={{ marginTop: paddings.lg }}
          title="Compartilhar"
          onPress={shareResults}
        />
      </DefaultView>
    </DefaultScrollView>
  );
}
