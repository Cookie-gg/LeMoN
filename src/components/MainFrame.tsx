import { useFirstMount } from 'hooks';
import { ReactElement } from 'react';
import PageTransition from './PageTransition';
import styles from '../assets/scss/components/MainFrame.module.scss';

export default function MainFrame({
  headerState,
  children,
}: {
  headerState: 'close' | 'open' | 'expand';
  children: ReactElement;
}) {
  const isMounted = useFirstMount();
  return (
    <>
      <main
        className={`${styles.main} ${isMounted && styles.mounted} ${
          (headerState === 'open' || headerState === 'expand') && styles.opened
        } ${headerState === 'expand' && styles.expanded}`}
      >
        <PageTransition />
        {children}
      </main>
    </>
  );
}
