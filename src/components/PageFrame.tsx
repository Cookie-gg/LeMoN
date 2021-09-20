import { createContext, ReactElement, useEffect, useState } from 'react';
import memoryCache, { CacheClass } from 'memory-cache';
import styles from '../assets/scss/components/PageFrame.module.scss';
import { useRouter } from 'utils/next';
import { useAgent, useBrowser } from 'hooks';

export const scrollTopCashe: CacheClass<string, number> = new memoryCache.Cache();

export const TocState = createContext(() => console.log('default value'));

export default function PageFrame({ children, classNmae }: { children: ReactElement; classNmae?: string }) {
  const [isClicked, _isClicked] = useState(false);
  const isChrome = useBrowser('chrome');
  const router = useRouter();
  const isMobile = useAgent();
  useEffect(() => () => _isClicked(false), [router.pathname]);
  return router.pathname.includes('blog') ? (
    <TocState.Provider
      value={() => {
        if (isMobile && isChrome && isClicked === false) _isClicked(true);
      }}
    >
      <div className={`${classNmae} ${styles.entire} ${isMobile && isChrome && isClicked && styles.toc_clicked}`}>
        {children}
      </div>
      ;
    </TocState.Provider>
  ) : (
    <div className={`${classNmae} ${styles.entire}`}>{children}</div>
  );
}
