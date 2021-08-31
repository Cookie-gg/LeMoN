import { useState, useEffect, useRef, RefObject } from 'react';
import { useRouter } from 'utils/next';

export default function useHeight<T extends HTMLElement>(init = 0, isInteractive = true): [number, RefObject<T>] {
  const router = useRouter();
  const ref = useRef<T>(null);
  const [height, _height] = useState(init);
  useEffect(() => {
    const el = ref.current as T;
    _height(el.clientHeight as number);
    if (isInteractive) {
      el.addEventListener('transitionrun', () => _height(el.clientHeight as number));
      return (): void => el.removeEventListener('transitionrun', () => _height(el.clientHeight as number));
    }
  }, [router.asPath, isInteractive]);
  return [height, ref];
}
