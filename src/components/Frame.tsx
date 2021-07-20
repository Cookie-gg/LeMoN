import { useMount } from 'hooks';
import { ReactNode } from 'react';
import styles from '../assets/scss/components/Frame.module.scss'

export default function Frame({ children }: { children: ReactNode }) {
  const isMounted = useMount();
  return (
    <>
      <main className={`${styles.main} ${isMounted && styles.mounted}`}>
        {children}
      </main>
    </>
  );
}
