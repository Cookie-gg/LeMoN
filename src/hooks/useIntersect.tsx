import { useEffect, useState } from 'react';

export default function useIntersect(el: HTMLElement | null, rootMargin: string): boolean {
  const [isIntersecting, _isIntersecting] = useState(false);
  useEffect(() => {
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
  }, [el, rootMargin]);
  return isIntersecting;
}
