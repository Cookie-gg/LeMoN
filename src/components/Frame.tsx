import { useFirst, useMount } from 'hooks';
import { PageTransition } from 'components';
import styles from '../assets/scss/components/Frame.module.scss';
import { ReactElement, cloneElement, Children } from 'react';
import { useRouter } from 'utils/next';

export default function Frame({ children }: { children: ReactElement }) {
  const isMounted = useMount();
  const isFirst = useFirst();
  const router = useRouter();
  const child = Children.map(children, () => {
    if (router.pathname === '/') {
      return cloneElement(children, { isFirst });
    } else {
      return children;
    }
  });
  return (
    <>
      <main className={`${styles.main} ${isMounted && styles.mounted}`}>
        <PageTransition isFirst={isFirst} />
        {child}
      </main>
    </>
  );
}
