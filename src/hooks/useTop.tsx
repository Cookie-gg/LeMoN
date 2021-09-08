import { useRouter } from 'utils/next';
import { useState, useEffect, useRef, RefObject } from 'react';

export default function useTop<T extends HTMLElement>(init = 0): [number, RefObject<T>] {
  const ref = useRef<T>(null);
  const asPath = useRouter().asPath;
  const [top, _top] = useState(init);

  useEffect(() => {
    const el = ref.current as T;
    _top(el.getBoundingClientRect().top);
    const resizeObserver = new ResizeObserver((callback) => _top(callback[0].target.getBoundingClientRect().top));
    resizeObserver.observe(el);
    el.addEventListener('transitionstart', () => resizeObserver.disconnect());
  }, [asPath]);

  return [top, ref];
}
