import { useMount } from 'hooks';
import { useRouter } from 'utils/next';
import styles from '../assets/scss/components/PageTransition.module.scss';

export default function PageTransition({ isFirst }: { isFirst: boolean }) {
  const router = useRouter();
  const isMounted = useMount();
  return (
    <>
      <div
        className={`${styles.entire} ${isMounted && styles.mounted} ${
          router.pathname == '/' && styles.home
        } ${isFirst && styles.first}`}
      >
        <div className={styles.cover}>
          <span>LeMoN</span>
        </div>
      </div>
    </>
  );
}
