import { useRouter } from 'utils/next';
import { useEffect, useState } from 'react';

export default function useIntersect(
  root: HTMLElement | null = null,
  el: HTMLElement | null,
  rootMargin = '0px',
): boolean {
  const [isIntersecting, _isIntersecting] = useState(false);
  const query = (useRouter().query as { id: string[] }).id[0];
  useEffect(() => {
    _isIntersecting(false);
    if (el) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => _isIntersecting(entry.isIntersecting ? true : false)),
        { root, threshold: 0, rootMargin: rootMargin },
      );
      observer.observe(el);
      return () => {
        observer.unobserve(el);
        observer.disconnect();
      };
    }
  }, [query, el, rootMargin, root]);
  return isIntersecting;
}
