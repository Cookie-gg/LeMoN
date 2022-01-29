import { memo } from 'react';
import { useRouter } from 'utils/libs/next';
import styles from '../assets/scss/components/PageTransition.module.scss';

function PageTransition() {
  const { pathname } = useRouter();
  return (
    <>
      <div className={`${styles.entire} ${pathname == '/' && styles.home}`}>
        <div className={styles.cover}>
          <span>LeMoN</span>
        </div>
      </div>
    </>
  );
}

export default memo(PageTransition);
