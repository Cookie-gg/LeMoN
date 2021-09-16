import { useFirstMount } from 'hooks';
import { useRouter } from 'utils/next';
import styles from '../assets/scss/components/PageTransition.module.scss';

export default function PageTransition() {
  const router = useRouter();
  const isMounted = useFirstMount();
  return (
    <>
      <div
        className={`${styles.entire} ${isMounted && styles.mounted} ${router.pathname == '/' && styles.home} exclude`}
      >
        <div className={styles.cover}>
          <span>LeMoN</span>
        </div>
      </div>
    </>
  );
}
