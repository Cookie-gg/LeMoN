import { Router, useRouter } from 'utils/next';
import memoryCache, { CacheClass } from 'memory-cache';
import { createContext, ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import styles from '../assets/scss/components/PageFrame.module.scss';

export const scrollTopCashe: CacheClass<string, number> = new memoryCache.Cache();

export const ScrollerContext = createContext<RefObject<HTMLDivElement> | null>(null);

export default function PageFrame({ children, classNmae }: { children: ReactElement; classNmae?: string }) {
  const router = useRouter();
  const [scrollTop, _scrollTop] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const getScrollTop = () => scroller.current && _scrollTop(scroller.current.scrollTop);
    const setScrollTop = () =>
      scrollTopCashe.get(router.asPath)
        ? scroller.current && scroller.current.scrollTo(0, Number(scrollTopCashe.get(router.asPath)))
        : scroller.current && router.pathname === '/blog/[...id]' && scroller.current.scrollTo(0, 0);
    Router.events.on('routeChangeComplete', () => setScrollTop());
    Router.events.on('routeChangeStart', () => getScrollTop());
    return () => {
      scrollTopCashe.put(router.asPath, scrollTop);
      Router.events.on('routeChangeComplete', () => setScrollTop());
      Router.events.off('routeChangeStart', () => getScrollTop());
    };
  }, [router, scrollTop]);

  return (
    <ScrollerContext.Provider value={scroller}>
      <div className={styles.entire} ref={scroller}>
        <div className={`${styles.inner} ${classNmae}`}>{children}</div>
      </div>
    </ScrollerContext.Provider>
  );
}
