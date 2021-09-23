import { ReactElement, useEffect, useState } from 'react';
import PageTransition from './PageTransition';
import styles from '../assets/scss/components/MainFrame.module.scss';
import { useAgent } from 'hooks';

export default function MainFrame({ children }: { children: ReactElement }) {
  const isMobile = useAgent('mobile');
  const [windowHeight, _windowHeight] = useState(0);
  useEffect(() => {
    if (isMobile) _windowHeight(window.innerHeight);
  }, [isMobile]);
  const innerElements = (
    <>
      <PageTransition />
      {children}
    </>
  );
  return isMobile ? (
    <main className={`${styles.main}`} style={{ height: `${windowHeight}px` }}>
      {innerElements}
    </main>
  ) : (
    <main className={`${styles.main}`}>{innerElements}</main>
  );
}
