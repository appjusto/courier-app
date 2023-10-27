import { useContextApi } from '@/api/ApiContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { RadioButton } from '@/common/components/buttons/radio/RadioButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
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

export const CalculatorStep3 = ({ costs, onSave, style, ...props }: Props) => {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // refs
  const gasPriceRef = useRef<TextInput>(null);
  const insurancePerMonthRef = useRef<TextInput>(null);
  const taxesPerYearRef = useRef<TextInput>(null);
  const maintenancePerYearRef = useRef<TextInput>(null);
  // state
  const [vehicle, setVehicle] = useState<'motorcycle' | 'bike' | 'electric'>();
  const [kmWithLiter, setKmWithLiter] = useState('');
  const [gasPrice, setGasPrice] = useState('');
  const [vehicleInsurancePerYear, setVehicleInsurancePerYear] = useState('');
  const [taxesPerYear, setTaxesPerYear] = useState('');
  const [maintenancePerYear, setMaintenancePerYear] = useState('');
  const [loading, setLoading] = useState(false);
  const canSubmit =
    Boolean(vehicle) &&
    (vehicle !== 'motorcycle' || (Boolean(toNumber(kmWithLiter)) && Boolean(toNumber(gasPrice))));
  // side effects
  useEffect(() => {
    if (!costs) return;
    if (costs.vehicle) setVehicle(costs.vehicle);
    if (costs.kmWithLiter) setKmWithLiter(String(costs.kmWithLiter));
    if (costs.gasPrice) setGasPrice(String(costs.gasPrice));
    if (costs.vehicleInsurancePerYear)
      setVehicleInsurancePerYear(String(costs.vehicleInsurancePerYear));
    if (costs.taxesPerYear) setTaxesPerYear(String(costs.taxesPerYear));
    if (costs.maintenancePerYear) setMaintenancePerYear(String(costs.maintenancePerYear));
  }, [costs]);
  // handlers
  const updateHandler = () => {
    if (!canSubmit) return;
    setLoading(true);
    Keyboard.dismiss();
    api
      .couriers()
      .updateCourierCosts({
        vehicle,
        kmWithLiter: toNumber(kmWithLiter),
        gasPrice: toNumber(gasPrice),
        vehicleInsurancePerYear: toNumber(vehicleInsurancePerYear ?? 0),
        taxesPerYear: toNumber(taxesPerYear ?? 0),
        maintenancePerYear: toNumber(maintenancePerYear ?? 0),
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
      <DefaultText size="md">Que tipo de veículo que você usa?</DefaultText>
      <RadioButton
        style={{ marginTop: paddings.xs }}
        textStyle={{ ...typography.md }}
        title="Moto ou veículo a gasolina, álcool ou diesel"
        onPress={() => setVehicle('motorcycle')}
        checked={vehicle === 'motorcycle'}
      />
      <RadioButton
        style={{ marginTop: paddings.xs }}
        textStyle={{ ...typography.md }}
        title="Bicicleta ou veículo não motorizado"
        onPress={() => setVehicle('bike')}
        checked={vehicle === 'bike'}
      />
      <RadioButton
        style={{ marginTop: paddings.xs }}
        textStyle={{ ...typography.md }}
        title="Elétrico"
        onPress={() => setVehicle('electric')}
        checked={vehicle === 'electric'}
      />
      {vehicle === 'motorcycle' ? (
        <View>
          <PatternInput
            style={{ marginTop: paddings.xl }}
            titleStyle={{ ...typography.md }}
            pattern="twodigtsnumber"
            title="Quantos km você anda com 1L de combustível?"
            placeholder="Exemplo: 30"
            keyboardType="numeric"
            returnKeyType="next"
            value={kmWithLiter}
            onChangeText={setKmWithLiter}
            onSubmitEditing={() => gasPriceRef.current?.focus()}
          />
          <PatternInput
            style={{ marginTop: paddings.xl }}
            titleStyle={{ ...typography.md }}
            ref={gasPriceRef}
            pattern="currency"
            title="Quantos você paga no litro de combustível?"
            placeholder="Exemplo: 5,50"
            keyboardType="numeric"
            returnKeyType="next"
            value={gasPrice}
            onChangeText={setGasPrice}
            onSubmitEditing={() => insurancePerMonthRef.current?.focus()}
          />
        </View>
      ) : null}
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
          title="Quanto você gasta por ano com seguro do seu veículo?"
          placeholder="Exemplo: R$ 1.000"
          keyboardType="numeric"
          returnKeyType="next"
          value={vehicleInsurancePerYear}
          onChangeText={setVehicleInsurancePerYear}
          onSubmitEditing={() => taxesPerYearRef.current?.focus()}
        />
      </View>
      <View style={{ marginTop: paddings.xl }}>
        <RoundedText style={{ backgroundColor: colors.neutral50 }} size="xs" color="neutral700">
          Pergunta opcional
        </RoundedText>
        <PatternInput
          style={{ marginTop: paddings.sm }}
          titleStyle={{ ...typography.md }}
          ref={taxesPerYearRef}
          pattern="currency"
          title="Quanto você gasta por ano com taxas e impostos relativas ao seu veículo?"
          placeholder="Exemplo: R$ 1.000"
          keyboardType="numeric"
          returnKeyType="next"
          value={taxesPerYear}
          onChangeText={setTaxesPerYear}
          onSubmitEditing={() => maintenancePerYearRef.current?.focus()}
        />
      </View>
      <View style={{ marginTop: paddings.xl }}>
        <RoundedText style={{ backgroundColor: colors.neutral50 }} size="xs" color="neutral700">
          Pergunta opcional
        </RoundedText>
        <PatternInput
          style={{ marginTop: paddings.sm }}
          titleStyle={{ ...typography.md }}
          ref={maintenancePerYearRef}
          pattern="currency"
          title="Quanto você gasta por ano, em média, com a manutenção do seu veículo?"
          placeholder="Exemplo: R$ 1.000"
          keyboardType="numeric"
          returnKeyType="next"
          value={maintenancePerYear}
          onChangeText={setMaintenancePerYear}
        />
      </View>
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
