import { useState, useEffect, useRef, RefObject } from 'react';

export default function useHeight<T extends HTMLElement>(): [number, RefObject<T>] {
  const ref = useRef<T>(null);
  const [height, _height] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (el) {
      _height((el as T).clientHeight as number);
      (el as T).addEventListener('transitionrun', () => _height((el as T).clientHeight as number));
      return (): void =>
        (el as T).removeEventListener('transitionrun', () => _height((el as T).clientHeight as number));
    }
  }, []);
  return [height, ref];
}
