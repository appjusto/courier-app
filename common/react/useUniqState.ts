import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';

export const useUniqState = <T>(value: T) => {
  // state
  const [state, setState] = useState<T>();
  // side effects
  useEffect(() => {
    if (!isEqual(value, state)) {
      console.log('updating:', state, '->', value);
      setState(value);
    }
  }, [state, value]);
  // result
  return state;
};
