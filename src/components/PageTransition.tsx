import { useCheck } from 'hooks';
import styles from '../assets/scss/components/PageTransition.module.scss';

export default function PageTransition() {
  const isMounted = useCheck();
  return (
    <>
      <div className={`${styles.entire} ${isMounted && styles.mounted}`}>
        <div className={styles.cover}></div>
        <div className={styles.text_wrapper}>
          <span>LeMoN</span>
        </div>
      </div>
    </>
  );
}
