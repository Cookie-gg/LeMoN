import { Router, useRouter } from 'utils/next';
import { ReactElement, useEffect, useRef, useState } from 'react';
import memoryCache, { CacheClass } from 'memory-cache';
import styles from '../assets/scss/components/PageFrame.module.scss';

export const scrollTopCashe: CacheClass<string, number> = new memoryCache.Cache();

export default function PageFrame({ children, classNmae }: { children: ReactElement; classNmae?: string }) {
  const router = useRouter();
  const [scrollTop, _scrollTop] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  Router.events.on('routeChangeComplete', () => {
    if (scroller.current) {
      scrollTopCashe.get(router.asPath)
        ? scroller.current.scrollTo(0, Number(scrollTopCashe.get(router.asPath)))
        : router.pathname === '/blog/[...id]' && scroller.current.scrollTo(0, 0);
    }
  });

  useEffect(() => {
    Router.events.on('routeChangeStart', () => scroller.current && _scrollTop(scroller.current.scrollTop));
    return () => {
      scrollTopCashe.put(router.asPath, scrollTop);
    };
  }, [router.asPath, scrollTop]);
  return (
    <div className={styles.entire} ref={scroller}>
      <div className={`${styles.inner} ${classNmae}`}>{children}</div>
    </div>
  );
}
