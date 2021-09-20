import { ReactElement } from 'react';
import PageTransition from './PageTransition';
import { useFirstMount, useWindowDimensions } from 'hooks';
import styles from '../assets/scss/components/MainFrame.module.scss';

export default function MainFrame({ children }: { children: ReactElement }) {
  const isMounted = useFirstMount();
  const windowHeight = useWindowDimensions().height as number;
  return (
    <>
      <main className={`${styles.main} ${isMounted && styles.mounted}`} style={{ height: `${windowHeight}px` }} onScroll={() => {
        console.log("object");
      }}>
        <PageTransition />
        {children}
      </main>
    </>
  );
}
