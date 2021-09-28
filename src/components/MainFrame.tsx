import { ReactElement, useEffect, useState } from 'react';
import PageTransition from './PageTransition';
import styles from '../assets/scss/components/MainFrame.module.scss';
import { useAgent } from 'hooks';
import { useRouter } from 'utils/next';

export default function MainFrame({ children }: { children: ReactElement }) {
  const isMobile = useAgent('mobile');
  const [windowHeight, _windowHeight] = useState(0);
  const pathname = useRouter().pathname;
  useEffect(() => {
    if (isMobile) _windowHeight(window.innerHeight);
  }, [isMobile]);
  return (
    <main
      className={`${styles.entire} ${pathname === '/' && styles.home}`}
      style={{ height: isMobile ? `${windowHeight}px` : undefined }}
    >
      <PageTransition />
      {children}
    </main>
  );
}
