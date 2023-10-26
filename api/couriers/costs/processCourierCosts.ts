import { CourierCosts } from '@appjusto/types';

export const processCourierCosts = (costs: Partial<CourierCosts>): Partial<CourierCosts> | null => {
  const {
    ordersPerDay,
    daysPerWeek,
    hoursPerDay,
    vehicle,
    gasPrice,
    kmWithLiter,
    distanceFromHome = 0,
    foodPerDay = 0,
    otherCostsPerDay = 0,
    withdrawCosts = 0,
    carrierPerMonth = 0,
    insurancePerMonth = 0,
    taxesPerYear = 0,
    maintenancePerYear = 0,
    vehicleInsurancePerYear = 0,
    otherCostsPerYear = 0,
    distanceToOrigin,
    distanceToDestination,
    revenuePerOrder,
  } = costs;
  if (!ordersPerDay) return null;
  if (!daysPerWeek) return null;
  if (!hoursPerDay) return null;
  if (vehicle === 'motorcycle') {
    if (!gasPrice) return null;
    if (!kmWithLiter) return null;
  }
  if (!distanceToOrigin) return null;
  if (!distanceToDestination) return null;
  if (!revenuePerOrder) return null;
  // number of orders
  const ordersPerWeek = ordersPerDay * daysPerWeek;
  const ordersPerYear = ordersPerWeek * 52;
  const ordersPerMonth = ordersPerYear / 12;
  const ordersPerHour = ordersPerDay / hoursPerDay;
  // gas
  const gasCostPerKm =
    costs.vehicle === 'motorcycle' && gasPrice && kmWithLiter ? gasPrice / kmWithLiter : 0;
  // per day
  const dailyCommuteGasCost = distanceFromHome * gasCostPerKm * 2; // 0.5 * 2 * 0.1315 = R$ 0.122
  const dailyCosts = dailyCommuteGasCost + foodPerDay + otherCostsPerDay;
  // per month
  const meiCosts = 71.1 * 100;
  const monthlyCosts = carrierPerMonth + insurancePerMonth + meiCosts + withdrawCosts;
  // per year
  const yearlyCosts =
    taxesPerYear + maintenancePerYear + vehicleInsurancePerYear + otherCostsPerYear;
  // per order
  const orderDistance = distanceToOrigin + distanceToDestination;
  const orderGasCost = orderDistance * gasCostPerKm;
  const yearlyCostsPerOrder = yearlyCosts / ordersPerYear;
  const monthlyCostsPerOrder = monthlyCosts / ordersPerMonth;
  const dailyCostsPerOrder = dailyCosts / ordersPerDay;
  const costsPerOrder =
    orderGasCost + dailyCostsPerOrder + monthlyCostsPerOrder + yearlyCostsPerOrder;
  const orderRevenue = revenuePerOrder - costsPerOrder;
  const hourGrossRevenue = ordersPerHour * revenuePerOrder;
  const hourRevenue = hourGrossRevenue - ordersPerHour * costsPerOrder;
  const minimumWageComparison = hourRevenue / 100 / (1320 / 220);
  const livingWageComparison = (hourRevenue / 100 / (6647.63 / 220)) * 100;
  return {
    ...costs,
    processing: {
      dailyCosts,
      monthlyCosts,
      yearlyCosts,
      dailyCostsPerOrder,
      monthlyCostsPerOrder,
      yearlyCostsPerOrder,
      costsPerOrder,
      orderGasCost,
      orderRevenue,
      hourRevenue,
      minimumWageComparison,
      livingWageComparison,
    },
  };
};
