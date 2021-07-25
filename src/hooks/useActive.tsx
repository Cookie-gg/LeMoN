import { useState } from 'react';

export default function useActive(initialState: boolean): [boolean, (duration: number) => void] {
  const [active, _active] = useState<boolean>(initialState);
  function __active(duration: number) {
    _active((prev) => !prev);
    setTimeout(() => _active((prev) => !prev), duration);
  }
  return [active, __active];
}
