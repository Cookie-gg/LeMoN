import { useEffect, useState } from 'react';
import { useRouter } from 'utils/next';

export default function useIntersect(el: HTMLElement | null, rootMargin: string): boolean {
  const [isIntersecting, _isIntersecting] = useState(false);
  const query = (useRouter().query as { id: string[] }).id[0];
  useEffect(() => {
    _isIntersecting(false);
    if (el) {
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            _isIntersecting(entry.isIntersecting ? true : false);
          }),
        {
          root: null, // document
          threshold: 0,
          rootMargin: rootMargin,
        },
      );
      observer.observe(el);
      return () => {
        observer.unobserve(el);
        observer.disconnect();
      };
    }
  }, [query, el, rootMargin]);
  return isIntersecting;
}
