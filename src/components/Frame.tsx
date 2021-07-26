import { useFirst, useNode } from 'hooks';
import { PageTransition } from 'components';
import styles from '../assets/scss/components/Frame.module.scss';
import { ReactElement, cloneElement, Children, useCallback } from 'react';
import { useRouter } from 'utils/next';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Frame({
  children,
  isMounted,
  type,
}: {
  children: ReactElement;
  isMounted?: boolean;
  type: string;
}) {
  const isFirst = useFirst();
  const router = useRouter();
  const [contents, target] = useNode();
  const [prevPlace, _prevPlace] = useState<number>(0);
  const [isDown, _isDown] = useState<boolean>(true);
  const child = Children.map(children, () => {
    if (router.pathname === '/') {
      return cloneElement(children, { isFirst });
    } else {
      return children;
    }
  });
  if (type === 'base') {
    return (
      <>
        <main className={`${styles.main} ${isMounted && styles.mounted}`}>
          <PageTransition isFirst={isFirst} />
          {child}
        </main>
      </>
    );
  } else {
    return (
      <div
        className={styles.scroller}
        onScroll={() => {
          console.log(contents!.getBoundingClientRect().height);
          console.log(contents!.getBoundingClientRect().bottom);
          
          _prevPlace(contents!.getBoundingClientRect().bottom);
        }}
      >
        <div ref={target} className={styles.contents}>
          {children}
        </div>
      </div>
    );
  }
}
