import { useAgent } from 'hooks';
import { useRouter } from 'utils/next';
import { dynamic } from 'utils/next';
// import PageTransition from './PageTransition';
import { ReactElement, useEffect, useState } from 'react';
import styles from '../assets/scss/components/MainFrame.module.scss';

const PageTransition = dynamic(() => import('components/PageTransition'));

export default function MainFrame({ children }: { children: ReactElement }) {
  const isMobile = useAgent('mobile');
  const pathname = useRouter().pathname;
  const [windowHeight, _windowHeight] = useState(0);
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
