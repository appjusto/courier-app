import { useContextApi } from '@/api/ApiContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { RoundedText } from '@/common/components/texts/RoundedText';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import colors from '@/common/styles/colors';
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

export const CalculatorStep4 = ({ costs, onSave, style, ...props }: Props) => {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // refs
  const foodPerDayRef = useRef<TextInput>(null);
  const insurancePerMonthRef = useRef<TextInput>(null);
  const otherCostsPerYearRef = useRef<TextInput>(null);
  const otherCostsPerDayRef = useRef<TextInput>(null);
  // state
  const [carrierPerMonth, setCarrierPerMonth] = useState('');
  const [foodPerDay, setFoodPerDay] = useState('');
  const [insurancePerMonth, setInsurancePerMonth] = useState('');
  const [otherCostsPerYear, setOtherCostsPerYear] = useState('');
  const [otherCostsPerDay, setOtherCostsPerDay] = useState('');
  const [loading, setLoading] = useState(false);
  const canSubmit = true;
  // side effects
  useEffect(() => {
    if (!costs) return;
    if (costs.carrierPerMonth) setCarrierPerMonth(String(costs.carrierPerMonth));
    if (costs.foodPerDay) setFoodPerDay(String(costs.foodPerDay));
    if (costs.insurancePerMonth) setInsurancePerMonth(String(costs.insurancePerMonth));
    if (costs.otherCostsPerYear) setOtherCostsPerYear(String(costs.otherCostsPerYear));
    if (costs.otherCostsPerDay) setOtherCostsPerDay(String(costs.otherCostsPerDay));
  }, [costs]);
  // handlers
  const updateHandler = () => {
    if (!canSubmit) return;
    setLoading(true);
    Keyboard.dismiss();
    api
      .couriers()
      .updateCourierCosts({
        carrierPerMonth: toNumber(carrierPerMonth ?? 0),
        foodPerDay: toNumber(foodPerDay ?? 0),
        insurancePerMonth: toNumber(insurancePerMonth ?? 0),
        otherCostsPerYear: toNumber(otherCostsPerYear ?? 0),
        otherCostsPerDay: toNumber(otherCostsPerDay ?? 0),
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
      <View>
        <RoundedText
          style={{ marginBottom: paddings.sm, backgroundColor: colors.neutral50 }}
          size="xs"
          color="neutral700"
        >
          Pergunta opcional
        </RoundedText>
        <PatternInput
          titleStyle={{ ...typography.md }}
          pattern="currency"
          title="Quanto você gasta por mês com telefonia móvel?"
          placeholder="Exemplo: R$ 50,00"
          keyboardType="numeric"
          returnKeyType="next"
          value={carrierPerMonth}
          onChangeText={setCarrierPerMonth}
          onSubmitEditing={() => foodPerDayRef.current?.focus()}
        />
      </View>
      <View style={{ marginTop: paddings.xl }}>
        <RoundedText
          style={{ marginBottom: paddings.sm, backgroundColor: colors.neutral50 }}
          size="xs"
          color="neutral700"
        >
          Pergunta opcional
        </RoundedText>
        <PatternInput
          titleStyle={{ ...typography.md }}
          ref={foodPerDayRef}
          pattern="currency"
          title="Quanto você gasta por dia, em média, com alimentação durante o período de trabalho?"
          placeholder="Exemplo: R$ 20,00"
          keyboardType="numeric"
          returnKeyType="next"
          value={foodPerDay}
          onChangeText={setFoodPerDay}
          onSubmitEditing={() => insurancePerMonthRef.current?.focus()}
        />
      </View>
      <View style={{ marginTop: paddings.xl }}>
        <RoundedText
          style={{ marginBottom: paddings.sm, backgroundColor: colors.neutral50 }}
          size="xs"
          color="neutral700"
        >
          Pergunta opcional
        </RoundedText>
        <PatternInput
          titleStyle={{ ...typography.md }}
          ref={insurancePerMonthRef}
          pattern="currency"
          title="Quanto você gasta por mês com seguros de vida e/ou contra acidentes?"
          placeholder="Exemplo: R$ 20,00"
          keyboardType="numeric"
          returnKeyType="next"
          value={insurancePerMonth}
          onChangeText={setInsurancePerMonth}
          onSubmitEditing={() => otherCostsPerYearRef.current?.focus()}
        />
      </View>
      <View style={{ marginTop: paddings.xl }}>
        <RoundedText
          style={{ marginBottom: paddings.sm, backgroundColor: colors.neutral50 }}
          size="xs"
          color="neutral700"
        >
          Pergunta opcional
        </RoundedText>
        <PatternInput
          ref={otherCostsPerYearRef}
          pattern="currency"
          title="Algum outro custo anual devido ao trabalho?"
          titleStyle={{ ...typography.md }}
          subtitle="Equipamentos, multas, etc."
          subtitleStyle={{ ...typography.sm }}
          placeholder="Exemplo: R$ 20,00"
          keyboardType="numeric"
          returnKeyType="next"
          value={otherCostsPerYear}
          onChangeText={setOtherCostsPerYear}
          onSubmitEditing={() => otherCostsPerDayRef.current?.focus()}
        />
      </View>
      <View style={{ marginTop: paddings.xl }}>
        <RoundedText
          style={{ marginBottom: paddings.sm, backgroundColor: colors.neutral50 }}
          size="xs"
          color="neutral700"
        >
          Pergunta opcional
        </RoundedText>
        <PatternInput
          ref={otherCostsPerDayRef}
          pattern="currency"
          title="Algum outro custo diário devido ao trabalho?"
          titleStyle={{ ...typography.md }}
          subtitle="Passagens de transporte público, estacionamento, etc."
          subtitleStyle={{ ...typography.sm }}
          placeholder="Exemplo: R$ 20,00"
          keyboardType="numeric"
          returnKeyType="next"
          value={otherCostsPerDay}
          onChangeText={setOtherCostsPerDay}
        />
      </View>

      <View style={{ flex: 1 }} />
      <DefaultButton
        style={{ marginTop: paddings.lg, marginBottom: paddings.xl }}
        title="Salvar e avançar"
        disabled={loading || !canSubmit}
        loading={loading}
        onPress={updateHandler}
      />
    </DefaultKeyboardAwareScrollView>
  );
};
