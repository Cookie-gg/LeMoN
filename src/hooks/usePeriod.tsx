import { useState } from 'react';

export default function usePeriod<T>(initialState: T): [T, (update: T, duration: number) => void] {
  const [period, _period] = useState<T>(initialState);
  function __period(update: T, duration: number) {
    const prev = period;
    _period(update);
    setTimeout(() => _period(prev), duration);
  }
  return [period, __period];
}
