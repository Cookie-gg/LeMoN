import { Router } from 'utils/next';
import { ReactElement, useRef } from 'react';
// import memoryCache, { CacheClass } from 'memory-cache';
import styles from '../assets/scss/components/PageFrame.module.scss';

// export const scrollTopCashe: CacheClass<string, number> = new memoryCache.Cache();

export default function PageFrame({ children, classNmae }: { children: ReactElement; classNmae?: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  Router.events.on('routeChangeComplete', () => scroller.current && scroller.current.scrollTo(0, 0));
  return (
    <div className={`${styles.entire} ${classNmae}`} ref={scroller}>
      {children}
    </div>
  );
}
