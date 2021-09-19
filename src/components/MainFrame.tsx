import { ReactElement } from 'react';
import { useFirstMount } from 'hooks';
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
  return (
    <>
      <main
        className={`${styles.main} ${isMounted && styles.mounted} ${pathname === '/' && styles.home} ${
          (headerState === 'open' || headerState === 'expand') && styles.opened
        } ${headerState === 'expand' && styles.expanded}`}
      >
        <PageTransition  />
        {children}
      </main>
    </>
  );
}
