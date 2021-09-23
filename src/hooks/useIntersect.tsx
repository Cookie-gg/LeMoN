import { useEffect, useState } from 'react';
import { useRouter } from 'utils/next';

export default function useIntersect(el: HTMLElement | null, rootMargin: string): boolean {
  const [isIntersecting, _isIntersecting] = useState(false);
  const asPath = useRouter().asPath;
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
  }, [asPath, el, rootMargin]);
  return isIntersecting;
}
