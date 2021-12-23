import { useRouter } from 'utils/next';
import { useEffect, useState } from 'react';

export default function useIntersect({
  root = null,
  el,
  rootMargin = '0px',
}: {
  root?: HTMLElement | null;
  el: HTMLElement | null;
  rootMargin?: string;
  isOnce?: boolean;
}): boolean {
  const [isIntersecting, _isIntersecting] = useState(false);
  const router = useRouter();
  const depPath = `${router.query.id}` || router.pathname;
  useEffect(() => {
    _isIntersecting(false);
    if (el) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => _isIntersecting(entry.isIntersecting)),
        { root, threshold: 0, rootMargin: rootMargin },
      );
      observer.observe(el);
      return () => {
        observer.unobserve(el);
        observer.disconnect();
      };
    }
  }, [depPath, el, rootMargin, root]);
  return isIntersecting;
}
