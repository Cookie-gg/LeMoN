import { memo } from 'react';
import { useRouter } from 'utils/next';
import { useAgent, useFirstPeriod, useHeight } from 'hooks';
import memoryCache, { CacheClass } from 'memory-cache';
import styles from '../assets/scss/components/PageFrame.module.scss';
import { useState, useRef, useEffect, createContext, ReactElement, RefObject } from 'react';

export const Context = createContext<[RefObject<HTMLDivElement>, number, (n: number) => void]>([
  { current: null },
  0,
  (n: number) => {
    n;
  },
]);

export const scrollTopCashe: CacheClass<string, number> = new memoryCache.Cache();

function PageFrame({ children, classNmae }: { children: ReactElement; classNmae: string }) {
  const router = useRouter();
  const noTransition = useFirstPeriod(1);
  const scroller = useRef<HTMLDivElement>(null);
  const [scrollTop, _scrollTop] = useState<number>(0);
  const [height, _height] = useHeight<HTMLDivElement>();
  const isMobile = useAgent();
  useEffect(
    () => () => {
      scrollTopCashe.put(router.asPath, scrollTop);
    },
    [router.asPath, scrollTop],
  );

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
      <div
        className={styles.wrapper}
        onScroll={(e) => _scrollTop((e.target as HTMLDivElement).scrollTop)}
        ref={scroller}
      >
        {isMobile ? (
          <section
            className={`${classNmae} ${noTransition && styles.no_transition}`}
            style={{ top: `${scrollTop * -1}px` }}
          >
            {children}
          </section>
        ) : (
          <>
            <div className={styles.contents} style={{ marginTop: `${scrollTop}px` }}>
              <section
                className={`${classNmae} ${noTransition && styles.no_transition}`}
                style={{ top: `${scrollTop * -1}px` }}
                ref={_height}
              >
                {children}
              </section>
            </div>
            <div style={{ height: `${height}px` }} />
          </>
        )}
      </div>
    </Context.Provider>
  );
}

export default memo(PageFrame);
