import { useFirst } from 'hooks';
import { useRouter } from 'utils/next';
import PageTransition from './PageTransition';
import { Children, ReactElement, cloneElement } from 'react';
import styles from '../assets/scss/components/Frame.module.scss';

export default function MainFrame({
  children,
  isMounted,
}: {
  children: ReactElement;
  isMounted: boolean;
}) {
  const isFirst = useFirst();
  const router = useRouter();
  const child = Children.map(children, (child) =>
    router.pathname === '/' ? cloneElement(child, { isFirst }) : child,
  );
  return (
    <>
      <main className={`${styles.main} ${isMounted && styles.mounted}`}>
        <PageTransition isFirst={isFirst} />
        {child}
      </main>
    </>
  );
}
