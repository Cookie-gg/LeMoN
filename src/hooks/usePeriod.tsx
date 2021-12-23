import { useState } from 'react';

let timer: NodeJS.Timeout;

export default function usePeriod<T>(initialState: T): [T, (update: T, duration: number) => void] {
  const [period, _period] = useState<T>(initialState);
  function __period(update: T, duration: number) {
    clearTimeout(timer);
    const prev = period;
    _period(update);
    timer = setTimeout(() => _period(prev), duration);
  }
  return [period, __period];
}
