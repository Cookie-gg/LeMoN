import { useState } from 'react';

export default function useActive(duration: number) {
  const [first, _first] = useState<boolean>(true);
  setTimeout(() => {
    _first(false);
  }, duration);
  return first;
}
