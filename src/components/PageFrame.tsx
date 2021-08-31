import { useFirstPeriod, useHeight } from 'hooks';
import { useRouter } from 'utils/next';
import memoryCache, { CacheClass } from 'memory-cache';
import styles from '../assets/scss/components/PageFrame.module.scss';
import { useState, useRef, useEffect, createContext, ReactElement, RefObject } from 'react';
import { memo } from 'react';

export const Context = createContext<[RefObject<HTMLDivElement>, number, (n: number) => void]>([
  { current: null },
  0,
  (n: number) => {
    n;
  },
]);
export const scrollTopCashe: CacheClass<string, number> = new memoryCache.Cache();

interface ProspType {
  children: ReactElement;
  sectionClass: string;
}

function PageFrame({ children, sectionClass }: ProspType) {
  const router = useRouter();
  const scroller = useRef<HTMLDivElement>(null);
  const [scrollTop, _scrollTop] = useState<number>(0);
  const [height, _height] = useHeight<HTMLDivElement>();
  const noTransition = useFirstPeriod(1);
  function scrollEvent(e: React.UIEvent<HTMLDivElement, globalThis.UIEvent>) {
    _scrollTop((e.target as HTMLDivElement).scrollTop);
  }

  useEffect(() => {
    return () => {
      scrollTopCashe.put(router.asPath, scrollTop);
    };
  }, [router.asPath, scrollTop]);

  useEffect(() => {
    const el = scroller.current as HTMLDivElement;
    if (scrollTopCashe.get(router.asPath)) {
      setTimeout(() => el.scrollTo(0, Number(scrollTopCashe.get(router.asPath))), 50);
    } else if (router.pathname === '/blog/[...id]') {
      return () => {
        el.scrollTo(0, 0);
      };
    }
  }, [router]);

  return (
    <Context.Provider value={[scroller, scrollTop, _scrollTop]}>
      <div className={styles.wrapper} onScroll={(e) => scrollEvent(e)} ref={scroller}>
        <div className={styles.contents} style={{ marginTop: `${scrollTop}px` }}>
          <section
            className={`${sectionClass} ${noTransition && styles.no_transition}`}
            style={{ top: `${scrollTop * -1}px` }}
            ref={_height}
          >
            {children}
          </section>
        </div>
        <div style={{ height: `${height}px` }} />
      </div>
    </Context.Provider>
  );
}

export default memo(PageFrame, (prev: ProspType, next: ProspType) => prev === next);
