import { useRouter } from 'utils/libs/next';
import { useEffect, useState } from 'react';

export default function useIntersect({
  root = null,
  el,
  rootMargin = '0px',
  once = false,
}: {
  root?: HTMLElement | null;
  el: HTMLElement | null;
  rootMargin?: string;
  once?: boolean;
}): { intersect: boolean; state: (value: boolean, result?: boolean) => void } {
  const [isIntersecting, _isIntersecting] = useState(false);
  const [observerState, _observerState] = useState(true);
  const { pathname, query } = useRouter();
  const depPath = `${query.id}` || pathname;
  useEffect(() => {
    _isIntersecting(false);
    if (el) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => _isIntersecting(entry.isIntersecting)),
        { root, threshold: 0, rootMargin: rootMargin },
      );
      observerState && observer.observe(el);
      if (once || !observerState) {
        observer.unobserve(el);
        observer.disconnect();
      }
      return () => {
        observer.unobserve(el);
        observer.disconnect();
      };
    }
  }, [depPath, el, rootMargin, root, once, observerState]);
  return {
    intersect: isIntersecting,
    state: (value, result = false) => {
      _observerState(result);
      _isIntersecting(value);
    },
  };
}
