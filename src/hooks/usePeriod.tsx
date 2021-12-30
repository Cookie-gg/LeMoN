import { useRef, useState } from 'react';

export default function usePeriod<T>(initialState: T): [T, (update: T, duration: number) => void] {
  const [period, _period] = useState<T>(initialState);
  const timer = useRef<NodeJS.Timeout>();
  function __period(update: T, duration: number) {
    timer.current && clearTimeout(timer.current);
    const prev = period;
    _period(update);
    timer.current = setTimeout(() => _period(prev), duration);
  }
  return [period, __period];
}
