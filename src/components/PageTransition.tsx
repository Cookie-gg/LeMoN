import { useMount } from 'hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { setActiveTime } from 'utils/common';
import { useRouter } from 'utils/next';
import styles from '../assets/scss/components/PageTransition.module.scss';

export default function PageTransition() {
  const router = useRouter();
  const isMounted = useMount();
  const [isTransition, _isTransition] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem('path') !== router.pathname) setActiveTime(_isTransition, 1200);
    localStorage.setItem('path', router.pathname);
  }, [router.pathname]);
  return (
    <>
      <div className={`
        ${styles.entire} 
        ${isMounted && styles.mounted} 
        ${isTransition && styles.transitioned} 
        ${router.pathname == '/' && styles.home}`}
      >
        <div className={styles.cover}>
          <span>LeMoN</span>
        </div>
      </div>
    </>
  );
}
