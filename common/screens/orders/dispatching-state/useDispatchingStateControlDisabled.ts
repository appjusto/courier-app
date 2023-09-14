import {
  useContextGetServerTime,
  useContextPlatformParams,
} from '@/api/platform/context/PlatformContext';
import { Order } from '@appjusto/types';
import { Timestamp } from '@appjusto/types/external/firebase';
import { useEffect, useState } from 'react';

const canAdvanceDispatchingState = (now: Date, delay: number, timestamp?: Timestamp) => {
  if (!timestamp) return false;
  const diff = now.getTime() - timestamp.toDate().getTime();
  return diff >= delay * 1000;
};

export const useDispatchingStateControlDisabled = (order: Order, checkInterval = 5) => {
  const { type, status, dispatchingState, dispatchingTimestamps } = order;
  const { goingPickup, goingDestination } = dispatchingTimestamps ?? {};
  // context
  const getServerTime = useContextGetServerTime();
  const delayBeforeAdvancing = useContextPlatformParams()?.courier.delayBeforeAdvancing ?? 60;
  // state
  const [disabled, setDisabled] = useState(false);
  const [ticking, setTicking] = useState(false);
  const [tick, setTick] = useState(0);
  // side effects
  // checking interval
  useEffect(() => {
    if (ticking) {
      const interval = setInterval(() => setTick((value) => value + 1), 5 * checkInterval);
      return () => clearInterval(interval);
    }
  }, [ticking, checkInterval]);
  // check
  useEffect(() => {
    if (!dispatchingState) return;
    const now = getServerTime();
    if (dispatchingState === 'going-pickup') {
      const block = !canAdvanceDispatchingState(now, delayBeforeAdvancing, goingPickup);
      setDisabled(block);
      setTicking(block);
    } else if (dispatchingState === 'arrived-pickup') {
      setTicking(false);
      setDisabled(type === 'food' && status !== 'dispatching');
    } else if (dispatchingState === 'going-destination') {
      const block = !canAdvanceDispatchingState(now, delayBeforeAdvancing, goingDestination);
      setDisabled(block);
      setTicking(block);
    } else {
      setDisabled(false);
      setTicking(false);
    }
  }, [
    type,
    status,
    dispatchingState,
    goingPickup,
    goingDestination,
    delayBeforeAdvancing,
    getServerTime,
    tick,
  ]);
  // result
  return disabled;
};
