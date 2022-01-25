import { AuthButton } from 'components';
import PageTransition from './PageTransition';
import { useRouter } from 'utils/next';
import { useAgent, useWindowDimensions } from 'hooks';
import memoryCache, { CacheClass } from 'memory-cache';
import styles from '../assets/scss/components/MainFrame.module.scss';
import { createContext, ReactElement, RefObject, useEffect, useRef } from 'react';

export const scrollTopCashe: CacheClass<string, number> = new memoryCache.Cache();

export const ScrollerContext = createContext<RefObject<HTMLDivElement> | null>(null);

export default function MainFrame({
  auth,
  children,
}: {
  auth: { state: boolean; logout: () => Promise<void> };
  children: ReactElement;
}) {
  const isMobile = useAgent('mobile');
  const { height } = useWindowDimensions();
  const router = useRouter();
  const ios = useAgent('iphone');
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollTopCashe.get(router.asPath)) {
      scroller.current && scroller.current.scrollTo(0, Number(scrollTopCashe.get(router.asPath)));
    } else scroller.current && scroller.current.scrollTo(0, 0);
    const getScrollTop = () => scroller.current && scrollTopCashe.put(router.asPath, scroller.current.scrollTop);
    return () => {
      getScrollTop();
    };
  }, [router.asPath]);
  return (
    <ScrollerContext.Provider value={scroller}>
      <main
        className={`${styles.entire} ${ios && styles.ios} ${router.pathname === '/' && styles.home}`}
        style={{ height: isMobile && height ? `${height}px` : undefined }}
        ref={scroller}
      >
        {router.pathname !== '/' && auth.state && <AuthButton logout={() => auth.logout()} />}
        <PageTransition />
        {children}
      </main>
    </ScrollerContext.Provider>
  );
}
