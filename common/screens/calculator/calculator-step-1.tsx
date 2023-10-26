import { useContextApi } from '@/api/ApiContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { CourierCosts } from '@appjusto/types';
import { toNumber } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput, View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  costs: Partial<CourierCosts> | undefined | null;
  onSave: () => void;
}

export const CalculatorStep1 = ({ costs, onSave, style, ...props }: Props) => {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // refs
  const ordersPerDayRef = useRef<TextInput>(null);
  const daysPerWeekRef = useRef<TextInput>(null);
  const revenuePerOrderRef = useRef<TextInput>(null);
  // state
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [ordersPerDay, setOrdersPerDay] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [revenuePerOrder, setRevenuePerOrder] = useState('');
  const [loading, setLoading] = useState(false);
  const canSubmit =
    Boolean(hoursPerDay) &&
    Boolean(ordersPerDay) &&
    Boolean(daysPerWeek) &&
    Boolean(revenuePerOrder);
  // side effects
  useEffect(() => {
    if (!costs) return;
    if (costs.hoursPerDay) setHoursPerDay(String(costs.hoursPerDay));
    if (costs.ordersPerDay) setOrdersPerDay(String(costs.ordersPerDay));
    if (costs.daysPerWeek) setDaysPerWeek(String(costs.daysPerWeek));
    if (costs.revenuePerOrder) setRevenuePerOrder(String(costs.revenuePerOrder));
  }, [costs]);
  // handlers
  const updateHandler = () => {
    if (!canSubmit) return;
    Keyboard.dismiss();
    setLoading(true);
    api
      .couriers()
      .updateCourierCosts({
        hoursPerDay: toNumber(hoursPerDay),
        ordersPerDay: toNumber(ordersPerDay),
        daysPerWeek: toNumber(daysPerWeek),
        revenuePerOrder: toNumber(revenuePerOrder),
      })
      .then(() => {
        setLoading(false);
        onSave();
      })
      .catch(() => {
        setLoading(false);
        showToast('Não foi possível atualizar os dados. Tente novamente', 'error');
      });
  };
  // UI
  return (
    <DefaultKeyboardAwareScrollView style={[{ padding: paddings.lg }, style]} {...props}>
      <PatternInput
        titleStyle={{ ...typography.md }}
        pattern="twodigtsnumber"
        title="Quantas horas por dia, em média, você trabalha fazendo entregas?"
        placeholder="Exemplo: 8"
        keyboardType="numeric"
        returnKeyType="next"
        value={hoursPerDay}
        onChangeText={setHoursPerDay}
        onSubmitEditing={() => ordersPerDayRef.current?.focus()}
      />
      <PatternInput
        style={{ marginTop: paddings.xl }}
        titleStyle={{ ...typography.md }}
        ref={ordersPerDayRef}
        pattern="twodigtsnumber"
        title="Quantas entregas, em média, você faz por dia?"
        placeholder="Exemplo: 8"
        keyboardType="numeric"
        returnKeyType="next"
        value={ordersPerDay}
        onChangeText={setOrdersPerDay}
        onSubmitEditing={() => daysPerWeekRef.current?.focus()}
      />
      <PatternInput
        style={{ marginTop: paddings.xl }}
        titleStyle={{ ...typography.md }}
        ref={daysPerWeekRef}
        pattern="number"
        title="Quantas dias na semana, em média, você trabalha fazendo entregas?"
        placeholder="Exemplo: 5"
        keyboardType="numeric"
        returnKeyType="next"
        value={daysPerWeek}
        onChangeText={setDaysPerWeek}
        onSubmitEditing={() => revenuePerOrderRef.current?.focus()}
      />
      <PatternInput
        style={{ marginTop: paddings.xl }}
        titleStyle={{ ...typography.md }}
        ref={revenuePerOrderRef}
        pattern="currency"
        title="Quanto você ganha, em média, por cada pedido entregue?"
        placeholder="Exemplo: R$ 11,86"
        keyboardType="numeric"
        returnKeyType="next"
        value={revenuePerOrder}
        onChangeText={setRevenuePerOrder}
        // onSubmitEditing={() => placeRef.current?.focus()}
      />
      <View style={{ flex: 1 }} />
      <DefaultButton
        style={{ marginVertical: paddings.xl }}
        title="Salvar e avançar"
        disabled={loading || !canSubmit}
        loading={loading}
        onPress={updateHandler}
      />
    </DefaultKeyboardAwareScrollView>
  );
};
