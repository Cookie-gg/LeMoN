import { useFirst, useMount } from 'hooks';
import { useRouter } from 'utils/next';
import PageTransition from './PageTransition';
import { Children, ReactElement, cloneElement } from 'react';
import styles from '../assets/scss/components/MainFrame.module.scss';

export default function MainFrame({ children }: { children: ReactElement }) {
  const isFirst = useFirst();
  const isMounted = useMount();
  const router = useRouter();
  const child = Children.map(children, (child) => (router.pathname === '/' ? cloneElement(child, { isFirst }) : child));
  return (
    <>
      <main className={`${styles.main} ${isMounted && styles.mounted}`}>
        <PageTransition isFirst={isFirst} />
        {child}
      </main>
    </>
  );
}
