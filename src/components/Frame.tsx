import { useFirst } from 'hooks';
import { PageTransition } from 'components';
import styles from '../assets/scss/components/Frame.module.scss';
import { ReactElement, cloneElement, Children } from 'react';
import { useRouter } from 'utils/next';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Frame({
  children,
  isMounted,
}: {
  children: ReactElement;
  isMounted: boolean;
}) {
  const isFirst = useFirst();
  const router = useRouter();
  const [prevChild, _prevChild] = useState<ReactElement>();
  const child = Children.map(children, () => {
    if (router.pathname === '/') {
      return cloneElement(children, { isFirst });
    } else {
      return children;
    }
  });
  useEffect(() => {
    _prevChild(children);
  }, [router.pathname, children]);
  return (
    <>
      <main className={`${styles.main} ${isMounted && styles.mounted}`}>
        <PageTransition isFirst={isFirst} />
        {prevChild === children ? child : 'Loading'}
      </main>
    </>
  );
}
