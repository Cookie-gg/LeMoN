import { ReactElement } from 'react';
import { useFirstMount, useWindowDimensions } from 'hooks';
import { useRouter } from 'utils/next';
import PageTransition from './PageTransition';
import styles from '../assets/scss/components/MainFrame.module.scss';

export default function MainFrame({
  children,
  headerState,
}: {
  children: ReactElement;
  headerState: 'close' | 'open' | 'expand';
}) {
  const isMounted = useFirstMount();
  const pathname = useRouter().pathname;
  const windowHeight = useWindowDimensions().height as number;
  return (
    <>
      <main
        className={`${styles.main} ${isMounted && styles.mounted} ${pathname === '/' && styles.home} ${
          (headerState === 'open' || headerState === 'expand') && styles.opened
        } ${headerState === 'expand' && styles.expanded}`}
        style={{ height: `${windowHeight}px` }}
      >
        <PageTransition />
        {children}
      </main>
    </>
  );
}
