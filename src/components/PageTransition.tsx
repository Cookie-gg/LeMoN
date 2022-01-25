import { memo } from 'react';
import { useAgent } from 'hooks';
import { useRouter } from 'utils/next';
import styles from '../assets/scss/components/PageTransition.module.scss';

function PageTransition() {
  const { pathname } = useRouter();
  const isMobile = useAgent('mobile');
  return (
    <>
      <div className={`${styles.entire} ${pathname == '/' && styles.home} ${isMobile && styles.mobile}`}>
        <div className={styles.cover}>
          <span>LeMoN</span>
        </div>
      </div>
    </>
  );
}

export default memo(PageTransition);
