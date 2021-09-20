import { createContext, ReactElement, useEffect, useState } from 'react';
import memoryCache, { CacheClass } from 'memory-cache';
import styles from '../assets/scss/components/PageFrame.module.scss';
import { useRouter } from 'utils/next';

export const scrollTopCashe: CacheClass<string, number> = new memoryCache.Cache();

export const TocClickState = createContext<() => void>(() => {
  console.log('default value');
});

export default function PageFrame({ children, classNmae }: { children: ReactElement; classNmae?: string }) {
  const router = useRouter();
  const [tocClicked, _tocClicked] = useState(false);

  useEffect(() => {
    if (router.pathname.includes('blog')) {
      _tocClicked(false);
      return () => _tocClicked(false);
    }
  }, [router]);

  return router.pathname.includes('blog') ? (
    <TocClickState.Provider value={() => _tocClicked(true)}>
      <div className={`${classNmae} ${styles.entire} ${tocClicked && styles.toc_clicked}`}>{children}</div>;
    </TocClickState.Provider>
  ) : (
    <div className={`${classNmae} ${styles.entire} ${tocClicked && styles.tocClicked}`}>{children}</div>
  );
}
