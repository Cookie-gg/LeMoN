import { useState } from 'react';

export default function usePeriod(initialState: boolean): [boolean, (duration: number) => void] {
  const [period, _period] = useState<boolean>(initialState);
  function __period(duration: number) {
    _period((prev) => !prev);
    setTimeout(() => _period((prev) => !prev), duration);
  }
  return [period, __period];
}
